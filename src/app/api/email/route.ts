import { NextResponse } from "next/server";
import { google } from "googleapis";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // adjust if needed
import { getServerSession } from "next-auth/next";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: session.accessToken });

    const gmail = google.gmail({ version: "v1", auth: oauth2Client });
    const res = await gmail.users.messages.list({ userId: "me" });
    // console.log(res.data.messages);

    if (!res.data.messages || res.data.messages.length === 0) {
      return NextResponse.json({ error: "No emails found" }, { status: 404 });
    }

    const emails = await Promise.all(
      res.data.messages.map(async (message) => {
        const email = await gmail.users.messages.get({
          userId: "me",
          id: message.id!,
        });

        const subject = email.data.payload?.headers?.find(
          (header) => header.name === "Subject"
        )?.value;

        const snippet = email.data.snippet;

        return {
          id: message.id,
          subject,
          snippet,
        };
      })
    );

    return NextResponse.json({ emails });
  } catch (error) {
    console.error("Error fetching emails:", error);
    return NextResponse.json(
      { error: "Failed to fetch emails" },
      { status: 500 }
    );
  }
}
