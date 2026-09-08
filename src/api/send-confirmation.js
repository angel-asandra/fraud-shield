import { Resend } from 'resend';

// @ts-ignore
const resend = new Resend(process.env.RESEND_API_KEY);

const siteUrl = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}` 
  : 'http://localhost:5173';

// @ts-ignore
export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { to, full_name, case_id, scam_type, amount_lost, currency } = req.body;

  if (!to || !case_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const { error } = await resend.emails.send({
    from: 'Sentinel Fraud Recovery <onboarding@resend.dev>',
    to,
    subject: `Case Confirmation: ${case_id} — Sentinel Fraud Recovery`,
    html: buildEmailHtml({ full_name, case_id, scam_type, amount_lost, currency }),
  });

  if (error) return res.status(500).json({ error });
  return res.status(200).json({ success: true });
}

// @ts-ignore
function buildEmailHtml({ full_name, case_id, scam_type, amount_lost, currency }) {
  return `
    <!DOCTYPE html>
    <html>
    <body style="margin:0;padding:0;background:#05070f;font-family:'Inter',sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#05070f;padding:40px 20px;">
        <tr>
          <td align="center">
            <table width="560" cellpadding="0" cellspacing="0" style="background:#0a0d14;border:1px solid rgba(148,163,184,0.08);border-radius:12px;overflow:hidden;">
              <tr>
                <td style="padding:32px 40px 24px;border-bottom:1px solid rgba(148,163,184,0.08);">
                  <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#4f6bed;">Sentinel Fraud Recovery</p>
                  <h1 style="margin:8px 0 0;font-size:22px;font-weight:700;color:#f8fafc;">Case Successfully Filed</h1>
                </td>
              </tr>
              <tr>
                <td style="padding:32px 40px;">
                  <p style="margin:0 0 20px;font-size:15px;color:#94a3b8;line-height:1.6;">
                    Dear <strong style="color:#f8fafc;">${full_name}</strong>,
                  </p>
                  <p style="margin:0 0 28px;font-size:15px;color:#94a3b8;line-height:1.6;">
                    Your fraud report has been received. Our investigation team will begin reviewing your case shortly.
                  </p>
                  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d1117;border:1px solid rgba(79,107,237,0.2);border-radius:8px;margin-bottom:28px;">
                    <tr>
                      <td style="padding:20px 24px;">
                        <p style="margin:0 0 6px;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#64748b;">Your Case ID</p>
                        <p style="margin:0;font-size:28px;font-weight:700;font-family:monospace;color:#4f6bed;">${case_id}</p>
                        <p style="margin:8px 0 0;font-size:12px;color:#64748b;">Save this ID to track your case progress</p>
                      </td>
                    </tr>
                  </table>
                  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d1117;border:1px solid rgba(148,163,184,0.08);border-radius:8px;margin-bottom:28px;">
                    <tr>
                      <td style="padding:16px 24px;">
                        <table width="100%">
                          <tr>
                            <td style="padding:6px 0;font-size:13px;color:#64748b;width:140px;">Scam Type</td>
                            <td style="padding:6px 0;font-size:13px;color:#f8fafc;text-transform:capitalize;">${scam_type?.replace(/_/g, ' ')}</td>
                          </tr>
                          <tr>
                            <td style="padding:6px 0;font-size:13px;color:#64748b;">Amount Lost</td>
                            <td style="padding:6px 0;font-size:13px;color:#f8fafc;font-family:monospace;">$${Number(amount_lost).toLocaleString()} ${currency}</td>
                          </tr>
                          <tr>
                            <td style="padding:6px 0;font-size:13px;color:#64748b;">Status</td>
                            <td style="padding:6px 0;font-size:13px;color:#4f6bed;">Submitted — Pending Review</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                    <tr>
                      <td align="center">
                        <a href="${
// @ts-ignore
                        siteUrl}/track-case"
                          style="display:inline-block;padding:12px 28px;background:#4f6bed;color:#fff;font-size:14px;font-weight:600;text-decoration:none;border-radius:8px;">
                          Track Your Case
                        </a>
                      </td>
                    </tr>
                  </table>
                  <p style="margin:0;font-size:13px;color:#475569;line-height:1.6;">
                    If you did not file this report, please contact us immediately at
                    <a href="mailto:support@yourdomain.com" style="color:#4f6bed;text-decoration:none;">support@yourdomain.com</a>.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding:20px 40px;border-top:1px solid rgba(148,163,184,0.08);">
                  <p style="margin:0;font-size:12px;color:#334155;text-align:center;">
                    Sentinel Fraud Recovery — All communications are encrypted and confidential.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}