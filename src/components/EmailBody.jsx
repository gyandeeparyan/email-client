import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '@/features/emailSlice';

export const EmailBody = () => {
  const { selectedEmail ,emails} = useSelector((state) => state.email);
  const email = emails.find((email) => email.id == selectedEmail.id);
  const { id, date, from,subject, short_description } = email || {};
  const avatarLetter = from.name.charAt(0).toUpperCase();

  const dispatch = useDispatch();

  if (!selectedEmail) {
    return (
      <div className="hidden md:flex items-center justify-center h-full bg-white rounded-lg p-6">
        <p className="text-text">Select an email to view its contents</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white flex gap-4 rounded-lg shadow animate-fade-in">
        <div className="w-10 h-10 rounded-full bg-accent text-white flex flex-shrink-0 items-center justify-center">
        {avatarLetter}
      </div>
      <div className="flex flex-col gap-4  mb-4">
       <div className='flex  justify-between'>
        <div className="flex flex-col">
        <h2 className="text-xl text-text font-semibold">{email.subject}</h2>
        <br/>
        <div className="text-sm text-text">
        {new Date(date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
       
      </div>
        </div>
     
        <button
          onClick={() => dispatch(toggleFavorite(selectedEmail.id))}
          className="px-4 py-2 bg-accent flex-grow-0 flex-shrink-0 max-h-[35px] text-white text-sm rounded-full hover:bg-opacity-90 transition-colors"
        >
         {email.favorite?"Remove Favorite":"Mark As Favorite"}
        </button>
       </div>
       <div className="prose py-4 max-w-none" dangerouslySetInnerHTML={{ __html: selectedEmail.body }} />
      

        

      </div>

    </div>
  );
};