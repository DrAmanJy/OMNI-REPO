import { useState, useEffect } from "react";
import { CalendarDays } from "lucide-react";

const Search = ({ title }) => {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(new Date().toDateString());
  }, []);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
      <div className="w-full sm:w-auto">
        {title ? (
          <h2 className="text-2xl font-bold">{title}</h2>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Optional: handle search action here
            }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
          >
            <input
              type="text"
              name="search"
              aria-label="Search doctor"
              placeholder="Search doctor name or email"
              className="border border-gray-300 px-3 py-2 rounded w-full sm:w-[35vw] text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Search
            </button>
          </form>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-gray-500 text-sm">Today’s Date</p>
          <p className="text-lg font-semibold">{date}</p>
        </div>
        <div className="bg-gray-200 p-3 rounded-xl">
          <CalendarDays size={28} className="text-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default Search;
