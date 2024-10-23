import { useSelector } from 'react-redux';
import { EmailListItem } from './EmailListItem';
import { EmailListSkeleton } from './EmailListSkeleton';

export const EmailList = () => {
  const { emails, filter, loading } = useSelector((state) => state.email);

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

  if (loading) {
    return <EmailListSkeleton />;
  }

  return (
    <section className="bg-background max-h-[80vh] overflow-y-scroll">
  {filteredEmails.length === 0 ? (
   <p className="px-2 text-center mt-[200px]  break-words md:text-left md:mt-52 text-gray-500">
   Everything is truly
   <span className="px-2 underline decoration-accent decoration-wavy"> void</span>, 
   and truth itself resides within the
   <span className="underline decoration-wavy decoration-accent px-2 rounded-full"> void</span>
 </p>
  ) : (
    <ul>
      {filteredEmails.map((email) => (
        <EmailListItem key={email.id} email={email} />
      ))}
    </ul>
  )}
</section>

  );
};