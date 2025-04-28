const getBadgeColor = (category: string) => {
  switch (category.toLowerCase()) {
    case "office":
      return "bg-green-600 font-bold uppercase text-white";
    case "social":
      return "bg-blue-600 font-bold uppercase text-white";
    case "ads":
      return "bg-yellow-600 font-bold uppercase text-white";
    case "spam":
      return "bg-red-600 font-bold uppercase text-white";
    default:
      return "bg-gray-800 font-bold uppercase text-white";
  }
};

export default getBadgeColor;
