const categories = [
  {
    name: "Social",
    keywords: [
      "Facebook",
      "Instagram",
      "Twitter",
      "LinkedIn",
      "Quora-digest",
      "Dribble",
    ],
  },
  {
    name: "Interests",
    keywords: ["wordpress", "hellotalk", "🤍 - Treasures.", "jyoti"],
  },
  {
    name: "Ads",
    keywords: [
      "Sale",
      "Discount",
      "Offer",
      "Buy now",
      "Deal",
      "placements highlights",
    ],
  },
  {
    name: "Office",
    keywords: ["Meeting", "Project", "Invoice", "Client", "Deadline"],
  },
  {
    name: "Spam",
    keywords: ["Win", "Lottery", "Claim", "Free", "Urgent"],
  },
];

const categorizeEmail = ({
  subject = "",
  snippet = "",
}: {
  subject: string;
  snippet: string;
}) => {
  const content = `${subject} ${snippet}`.toLowerCase();

  const matchedCategory = categories.find((category) =>
    category.keywords.some((word) => content.includes(word.toLowerCase()))
  );

  return matchedCategory?.name || "Uncategorized";
};

export default categorizeEmail;
