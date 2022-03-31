/*
 * This is an example server-side function that provides the real-time presence
 * data of all the active rooms in the given domain.
 */
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          process.env.DAILY_API_KEY ||
          '68948e910f95941f8397821f06c20b9b155f0ffcd5533df4c7a66110188ee47b'
        }`,
      },
    };

    const dailyRes = await fetch(
      `${process.env.DAILY_REST_DOMAIN || 'https://api.daily.co/v1'}/presence`,
      options
    );

    const response = await dailyRes.json();
    return res.status(200).json(response);
  }

  return res.status(500);
}
