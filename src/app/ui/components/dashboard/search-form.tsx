import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// import Icon from "../icon";

const SearchForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center mt-8"
    >
      <div className="relative">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          type="text"
          id="search"
          placeholder="Search recipes"
          className="border border-[--gray] rounded-l rounded-r px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[--primary-color] focus:border-[--primary-color]"
        />
        <button
          type="submit"
          className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full bg-[--gray-dark] hover:bg-[--primary-color] text-white rounded-r px-4 focus:outline-none focus:ring-2 focus:ring-[--primary-color] "
        >
          <FontAwesomeIcon icon={faSearch} className="text-sm w-full h-full" />
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
