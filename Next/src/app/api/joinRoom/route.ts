export async function POST(
    request: Request
  ) {
    const apiUrl = "https://api.huddle01.com/api/v1/join-room-token";
    const apiKey = process.env.NEXT_PUBLIC_API_KEY!;

    
  
    try {
      // Parse the incoming request body
      const body = await request.json();
  
      // Ensure required fields are present
      if (!body.roomId || !body.userType) {
        return new Response(
          JSON.stringify({ error: "Missing required fields: roomId, userType" }),
          { status: 400 }
        );
      }

        console.log("Joining room with body:", body);
  
      // Make the POST request to Huddle01 API
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({
          roomId: body.roomId,
          userType: body.userType,
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Huddle01 API error: ${response.status}, ${errorText}`);
      }
  
      // Parse the successful response
      const json = await response.json();
  
      return new Response(JSON.stringify(json), { status: 200 });
    } catch (e) {
      console.error("Error joining room:", e);
  
      return new Response(
        JSON.stringify({
          error: "Failed to join room",
          message: (e as Error).message,
        }),
        { status: 500 }
      );
    }
  }
  