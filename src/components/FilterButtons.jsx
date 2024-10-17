import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '@/features/emailSlice';

export const FilterButtons = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.email?.filter);

  return (
    <div className="flex gap-2 items-center justify-start p-4">
        <p className="text-center ">Filter By:</p>
      {[ 'unread', 'read', 'favorite'].map((filterType) => (
        <button
          key={filterType}
          onClick={() => dispatch(setFilter(filterType))}
          className={`px-4 py-2 rounded-full capitalize transition-colors
            ${filter === filterType ? 'bg-accent text-white' : 'bg-filterButton text-text'}`}
        >
          {filterType}
        </button>
      ))}
    </div>
  );
};
