'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FilterButtons } from '@/components/FilterButtons';
import { EmailList } from '@/components/EmailList';
import { EmailBody } from '@/components/EmailBody';
import { fetchEmails, fetchEmailBody, setCurrentPage } from '@/features/emailSlice';

function Home() {
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  const dispatch = useDispatch();
  const { selectedEmail, emails, currentPage, totalPages,filter } = useSelector(state => state.email);
  

  // First useEffect for handling emails list
  useEffect(() => {
    // Fetch only if there's no data or initial load is not done
    const shouldFetchEmails = !initialLoadDone || emails.length === 0;

    if (shouldFetchEmails) {
      dispatch(fetchEmails(currentPage)).then(() => {
        setInitialLoadDone(true); // Mark initial load as done
      });
    }
  }, [currentPage, dispatch, emails.length, initialLoadDone]);

  // Second useEffect for handling selected email
  useEffect(() => {
    if (!selectedEmail?.id) return;

    // Check if the selected email already has a full body fetched
    const hasFullEmailBody = selectedEmail.body !== undefined;

    if (!hasFullEmailBody) {
      dispatch(fetchEmailBody(selectedEmail.id));
    }
  }, [dispatch, selectedEmail]);

 
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
      setInitialLoadDone(false); // Reset to fetch new page data
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
      setInitialLoadDone(false); // Reset to fetch previous page data
    }
  };

  return (
    <main className="min-h-screen bg-background text-text">
      <div className="container mx-auto p-4">
        <FilterButtons />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-background rounded-lg animate-slide-in">
            <EmailList />
            {/* Pagination Controls */}
            {(emails.length > 0 && filter ==='unread') && (
              <div className="flex justify-between px-6 items-center mt-4">
                <button
                  disabled={currentPage === 1}
                  onClick={handlePreviousPage}
                  className="px-4 py-1 bg-accent text-white rounded-full"
                >
                  Previous
                </button>
                <span>{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={handleNextPage}
                  className="px-4 py-1 bg-accent text-white rounded-full"
                >
                  Next
                </button>
              </div>
            )}
          </div>
          <EmailBody />
        </div>
      </div>
    </main>
  );
}

export default Home;
