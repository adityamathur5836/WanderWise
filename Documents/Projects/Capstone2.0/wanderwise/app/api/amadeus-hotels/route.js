export async function GET(req) {
  console.log("API Route: /api/amadeus-hotels accessed");
  const { searchParams } = new URL(req.url);
  const cityCode = searchParams.get('cityCode') || 'PAR';
  console.log(`API Route: Fetching hotels for cityCode: ${cityCode}`);

  // Log environment variables (for debugging, remove in production)
  console.log("API Route: AMADEUS_CLIENT_ID length:", process.env.AMADEUS_CLIENT_ID?.length);
  console.log("API Route: AMADEUS_CLIENT_SECRET length:", process.env.AMADEUS_CLIENT_SECRET?.length);

  // Get Amadeus token
  try {
    const tokenRes = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.AMADEUS_CLIENT_ID,
        client_secret: process.env.AMADEUS_CLIENT_SECRET,
      }),
    });
    const tokenData = await tokenRes.json();
    if (!tokenRes.ok) {
      console.error("API Route: Failed to get Amadeus token. Response:", tokenData);
      return new Response(JSON.stringify({ error: 'Failed to get Amadeus token', details: tokenData }), { status: 401 });
    }
    console.log("API Route: Amadeus token obtained successfully.");

    // Fetch hotels
    const hotelsRes = await fetch(`https://test.api.amadeus.com/v2/shopping/hotel-offers?cityCode=${cityCode}`, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });
    const hotelsData = await hotelsRes.json();
    if (!hotelsRes.ok) {
      console.error("API Route: Failed to fetch hotels. Response:", hotelsData);
      return new Response(JSON.stringify({ error: 'Failed to fetch hotels', details: hotelsData }), { status: 500 });
    }

    console.log("API Route: Hotels data fetched successfully.");
    return new Response(JSON.stringify(hotelsData), { status: 200 });
  } catch (error) {
    console.error("API Route: Caught unhandled error:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error', details: error.message }), { status: 500 });
  }
} 