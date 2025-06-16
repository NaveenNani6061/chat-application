import { useState } from "react";
import { ArrowLeft, MoreVertical, Phone, Video, Info } from "lucide-react";
import useChatStore from "../stores/chatStore";
import { useSocket } from "../context/SocketContext";
import CallInterface from "./CallInterface";
import UserProfile from "./UserProfile";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useSocket();
  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="p-4 border-b border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Back button for mobile */}
          <button
            onClick={() => setSelectedUser(null)}
            className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-dark-600 dark:text-dark-400" />
          </button>

          {/* User info */}
          <div className="relative">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200 dark:ring-dark-600"
            />
            {isOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full ring-2 ring-white dark:ring-dark-800"></div>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-dark-900 dark:text-white">
              {selectedUser.fullName}
            </h3>
            <p
              className={`text-sm ${isOnline ? "text-green-500" : "text-dark-500 dark:text-dark-400"}`}
            >
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors text-dark-600 dark:text-dark-400 hover:text-primary-500">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors text-dark-600 dark:text-dark-400 hover:text-primary-500">
            <Video className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors text-dark-600 dark:text-dark-400 hover:text-primary-500">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
