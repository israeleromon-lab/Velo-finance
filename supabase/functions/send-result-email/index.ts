import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

serve(async (req) => {
  try {
    // 1. Parse the incoming webhook payload from Supabase
    const payload = await req.json();

    // Verify it's an insert to our specific table
    if (payload.type !== "INSERT" || payload.table !== "emailed_results") {
      return new Response(JSON.stringify({ error: "Invalid webhook payload type" }), { status: 400 });
    }

    const { email, inputs, outputs, calculator_id } = payload.record;

    // Helper function to turn JSON into a beautiful HTML list
    const formatData = (data) => {
      if (!data) return '';
      return Object.entries(data).map(([key, value]) => {
        // Add spaces before capital letters and capitalize first letter (e.g. "expectedGrowth" -> "Expected Growth")
        const readableKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        
        // Add $ formatting if it looks like currency, or % if it's growth/roi
        let formattedValue = value;
        if (typeof value === 'number') {
          if (key.toLowerCase().includes('value') || key.toLowerCase().includes('contribution')) {
            formattedValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
          } else if (key.toLowerCase().includes('growth') || key.toLowerCase().includes('roi')) {
            formattedValue = value + '%';
          } else {
            formattedValue = value.toLocaleString();
          }
        }

        return `
          <div style="display: table-row;">
            <div style="display: table-cell; padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: 500;">${readableKey}</div>
            <div style="display: table-cell; padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: bold; text-align: right;">${formattedValue}</div>
          </div>
        `;
      }).join('');
    };

    // 2. Format the email content
    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; color: #333; line-height: 1.5;">
        <h2 style="color: #4f46e5; text-align: center; border-bottom: 2px solid #e0e7ff; padding-bottom: 16px;">Velo Finance Analytics</h2>
        <p>Here is your financial simulation summary. Thank you for testing your strategies with us!</p>
        
        <div style="background: #f8fafc; padding: 24px; border-radius: 12px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
          <h3 style="margin-top: 0; font-size: 13px; letter-spacing: 1px; text-transform: uppercase; color: #94a3b8; border-bottom: 1px solid #cbd5e1; padding-bottom: 8px;">Model Inputs</h3>
          <div style="display: table; width: 100%;">
            ${formatData(inputs)}
          </div>
        </div>

        <div style="background: #f0fdfa; border: 1px solid #ccfbf1; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
          <h3 style="margin-top: 0; font-size: 13px; letter-spacing: 1px; text-transform: uppercase; color: #0d9488; border-bottom: 1px solid #99f6e4; padding-bottom: 8px;">Terminal Outputs</h3>
          <div style="display: table; width: 100%;">
            ${formatData(outputs)}
          </div>
        </div>
        
        <p style="font-size: 12px; color: #94a3b8; text-align: center; margin-top: 32px;">
          This is an automated message from Velo Finance.<br/>
          &copy; ${new Date().getFullYear()} Velo Finance. All rights reserved.
        </p>
      </div>
    `;

    // 3. Send the email using the Resend REST API
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        // NOTE: onboarding@resend.dev only allows sending to the email registered to your Resend account.
        // Change this to hello@yourdomain.com once you verify your domain in Resend.
        from: "Velo Finance <onboarding@resend.dev>",
        to: email,
        subject: "Your Velo Finance Simulation Results",
        html: htmlContent,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(JSON.stringify(data));
    }

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error sending email:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});
