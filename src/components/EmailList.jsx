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
    <div className="divide-y divide-border">
      {filteredEmails.map((email) => (
        <EmailListItem key={email.id} email={email} />
      ))}
    </div>
  );
};