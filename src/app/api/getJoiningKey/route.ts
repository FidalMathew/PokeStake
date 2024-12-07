import App from "@/mpc/src/App";

export async function GET() {
    try {
        const code = App.generateJoiningCode();
        return new Response(JSON.stringify(code), { status: 200 });
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