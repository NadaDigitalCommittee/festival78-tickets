export async function log(...message: (string | undefined)[]) {
  console.log(...message);
  await fetch(process.env.DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      embeds: [
        {
          title: message[0],
          description: message.slice(1).join("\n"),
        },
      ],
    }),
  });
}
