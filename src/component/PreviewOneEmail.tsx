"use client";

import { EmailProps } from "@/types/EmailProps";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const PreviewOneEmail = ({ id }: { id: string }) => {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState<EmailProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (status === "authenticated" && session?.accessToken) {
      fetch(`/api/email/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setEmail(data.email || null);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch email:", err);
          setError("Failed to load email. Please try again.");
          setLoading(false);
        });
    }
  }, [session, status, id]);

  // Render loading or error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (!email) {
    return <div>No email found with the given ID.</div>;
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-xl max-w-3xl mx-auto mt-6">
      {/* Email Subject */}
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        {email.subject || "(No Subject)"}
      </h2>

      {/* From and To */}
      <div className="text-gray-700 mb-4">
        {email.from && (
          <p>
            <span className="font-semibold">From:</span> {email.from}
          </p>
        )}
        {email.to && (
          <p>
            <span className="font-semibold">To:</span> {email.to}
          </p>
        )}
      </div>

      {/* Date */}
      <p className="text-gray-500 mb-4">
        <span className="font-semibold">Date:</span>{" "}
        {new Date(email.date || "").toLocaleString()}
      </p>

      {/* Snippet */}
      {email.snippet && (
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Snippet:</h3>
          <p className="text-gray-600 whitespace-pre-wrap">{email.snippet}</p>
        </div>
      )}

      {/* Body */}
      {email.body && (
        <div>
          <h3 className="font-semibold text-gray-800 mt-4 mb-2">Body:</h3>
          <p className="text-gray-600 whitespace-pre-wrap">{email.body}</p>
        </div>
      )}
    </div>
  );
};

export default PreviewOneEmail;
