import { useDispatch ,useSelector} from 'react-redux';
import { markAsRead, fetchEmailBody } from '@/features/emailSlice';

export const EmailListItem = ({ email }) => {
  const { selectedEmail} = useSelector((state) => state.email);
  const dispatch = useDispatch();
  const avatarLetter = email?.from.name.charAt(0).toUpperCase();

  const handleClick = () => {
    dispatch(markAsRead(email.id));
    dispatch(fetchEmailBody(email.id));
  };

  return (
    <div 
      onClick={handleClick}
      className={`p-4 flex text-wrap  gap-4 m-4 rounded-lg cursor-pointer transition-colors duration-200
        ${email.read ? 'bg-readBackground ' : 'bg-white border-[1px] hover:bg-gray-50'}
        ${selectedEmail?.id === email.id ? 'border-accent border-[1px] bg-white ' : 'border-gray-300'} 
        border-[1px]
        `}
    >
      <div className="w-10 h-10 rounded-full bg-accent text-white flex flex-shrink-0 items-center justify-center">
        {avatarLetter}
      </div>
      <div className="flex text-wrap flex-col">
        <h3 className="font-medium">{`From: ${email.from.name} `}<span className="font-bold">{`<${email.from.email}>`}</span></h3>
        
        <p className="text-sm text-text">{`Subject: `}<span className="font-bold">{` ${email.subject}`}</span></p>
        <br/>
        <p className="text-sm text-text truncate text-wrap line-clamp-1">{email.short_description}</p>
      
        <div className="text-sm  text-text">
        {new Date(email.date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}

{email.favorite && (
          <span className="text-xs mx-6 font-semibold text-accent">Favorite</span>
        )}
      </div>
      
      </div>
      
    </div>
  );
};
