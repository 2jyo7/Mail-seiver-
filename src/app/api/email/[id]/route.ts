import { NextResponse } from "next/server";
import { google } from "googleapis";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(req: Request, { params }: Params) {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;

  try {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: session.accessToken });

    const gmail = google.gmail({ version: "v1", auth: oauth2Client });
    const email = await gmail.users.messages.get({
      userId: "me",
      id: id,
      format: "full", // Important to get full body
    });

    const headers = email.data.payload?.headers || [];
    const subject =
      headers.find((header) => header.name === "Subject")?.value || "";
    const from = headers.find((header) => header.name === "From")?.value || "";

    let body = "";
    if (email.data.payload?.parts) {
      const part = email.data.payload.parts.find(
        (p) => p.mimeType === "text/plain" || p.mimeType === "text/html"
      );
      body = part?.body?.data
        ? Buffer.from(part.body.data, "base64").toString("utf-8")
        : "";
    } else {
      body = email.data.payload?.body?.data
        ? Buffer.from(email.data.payload.body.data, "base64").toString("utf-8")
        : "";
    }

    return NextResponse.json({
      id,
      subject,
      from,
      body,
    });
  } catch (error) {
    console.error("Error fetching email details:", error);
    return NextResponse.json(
      { error: "Failed to fetch email details" },
      { status: 500 }
    );
  }
}
