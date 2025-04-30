"use client";

import extractImportantHeaders from "@/lib/HeadersMap";
import { EmailHeader } from "@/types/EmailProps";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const PreviewOneEmail = ({ id }: { id: string }) => {
  const { data: session, status } = useSession();
  const [headers, setHeaders] = useState<EmailHeader[]>([]);
  const [snippet, setSnippet] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        if (status === "authenticated" && session?.accessToken) {
          const res = await fetch(`/api/email/${id}`);
          const data = await res.json();
          setHeaders(data.email.payload.headers || []);
          setSnippet(data.email.snippet || "");
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to fetch email:", err);
        setError("Failed to load email. Please try again.");
        setLoading(false);
      }
    };

    fetchEmail();
  }, [session, status, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (!headers.length) {
    return <div>No email found with the given ID.</div>;
  }

  const important = extractImportantHeaders(headers);

  return (
    <div className="bg-white rounded-xl p-6 shadow-xl max-w-3xl mx-auto mt-6 space-y-4">
      {/* Subject */}
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        {important.Subject || "(No Subject)"}
      </h2>

      {/* From */}
      {important.From && (
        <p className="text-gray-700">
          <strong>From:</strong> {important.From}
        </p>
      )}

      {/* To */}
      {important.To && (
        <p className="text-gray-700">
          <strong>To:</strong> {important.To}
        </p>
      )}

      {/* Date */}
      {important.Date && (
        <p className="text-gray-700">
          <strong>Date:</strong> {important.Date}
        </p>
      )}

      {/* Reply-To */}
      {important["Reply-To"] && (
        <p className="text-gray-700">
          <strong>Reply-To:</strong> {important["Reply-To"]}
        </p>
      )}

      {/* Snippet */}
      {snippet && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Snippet:</h3>
          <p className="text-gray-600 whitespace-pre-wrap">{snippet}</p>
        </div>
      )}
    </div>
  );
};

export default PreviewOneEmail;
