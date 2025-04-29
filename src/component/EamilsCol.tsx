"use client";

import categorizeEmail from "@/lib/CategorizeEmail";
import getBadgeColor from "@/lib/GetBadgeColors";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { calculateAnalytics, filterEmails } from "./ui/FilterEmails";
import AnalyticsPanel from "./AnalyticsPanel";
import { EmailProps } from "@/types/EmailProps";
import Link from "next/link";
import FilterAndSearchBar from "./FilterSearchBar";

export default function EmailsCollection() {
  const { data: session, status } = useSession();
  const [emails, setEmails] = useState<EmailProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  //   const [selectedEmail, setSelectedEmail] = useState<EmailProps | null>(null);
  //   const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session?.accessToken) {
      fetch("/api/email")
        .then((res) => res.json())
        .then((data) => setEmails(data.emails || []))
        .catch((err) => {
          console.error("Failed to fetch emails:", err);
          setError("Failed to load emails. Please try again.");
        });
    }
  }, [session, status]);

  const filteredEmails = filterEmails(emails, searchTerm, selectedCategory);
  const categoryCounts = calculateAnalytics(emails);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6  ">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 container my-12">
        {/* Left - Emails Section */}
        <div className="md:col-span-3 space-y-8">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              📬 Gmail Overview
            </h1>
            {!session ? (
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition"
                onClick={() => signIn("google")}
              >
                Sign in with Google
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <p className="text-sm text-gray-700">
                  Signed in as <strong>{session.user?.email}</strong>
                </p>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition"
                  onClick={() => signOut()}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && <p className="text-red-600 mb-4">{error}</p>}

          {/* Search & Filter */}
          {session && (
            <FilterAndSearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categoryCounts={categoryCounts}
            />
          )}

          {/* Emails List */}
          {session ? (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
              {filteredEmails.length > 0 ? (
                filteredEmails.map((email) => {
                  const category = categorizeEmail({
                    subject: email.subject || "",
                    snippet: email.snippet || "",
                  });
                  const badgeColor = getBadgeColor(category);

                  return (
                    <div
                      key={email.id}
                      className="bg-white border border-gray-200 rounded-xl p-5 shadow hover:shadow-xl transition-all cursor-pointer"
                      //   onClick={() => {
                      //     setSelectedEmail(email);
                      //     setIsModalOpen(true);
                      //   }}
                    >
                      <Link href={`/preview-email/${email.id}`}>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {email.subject || "(No Subject)"}
                          </h3>
                          <span
                            className={`text-xs font-medium px-3 py-1 rounded-full ${badgeColor}`}
                          >
                            {category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {email.snippet || "No snippet available."}
                        </p>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-400 col-span-2">Fetching emails...</p>
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-lg">
              Please sign in to preview your emails.
            </p>
          )}
        </div>

        {/* Right - Analytics Panel */}
        {session && (
          <AnalyticsPanel
            totalEmails={emails.length}
            categoryCounts={categoryCounts}
          />
        )}
      </div>
    </div>
  );
}
