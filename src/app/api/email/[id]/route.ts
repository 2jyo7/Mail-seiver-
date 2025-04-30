import { google } from "googleapis";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
    });
  }

  const { id } = params;

  if (!id) {
    return new Response(JSON.stringify({ error: "Missing email ID" }), {
      status: 400,
    });
  }

  try {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: session.accessToken });

    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    const email = await gmail.users.messages.get({
      userId: "me",
      id: id,
      format: "full",
    });

    return new Response(JSON.stringify({ email: email.data }), { status: 200 });
  } catch (error) {
    console.error("Error fetching email details:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch email details" }),
      { status: 500 }
    );
  }
}
