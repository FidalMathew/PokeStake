export async function POST(request: Request, response: Response) {
    try {

        const body = await request.json();

        return new Response(JSON.stringify(body), { status: 200 });
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