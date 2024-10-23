import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '@/features/emailSlice';

export const FilterButtons = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.email?.filter);

  return (
    <section className="flex gap-2 items-center justify-start p-4">
    <label className="text-center">Filter By:</label>
    <div role="group" aria-label="Email Filters">
      {['unread', 'read', 'favorite'].map((filterType) => (
        <button
          key={filterType}
          onClick={() => dispatch(setFilter(filterType))}
          className={`px-4 py-1 m-2 rounded-full capitalize transition-colors
            ${filter === filterType ? 'bg-accent text-white' : 'bg-filterButton text-text'}`}
        >
          {filterType}
        </button>
      ))}
    </div>
  </section>
  
  );
};
