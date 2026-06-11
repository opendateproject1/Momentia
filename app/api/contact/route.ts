import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? 'info@momentiaio.com'
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev'

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const name = String(body.name ?? '').trim()
  const organization = String(body.organization ?? '').trim()
  const email = String(body.email ?? '').trim()
  const phone = String(body.phone ?? '').trim()
  const area = String(body.area ?? '').trim()
  // Honeypot — bots fill hidden fields; humans leave it empty.
  const honeypot = String(body.company ?? '').trim()

  if (honeypot) {
    // Silently accept to avoid tipping off the bot.
    return NextResponse.json({ ok: true })
  }

  if (!name || !organization || !email || !area) {
    return NextResponse.json(
      { error: 'Please fill in all required fields.' },
      { status: 400 },
    )
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  const subject = `Inquiry — ${area}`

  const row = (label: string, value: string, isLast = false) => `
    <tr>
      <td style="padding: 14px 20px; ${isLast ? '' : 'border-bottom: 1px solid #eef1f0;'} font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #6b7280; white-space: nowrap; vertical-align: top;">${label}</td>
      <td style="padding: 14px 20px; ${isLast ? '' : 'border-bottom: 1px solid #eef1f0;'} font-size: 15px; color: #1f2937; vertical-align: top;">${value}</td>
    </tr>`

  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="light only" />
  </head>
  <body style="margin: 0; padding: 0; background-color: #f4f6f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f6f5; padding: 32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(16, 24, 40, 0.06); border: 1px solid #eef1f0;">

            <!-- Header / brand bar -->
            <tr>
              <td style="background: linear-gradient(135deg, #2EA56C 0%, #2693A0 100%); padding: 28px 32px;">
                <p style="margin: 0; font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.82);">Momentia IO</p>
                <h1 style="margin: 6px 0 0; font-size: 22px; font-weight: 700; color: #ffffff;">New Contact Inquiry</h1>
              </td>
            </tr>

            <!-- Area-of-interest pill -->
            <tr>
              <td style="padding: 24px 32px 4px;">
                <span style="display: inline-block; padding: 6px 14px; background-color: #e9f6ef; color: #1f7a4d; font-size: 12px; font-weight: 600; letter-spacing: 0.04em; border-radius: 999px;">${escapeHtml(area)}</span>
              </td>
            </tr>

            <!-- Details -->
            <tr>
              <td style="padding: 16px 24px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #eef1f0; border-radius: 12px; overflow: hidden;">
                  ${row('Name', escapeHtml(name))}
                  ${row('Organization', escapeHtml(organization))}
                  ${row('Email', `<a href="mailto:${escapeHtml(email)}" style="color: #2EA56C; text-decoration: none;">${escapeHtml(email)}</a>`)}
                  ${row('Phone', escapeHtml(phone || '—'))}
                  ${row('Area of Interest', escapeHtml(area), true)}
                </table>
              </td>
            </tr>

            <!-- Reply hint -->
            <tr>
              <td style="padding: 12px 32px 28px;">
                <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #6b7280;">
                  Reply directly to this email to respond to <strong style="color: #1f2937;">${escapeHtml(name)}</strong>.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding: 18px 32px; background-color: #fafbfb; border-top: 1px solid #eef1f0;">
                <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                  Sent from the contact form at <a href="https://www.momentiaio.com" style="color: #2EA56C; text-decoration: none;">momentiaio.com</a>
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject,
      html,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send message.' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
