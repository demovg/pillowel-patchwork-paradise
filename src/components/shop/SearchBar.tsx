
import { Search } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          type="submit"
          className="absolute right-2 p-1 text-gray-500 hover:text-black"
        >
          <Search size={18} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
