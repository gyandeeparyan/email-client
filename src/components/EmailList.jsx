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
    <div className="bg-background max-h-[80vh] overflow-y-scroll">
     {filteredEmails.length === 0 ? (
        <div className="px-4 flex text-center item-center justify-start mt-52 text-gray-500">Everything is truly<span className="px-4 underline decoration-accent decoration-wavy items-center"> void</span>, and truth itself resides within the <span className="underline decoration-wavy decoration-accent items-center px-4  rounded-full">void</span></div>
      ) : (
        filteredEmails.map((email) => (
          <EmailListItem key={email.id} email={email} />
        ))
      )}
    </div>
  );
};