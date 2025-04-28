// FilterAndSearchBar.tsx
import { FC } from "react";

interface FilterAndSearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categoryCounts: { [key: string]: number };
}

const FilterAndSearchBar: FC<FilterAndSearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categoryCounts,
}) => (
  <div className="flex flex-col md:flex-row gap-4 mb-6">
    <input
      type="text"
      placeholder="Search emails..."
      className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/2 focus:ring focus:ring-blue-200 focus:border-blue-400"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <select
      className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 focus:ring focus:ring-blue-200 focus:border-blue-400"
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
    >
      <option value="All">All Categories</option>
      {Object.keys(categoryCounts).map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  </div>
);

export default FilterAndSearchBar;
