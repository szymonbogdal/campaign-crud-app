import { Search } from "lucide-react";
import "./SearchBar.css";

const SearchBar = ({ searchTerm, onSearchChange }) => (
    <div className="search-bar">
        <Search size={20} />
        <input
            type="text"
            placeholder="Seach campaign..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
        />
    </div>
);

export default SearchBar;
