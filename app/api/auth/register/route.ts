import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, signJwt, createAuthCookieResponse } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 })
    }
    const passwordHash = await hashPassword(password)
    const user = await prisma.user.create({ data: { email, name: name || null, passwordHash } })
    const token = signJwt({ sub: user.id, email: user.email })
    return createAuthCookieResponse({ success: true, user: { id: user.id, email: user.email, name: user.name } }, token)
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json({ error: 'Failed to register' }, { status: 500 })
  }
}
