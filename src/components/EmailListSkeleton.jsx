export const EmailListSkeleton = () => {
    return (
      <section aria-label="Loading emails" className="space-y-4 animate-pulse">
      <ul>
        {[1, 2, 3, 4, 5].map((i) => (
          <li key={i} className="p-4 flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-200" aria-hidden="true" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/4" aria-hidden="true" />
              <div className="h-4 bg-gray-200 rounded w-3/4" aria-hidden="true" />
              <div className="h-4 bg-gray-200 rounded w-1/2" aria-hidden="true" />
            </div>
          </li>
        ))}
      </ul>
    </section>
    
    );
  };