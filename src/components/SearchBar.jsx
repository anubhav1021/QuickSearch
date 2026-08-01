import { Search } from "lucide-react";

function SearchBar({
  search,
  setSearch,
}) {
  return (
    <div className="flex items-center gap-3 w-full bg-white border border-slate-300 rounded-xl px-4 h-12 shadow-sm">

      <Search
        size={20}
        className="text-slate-500 flex-shrink-0"
      />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search documents..."
        className="flex-1 bg-transparent outline-none"
      />

    </div>
  );
}

export default SearchBar;