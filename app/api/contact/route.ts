export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return Response.json({ error: "All fields are required" }, { status: 400 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Telegram credentials not configured");
      return Response.json({ error: "Server configuration error" }, { status: 500 });
    }

    const text = [
      `📬 <b>New Contact Message</b>`,
      ``,
      `<b>Name:</b> ${name}`,
      `<b>Email:</b> ${email}`,
      `<b>Message:</b>`,
      message,
    ].join("\n");

    const res = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("Telegram API error:", err);
      return Response.json({ error: "Failed to send message" }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
