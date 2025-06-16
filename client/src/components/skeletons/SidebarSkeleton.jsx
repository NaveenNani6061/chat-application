const SidebarSkeleton = () => {
  // Create array of 8 skeleton items
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="w-80 border-r border-gray-200 dark:border-dark-700 flex flex-col bg-gray-50 dark:bg-dark-800">
      {/* Header skeleton */}
      <div className="p-6 border-b border-gray-200 dark:border-dark-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-gray-200 dark:bg-dark-600 animate-pulse" />
            <div>
              <div className="h-5 w-16 bg-gray-200 dark:bg-dark-600 rounded animate-pulse mb-1" />
              <div className="h-4 w-12 bg-gray-200 dark:bg-dark-600 rounded animate-pulse" />
            </div>
          </div>
          <div className="size-9 bg-gray-200 dark:bg-dark-600 rounded-lg animate-pulse" />
        </div>

        {/* Search skeleton */}
        <div className="h-11 bg-gray-200 dark:bg-dark-600 rounded-xl animate-pulse mb-4" />

        {/* Filter skeleton */}
        <div className="flex items-center gap-2">
          <div className="size-4 bg-gray-200 dark:bg-dark-600 rounded animate-pulse" />
          <div className="h-4 w-24 bg-gray-200 dark:bg-dark-600 rounded animate-pulse" />
        </div>
      </div>

      {/* Contact list skeleton */}
      <div className="flex-1 overflow-y-auto p-2">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="p-4 flex items-center gap-3 rounded-xl">
            {/* Avatar skeleton */}
            <div className="size-12 rounded-full bg-gray-200 dark:bg-dark-600 animate-pulse" />

            {/* User info skeleton */}
            <div className="flex-1 min-w-0">
              <div className="h-4 w-32 bg-gray-200 dark:bg-dark-600 rounded animate-pulse mb-2" />
              <div className="h-3 w-16 bg-gray-200 dark:bg-dark-600 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* User profile skeleton */}
      <div className="p-4 border-t border-gray-200 dark:border-dark-700">
        <div className="flex items-center gap-3 p-3 rounded-xl">
          <div className="size-10 rounded-full bg-gray-200 dark:bg-dark-600 animate-pulse" />
          <div className="flex-1 min-w-0">
            <div className="h-4 w-24 bg-gray-200 dark:bg-dark-600 rounded animate-pulse mb-1" />
            <div className="h-3 w-20 bg-gray-200 dark:bg-dark-600 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
