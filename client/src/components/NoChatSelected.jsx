import { MessageSquare, Sparkles } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-16 bg-gradient-to-br from-gray-50 to-white dark:from-dark-700 dark:to-dark-800">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display with animated background */}
        <div className="relative flex justify-center mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-tr from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 rounded-full animate-pulse-soft"></div>
          </div>
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-primary-500 to-primary-600 flex items-center justify-center shadow-xl">
            <MessageSquare className="w-10 h-10 text-white" />
            <Sparkles className="w-4 h-4 text-primary-200 absolute -top-1 -right-1 animate-bounce" />
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-dark-800 to-dark-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
            Welcome to ChatApp!
          </h2>
          <p className="text-dark-600 dark:text-dark-400 leading-relaxed">
            Select a conversation from the sidebar to start chatting with your
            friends and family.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 gap-4 mt-8">
          <div className="flex items-center gap-3 p-4 bg-white dark:bg-dark-700 rounded-xl border border-gray-200 dark:border-dark-600">
            <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-left">
              <p className="font-medium text-dark-900 dark:text-white text-sm">
                Real-time messaging
              </p>
              <p className="text-dark-500 dark:text-dark-400 text-xs">
                Instant message delivery
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-white dark:bg-dark-700 rounded-xl border border-gray-200 dark:border-dark-600">
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-left">
              <p className="font-medium text-dark-900 dark:text-white text-sm">
                Rich media sharing
              </p>
              <p className="text-dark-500 dark:text-dark-400 text-xs">
                Share images and more
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
