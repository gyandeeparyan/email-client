import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '@/features/emailSlice';

export const EmailBody = () => {
  const { selectedEmail } = useSelector((state) => state.email);
  const dispatch = useDispatch();

  if (!selectedEmail) {
    return (
      <div className="hidden md:flex items-center justify-center h-full bg-white rounded-lg p-6">
        <p className="text-text">Select an email to view its contents</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{selectedEmail.subject}</h2>
        <button
          onClick={() => dispatch(toggleFavorite(selectedEmail.id))}
          className="px-4 py-2 bg-accent text-white rounded-full hover:bg-opacity-90 transition-colors"
        >
          Mark as Favorite
        </button>
      </div>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: selectedEmail.body }} />
    </div>
  );
};