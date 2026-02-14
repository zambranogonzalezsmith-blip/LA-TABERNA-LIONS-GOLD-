export const sendDiscordAlert = async (title: string, message: string, color: number) => {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) return;

  const embed = {
    title: title,
    description: message,
    color: color, // Verde para ventas, Rojo para estafas
    timestamp: new Date(),
    footer: { text: "Lions-Gold Security System" }
  };

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ embeds: [embed] })
  });
};
