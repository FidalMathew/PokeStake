export async function POST(
    request: Request 
  ) {
    // Extract body from the incoming request
    const body = await request.json();
  
    console.log("Creating room with body:", body);  

    const apiUrl = "https://api.huddle01.com/api/v1/create-room";
    const apiKey = process.env.NEXT_PUBLIC_API_KEY!;

  
    try {
      // Make the POST request to Huddle01 API
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        // body: JSON.stringify({
        //   roomLocked: body.roomLocked || false,
        //   metadata: {
        //     title: body.metadata?.title || "Default Room Title",
        //     hostWallets: body.metadata?.hostWallets || [],
        //   },
        // }),
      });

  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Huddle01 API response status: ${response.status}`);
      }
  
      const json = await response.json();
      return new Response(JSON.stringify(json), { status: 200 });
    } catch (e) {
      console.error("Error creating room:", e);
  
      return new Response(
        JSON.stringify({
          error: "Failed to create room",
          message: (e as Error).message,
        }),
        { status: 500 }
      );
    }
  }
  