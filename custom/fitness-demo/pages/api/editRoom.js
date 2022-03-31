export default async function handler(req, res) {
  const { roomName } = req.query;
  const { privacy, expiryMinutes, ...rest } = req.body;

  if (req.method === 'POST') {
    console.log(`Modifying room on domain`);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          process.env.DAILY_API_KEY ||
          '68948e910f95941f8397821f06c20b9b155f0ffcd5533df4c7a66110188ee47b'
        }`,
      },
      body: JSON.stringify({
        privacy: privacy || 'public',
        properties: {
          exp: Math.round(Date.now() / 1000) + (expiryMinutes || 5) * 60, // expire in x minutes
          eject_at_room_exp: true,
          enable_knocking: privacy !== 'public',
          ...rest,
        },
      }),
    };

    const dailyRes = await fetch(
      `${
        process.env.DAILY_REST_DOMAIN || 'https://api.daily.co/v1'
      }/rooms/${roomName}`,
      options
    );

    const { name, url, error } = await dailyRes.json();

    if (error) {
      return res.status(500).json({ error });
    }

    return res.status(200).json({ name, url, domain: 'j-msmex' });
  }

  return res.status(500);
}
