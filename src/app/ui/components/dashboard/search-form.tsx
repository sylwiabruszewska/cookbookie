import React from "react";

const SearchForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center mt-8"
    >
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        type="text"
        id="search"
        placeholder="Search recipes"
        className="border border-slate-500 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[--primary-color]"
      />
      <button
        type="submit"
        className="bg-slate-500 hover:bg-[--primary-color] text-white rounded-r px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
