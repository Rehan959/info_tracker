import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Webhook } from 'svix'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const headerPayload = headers()
    const svix_id = headerPayload.get("svix-id")
    const svix_timestamp = headerPayload.get("svix-timestamp")
    const svix_signature = headerPayload.get("svix-signature")

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response('Error occured -- no svix headers', {
        status: 400
      })
    }

    const payload = await request.json()
    const { type, data } = payload

    if (type === 'user.created' || type === 'user.updated') {
      const { id, email_addresses, first_name, last_name } = data

      // Get primary email
      const primaryEmail = email_addresses?.find((email: any) => email.id === data.primary_email_address_id)
      const email = primaryEmail?.email_address

      if (email) {
        // Upsert user in database
        await prisma.user.upsert({
          where: { clerkId: id },
          update: {
            email: email,
            name: `${first_name || ''} ${last_name || ''}`.trim() || null,
            updatedAt: new Date()
          },
          create: {
            clerkId: id,
            email: email,
            name: `${first_name || ''} ${last_name || ''}`.trim() || null
          }
        })

        console.log(`✅ User synced: ${email} (${id})`)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Clerk webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
