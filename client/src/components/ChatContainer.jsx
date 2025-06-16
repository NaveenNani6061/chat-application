import { useEffect, useRef } from "react";
import useChatStore from "../stores/chatStore";
import useAuthStore from "../stores/authStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useSocket } from "../context/SocketContext";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const { socket } = useSocket();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <ChatHeader />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white dark:from-dark-700 dark:to-dark-800">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 flex items-center justify-center mx-auto">
                <span className="text-2xl">👋</span>
              </div>
              <div>
                <h3 className="font-medium text-dark-900 dark:text-white mb-1">
                  Start the conversation
                </h3>
                <p className="text-dark-500 dark:text-dark-400 text-sm">
                  Send a message to {selectedUser?.fullName}
                </p>
              </div>
            </div>
          </div>
        ) : (
          messages.map((message) => {
            const isOwnMessage = message.senderId === authUser._id;

            return (
              <div
                key={message._id}
                className={`flex items-end gap-2 ${isOwnMessage ? "justify-end" : "justify-start"}`}
              >
                {!isOwnMessage && (
                  <img
                    src={selectedUser.profilePic || "/avatar.png"}
                    alt={selectedUser.fullName}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-white dark:ring-dark-600"
                  />
                )}

                <div
                  className={`max-w-xs lg:max-w-md ${isOwnMessage ? "order-1" : "order-2"}`}
                >
                  <div
                    className={`px-4 py-3 rounded-2xl shadow-sm ${
                      isOwnMessage
                        ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-br-sm"
                        : "bg-white dark:bg-dark-700 text-dark-900 dark:text-white border border-gray-200 dark:border-dark-600 rounded-bl-sm"
                    }`}
                  >
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Shared image"
                        className="max-w-full h-auto rounded-xl mb-2 shadow-md"
                      />
                    )}
                    {message.message && (
                      <p className="text-sm leading-relaxed">
                        {message.message}
                      </p>
                    )}
                  </div>

                  <div
                    className={`mt-1 px-1 ${isOwnMessage ? "text-right" : "text-left"}`}
                  >
                    <span className="text-xs text-dark-400 dark:text-dark-500">
                      {formatMessageTime(message.createdAt)}
                    </span>
                  </div>
                </div>

                {isOwnMessage && (
                  <img
                    src={authUser.profilePic || "/avatar.png"}
                    alt={authUser.fullName}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-white dark:ring-dark-600 order-2"
                  />
                )}
              </div>
            );
          })
        )}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
