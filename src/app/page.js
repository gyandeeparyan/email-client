'use client';

import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import  {FilterButtons}  from '@/components/FilterButtons';
import  {EmailList}  from '@/components/EmailList';
import  {EmailBody}  from '@/components/EmailBody';
import { fetchEmails,fetchAndSelectEmail,setCurrentPage } from '@/features/emailSlice';

function Home() {
  const dispatch = useDispatch();
  const { selectedEmail, emails, currentPage,totalPages,  } = useSelector(state => state.email);
  useEffect(() => {
    // Fetch the emails initially
    dispatch(fetchEmails(currentPage));
  }, [dispatch,currentPage]);

  // Fetch email body once emails are loaded and there's a selected email
  useEffect(() => {
    if (emails.length > 0 && selectedEmail?.id) {
      dispatch(fetchAndSelectEmail({ page: currentPage, emailId: selectedEmail.id }));
    }
  }, [emails, selectedEmail, dispatch,currentPage]);


  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  return (
    <main className="min-h-screen bg-background text-text">
      <div className="container mx-auto p-4">
        <FilterButtons />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-background rounded-lg  animate-slide-in">
            <EmailList />
            {/* Pagination Controls */}
            {emails.length > 0 && ( <div className="flex justify-between px-6 items-center mt-4">
              <button
                disabled={currentPage === 1}
                onClick={handlePreviousPage}
                className="px-4 py-1 bg-accent text-white  rounded-full"
              >
                Previous
              </button>
              <span>{`Page ${currentPage} of ${totalPages}`}</span>
              <button
                disabled={currentPage === totalPages}
                onClick={handleNextPage}
                className="px-4 py-1 bg-accent text-white  rounded-full"
              >
                Next
              </button>
            </div>)}
           
          </div>
          <EmailBody />
        </div>
      </div>
    </main>
  );
}

export default Home