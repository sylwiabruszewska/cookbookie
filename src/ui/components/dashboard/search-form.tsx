import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/ui/components/button";

// import Icon from "../icon";

const SearchForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="w-[300px] lg:w-[400px] ">
      <div className="relative">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          type="text"
          id="search"
          placeholder="Search recipes"
          className="w-full border border-[--gray] focus:outline-none focus:ring-2 focus:ring-[--gray-dark] focus:border-[--gray-dark] rounded-tl-[20px] rounded-bl-[40px] rounded-br-[20px] rounded-tr-[40px] h-10 p-6 lg:p-8 pr-24"
        />
        <Button
          variant="dark"
          type="submit"
          className="absolute top-0 end-0 text-sm font-medium h-full rounded-r rounded-l-none focus:outline-none focus:ring-2 focus:ring-[--primary-color] rounded-tl-[20px] rounded-bl-[40px] rounded-br-[20px] rounded-tr-[40px] p-2 px-8"
        >
          <FontAwesomeIcon icon={faSearch} className="text-sm w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
