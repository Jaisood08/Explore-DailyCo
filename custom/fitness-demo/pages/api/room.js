/*
 * This is an example server-side function that retrieves the room object.
 */
export default async function handler(req, res) {
  const { name } = req.query;

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
    console.log(
      'URL = ',
      `${
        process.env.DAILY_REST_DOMAIN || 'https://api.daily.co/v1'
      }/rooms/${name}`
    );
    console.log(options);

    const dailyRes = await fetch(
      `${
        process.env.DAILY_REST_DOMAIN || 'https://api.daily.co/v1'
      }/rooms/${name}`,
      options
    );

    const response = await dailyRes.json();
    return res.status(200).json(response);
  }

  return res.status(500);
}
