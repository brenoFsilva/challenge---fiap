import { useEffect, useState, type ChangeEvent } from "react";
import type Data from "../interfaces/Data";
import type { Filter } from "../interfaces/Filter";

interface FilterListProps {
  data: Data[];
  atributeName: keyof Data;
  setFilter: React.Dispatch<React.SetStateAction<Filter | null>>;
  resetSignal: boolean;
}





function FilterList({ data, atributeName, setFilter, resetSignal }: FilterListProps) {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const options = [...new Set(data.map((item) => item[atributeName]))];

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const checked = e.target.checked;

        setSelectedOptions(prev => {
            if (checked) {
                return [...prev, value];
            } else {
                return prev.filter(option => option !== value);
            }
        });
    };

    useEffect(() => {
  setFilter(prev => {
    const next = { ...(prev ?? {}) } as Filter;

    if (selectedOptions.length === 0) {
      delete next[atributeName];
    } else {
      next[atributeName] = selectedOptions;
    }

    return next;
  });
}, [selectedOptions]);

useEffect(() => {
  setSelectedOptions([]); // dispara reset visual
}, [resetSignal]);

    

    return (
        <div>
            <h3>{atributeName}</h3>
            <ul>
                {options.map((item) => (
                    <li key={item as string}>
                        <label>
                            <input
                                type="checkbox"
                                name={`${atributeName}`}
                                value={item as string}
                                checked={selectedOptions.includes(item as string)}
                                onChange={handleChange}
                            />
                            {item}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FilterList;
