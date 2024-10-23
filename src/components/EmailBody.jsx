import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '@/features/emailSlice';

export const EmailBody = () => {
  const { selectedEmail, emails ,filter} = useSelector((state) => state.email);
  const email = emails.find((email) => email.id == selectedEmail?.id);
  const { id, date, from, subject, short_description } = email || {};
  const avatarLetter = from?.name.charAt(0).toUpperCase();

  const dispatch = useDispatch();



  const filteredEmails = emails?.filter(email => {
    switch (filter) {
      case 'read':
        return email.read;
      case 'unread':
        return !email.read;
      case 'favorite':
        return email.favorite;
      default:
        return true;
    }
  });
  if(filteredEmails.length === 0){
    return null
  }

  if (!selectedEmail) {
    return (
      <section className="hidden md:flex items-center justify-center h-full bg-white rounded-lg p-6">
        <p className="text-text text-center">Select an email to view its contents</p>
      </section>
    );
  }

 
  return (
    
    <section className="px-4">
      <article className="p-6 my-4 bg-white rounded-lg max-h-[80vh] overflow-y-scroll shadow animate-fade-in">
        <header className="flex items-center gap-4">
          <div className="w-10 h-10 px-4 flex-shrink-0 rounded-full bg-accent text-white flex items-center justify-center">
            {avatarLetter}
          </div>
          <div className="flex flex-col flex-grow">
            <h2 className="text-xl text-text font-semibold text-wrap line-clamp-1">{email?.subject}</h2>
            <time
              className="text-sm text-text"
              dateTime={new Date(date).toISOString()}
            >
              {new Date(date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </time>
          </div>
          <button
            onClick={() => dispatch(toggleFavorite(selectedEmail.id))}
            className="px-4 py-2 bg-accent flex-grow-0 flex-shrink-0 max-h-[35px] text-white text-sm rounded-full hover:bg-opacity-90 transition-colors"
          >
            {email?.favorite ? 'Remove Favorite' : 'Mark As Favorite'}
          </button>
        </header>

        <section className="prose py-4 max-w-none" dangerouslySetInnerHTML={{ __html: selectedEmail.body }} />
      </article>
    </section>
  );
};
