import { NextRequest } from 'next/server'
import { clearAuthCookieResponse } from '@/lib/auth'

export async function POST(_request: NextRequest) {
  return clearAuthCookieResponse({ success: true })
}
