import { NextRequest } from 'next/server'
import crypto from 'crypto'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me'
const TOKEN_COOKIE = 'auth_token'

function base64UrlEncode(input: Buffer) {
  return input.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

function base64UrlDecode(input: string) {
  input = input.replace(/-/g, '+').replace(/_/g, '/')
  const pad = input.length % 4
  if (pad) input += '='.repeat(4 - pad)
  return Buffer.from(input, 'base64')
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16)
  const derivedKey = await new Promise<Buffer>((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, derived) => {
      if (err) reject(err)
      else resolve(derived)
    })
  })
  return `${salt.toString('hex')}:${derivedKey.toString('hex')}`
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const [saltHex, keyHex] = hash.split(':')
  if (!saltHex || !keyHex) return false
  const salt = Buffer.from(saltHex, 'hex')
  const derivedKey = await new Promise<Buffer>((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, derived) => {
      if (err) reject(err)
      else resolve(derived)
    })
  })
  return crypto.timingSafeEqual(derivedKey, Buffer.from(keyHex, 'hex'))
}

export function signJwt(payload: Record<string, any>, expiresInSeconds = 60 * 60 * 24 * 7): string {
  const header = { alg: 'HS256', typ: 'JWT' }
  const now = Math.floor(Date.now() / 1000)
  const body = { iat: now, exp: now + expiresInSeconds, ...payload }
  const headerB64 = base64UrlEncode(Buffer.from(JSON.stringify(header)))
  const bodyB64 = base64UrlEncode(Buffer.from(JSON.stringify(body)))
  const data = `${headerB64}.${bodyB64}`
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(data).digest()
  const sigB64 = base64UrlEncode(signature)
  return `${data}.${sigB64}`
}

export function verifyJwt(token: string): { valid: boolean; payload?: any } {
  try {
    const [headerB64, bodyB64, sigB64] = token.split('.')
    if (!headerB64 || !bodyB64 || !sigB64) return { valid: false }
    const data = `${headerB64}.${bodyB64}`
    const expected = base64UrlEncode(crypto.createHmac('sha256', JWT_SECRET).update(data).digest())
    if (!crypto.timingSafeEqual(Buffer.from(sigB64), Buffer.from(expected))) return { valid: false }
    const payload = JSON.parse(base64UrlDecode(bodyB64).toString('utf8'))
    const now = Math.floor(Date.now() / 1000)
    if (payload.exp && now > payload.exp) return { valid: false }
    return { valid: true, payload }
  } catch {
    return { valid: false }
  }
}

export function getTokenFromRequest(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) return authHeader.slice(7)

  // Prefer reading from the incoming request cookies (works in route handlers and middleware)
  const cookieToken = req.cookies?.get?.(TOKEN_COOKIE)?.value
  if (cookieToken) return cookieToken

  // Fallback: parse the Cookie header
  const cookieHeader = req.headers.get('cookie') || ''
  const match = cookieHeader.match(new RegExp(`${TOKEN_COOKIE}=([^;]+)`))
  return match ? decodeURIComponent(match[1]) : null
}

export function createAuthCookieResponse(json: any, token: string) {
  const respHeaders = new Headers({ 'content-type': 'application/json' })
  const response = new Response(JSON.stringify(json), { status: 200, headers: respHeaders })
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  response.headers.append('Set-Cookie', `${TOKEN_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Expires=${expires.toUTCString()}`)
  return response
}

export function clearAuthCookieResponse(json: any = { success: true }) {
  const respHeaders = new Headers({ 'content-type': 'application/json' })
  const response = new Response(JSON.stringify(json), { status: 200, headers: respHeaders })
  response.headers.append('Set-Cookie', `${TOKEN_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT`)
  return response
}

export function getUserIdFromRequest(req: NextRequest): string | null {
  const token = getTokenFromRequest(req)
  if (!token) return null
  const { valid, payload } = verifyJwt(token)
  if (!valid) return null
  return payload?.sub || null
}
