import categorizeEmail from "@/lib/CategorizeEmail";

interface EmailProps {
  id: string;
  subject?: string;
  snippet?: string;
}

/**
 * Filters emails based on search term and category
 */
export function filterEmails(
  emails: EmailProps[],
  searchTerm: string,
  selectedCategory: string
) {
  return emails.filter((email) => {
    const category = categorizeEmail({
      subject: email.subject || "",
      snippet: email.snippet || "",
    });

    const matchesCategory =
      selectedCategory === "All" ||
      category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      email.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.snippet?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });
}

/**
 * Calculates counts of each category for analytics
 */
export function calculateAnalytics(emails: EmailProps[]) {
  return emails.reduce((acc, email) => {
    const category = categorizeEmail({
      subject: email.subject || "",
      snippet: email.snippet || "",
    });
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });
}
