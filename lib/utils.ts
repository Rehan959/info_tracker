import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Parse follower counts from strings like "1.2M", "12k", "1,234", or raw numbers.
export function parseFollowerCount(input: unknown): number {
  if (typeof input === 'number' && Number.isFinite(input)) return Math.max(0, Math.floor(input))
  if (typeof input !== 'string') return 0

  // Normalize: lowercase, trim, remove thousands separators so regex captures full number
  const normalized = input.trim().toLowerCase().replace(/,/g, '')
  if (!normalized) return 0

  // Extract first numeric token possibly with decimal and optional suffix
  const match = normalized.match(/([0-9]+(?:\.[0-9]+)?)\s*([kmbt])?/) // supports k,m,b,t
  if (!match) {
    const n = Number(normalized.replace(/\s+/g, ''))
    return Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0
  }

  const value = parseFloat(match[1])
  const suffix = match[2]
  if (!Number.isFinite(value)) return 0

  const multipliers: Record<string, number> = { k: 1_000, m: 1_000_000, b: 1_000_000_000, t: 1_000_000_000_000 }
  const multiplier = suffix ? (multipliers[suffix] || 1) : 1
  return Math.max(0, Math.floor(value * multiplier))
}
