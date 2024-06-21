import React, { useState, useEffect } from "react";

type Suggestion = {
  id: number;
  name: string;
  rating?: number;
};

type Props = {
  fullWidth?: boolean;
  placeholder: string;
  suggestions: Suggestion[];
  onSearch: (query: string) => void;
  onFilter: (filter: string) => void;
  onSuggestionClick?: (id: number) => void;
  showSuggestions?: boolean;
};

const SearchFilterBar = ({
  placeholder,
  suggestions,
  onSearch,
  onFilter,
  onSuggestionClick,
  fullWidth = false,
  showSuggestions = true,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>(
    [],
  );

  useEffect(() => {
    if (searchTerm.length > 0 && showSuggestions) {
      setFilteredSuggestions(
        suggestions.filter(suggestion =>
          suggestion.name.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    } else {
      setFilteredSuggestions([]);
    }
  }, [searchTerm, suggestions, showSuggestions]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  const handleFilterClick = () => {
    onFilter("SomeFilter");
  };

  return (
    <div
      className={`relative flex w-full items-center justify-between rounded-xs bg-background p-4 text-white ${
        fullWidth ? "" : "lg:w-[30%]"
      }`}
    >
      <form onSubmit={handleSearch} className="flex w-full items-center">
        <button type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21.0002 21L16.7002 16.7M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
              stroke="#E6E6E7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="flex-1 bg-transparent px-2 outline-none"
        />
      </form>
      <button onClick={handleFilterClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M3 6H21M7 12H17M10 18H14"
            stroke="#E6E6E7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="scrollbar text-black absolute left-0 right-0 top-full z-10 mt-2 flex flex-col gap-3 overflow-y-auto rounded-xs bg-primary-normal-hover px-4 py-6">
          {filteredSuggestions.map(suggestion => (
            <div
              key={suggestion.id}
              onClick={() =>
                onSuggestionClick && onSuggestionClick(suggestion.id)
              }
              className="flex cursor-pointer items-center justify-between rounded-t-sm border-b-[0.1px] border-[#aaa] p-2 hover:bg-background"
            >
              <span>{suggestion.name}</span>
              {suggestion.rating !== undefined && (
                <span className="text-secondary-dark">
                  {"★".repeat(suggestion.rating)}
                  {"☆".repeat(5 - suggestion.rating)}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchFilterBar;
