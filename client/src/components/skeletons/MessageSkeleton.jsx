const MessageSkeleton = () => {
  // Create skeleton messages
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white dark:from-dark-700 dark:to-dark-800">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`flex items-end gap-2 ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}
        >
          {idx % 2 === 0 && (
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-dark-600 animate-pulse" />
          )}

          <div
            className={`max-w-xs lg:max-w-md ${idx % 2 === 0 ? "order-2" : "order-1"}`}
          >
            <div
              className={`px-4 py-3 rounded-2xl ${
                idx % 2 === 0
                  ? "bg-gray-200 dark:bg-dark-600 rounded-bl-sm"
                  : "bg-gray-200 dark:bg-dark-600 rounded-br-sm"
              }`}
            >
              <div className="h-4 bg-gray-300 dark:bg-dark-500 rounded animate-pulse mb-2" />
              <div className="h-4 bg-gray-300 dark:bg-dark-500 rounded animate-pulse w-3/4" />
            </div>

            <div
              className={`mt-1 px-1 ${idx % 2 === 0 ? "text-left" : "text-right"}`}
            >
              <div className="h-3 w-12 bg-gray-200 dark:bg-dark-600 rounded animate-pulse" />
            </div>
          </div>

          {idx % 2 !== 0 && (
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-dark-600 animate-pulse order-2" />
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
