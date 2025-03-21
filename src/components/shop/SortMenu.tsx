
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from 'lucide-react';

interface SortMenuProps {
  onSort: (option: string) => void;
}

const SortMenu = ({ onSort }: SortMenuProps) => {
  const [selectedOption, setSelectedOption] = useState('Newest');
  
  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSort(option);
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center border border-gray-200 rounded-md px-4 py-2 text-sm">
        Sort by: {selectedOption}
        <ChevronDown className="ml-2 h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white border shadow-lg rounded-md min-w-[180px] z-50">
        <DropdownMenuItem onClick={() => handleSelect('Newest')} className="cursor-pointer">
          Newest
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSelect('Price: Low to High')} className="cursor-pointer">
          Price: Low to High
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSelect('Price: High to Low')} className="cursor-pointer">
          Price: High to Low
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSelect('Popularity')} className="cursor-pointer">
          Popularity
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortMenu;
