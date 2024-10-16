'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import  {FilterButtons}  from '@/components/FilterButtons';
import  {EmailList}  from '@/components/EmailList';
import  {EmailBody}  from '@/components/EmailBody';
import { fetchEmails } from '@/features/emailSlice';

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
   dispatch(fetchEmails(1))
  }, [dispatch]);

  return (
    <main className="min-h-screen bg-background text-text">
      <div className="container mx-auto p-4">
        <FilterButtons />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow animate-slide-in">
            <EmailList />
          </div>
          <EmailBody />
        </div>
      </div>
    </main>
  );
}

export default Home