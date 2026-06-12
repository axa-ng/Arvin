import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { firstName, lastName, email, university, year, degree, betaTester } = req.body;

  try {
    await fetch(process.env.APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, university, year, degree, betaTester }),
      redirect: 'follow'
    });
  } catch (err) {
    console.error('Sheets error:', err);
    return res.status(500).json({ error: 'Failed to save signup' });
  }

  try {
    await resend.emails.send({
      from: 'Alex <admin@studywitharvin.com>',
      to: email,
      subject: "You're on the list",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:40px 24px;color:#141414">
          <h1 style="font-size:28px;font-weight:700;margin-bottom:8px">You're locked in, ${firstName}.</h1>
          <p style="color:#5a5a5a;line-height:1.7;margin-bottom:24px">
            Thanks for signing up for Arvin. We'll reach out as soon as beta opens —
            you'll be among the first to try it.
          </p>
          <p style="color:#5a5a5a;line-height:1.7">Your academic comeback starts now.</p>
          <p style="margin-top:32px;font-size:12px;color:#aaa">— The Arvin team</p>
        </div>
      `,
    });
  } catch (err) {
    console.error('Resend error:', err);
  }

  return res.status(200).json({ ok: true });
}