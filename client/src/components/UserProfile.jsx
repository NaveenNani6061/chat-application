import { X, MessageCircle, Phone, Video, Calendar, Globe } from "lucide-react";
import { useSocket } from "../context/SocketContext";
import useChatStore from "../stores/chatStore";

const UserProfile = ({ user, isOpen, onClose }) => {
  const { onlineUsers } = useSocket();
  const { setSelectedUser } = useChatStore();
  const isOnline = onlineUsers.includes(user?._id);

  if (!isOpen || !user) return null;

  const handleStartChat = () => {
    setSelectedUser(user);
    onClose();
  };

  const handleCall = (type) => {
    // TODO: Implement call functionality
    console.log(`Starting ${type} call with ${user.fullName}`);
    // This would integrate with WebRTC or a calling service
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-dark-700 w-full max-w-md overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="relative h-32 bg-gradient-to-r from-primary-500 to-primary-600">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* Profile Content */}
        <div className="relative px-6 pb-6">
          {/* Avatar */}
          <div className="flex justify-center -mt-16 mb-4">
            <div className="relative">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName}
                className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-dark-800 shadow-xl"
              />
              {isOnline && (
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-dark-800"></div>
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-1">
              {user.fullName}
            </h2>
            <p className="text-dark-500 dark:text-dark-400 mb-2">
              @{user.username}
            </p>
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                isOnline
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-400"}`}
              ></div>
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>

          {/* User Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 dark:bg-dark-700 rounded-xl">
              <Calendar className="w-6 h-6 text-primary-500 mx-auto mb-2" />
              <div className="text-sm text-dark-600 dark:text-dark-400">
                Joined
              </div>
              <div className="font-semibold text-dark-900 dark:text-white">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-dark-700 rounded-xl">
              <Globe className="w-6 h-6 text-primary-500 mx-auto mb-2" />
              <div className="text-sm text-dark-600 dark:text-dark-400">
                Status
              </div>
              <div className="font-semibold text-dark-900 dark:text-white">
                {user.gender || "Not specified"}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={handleStartChat}
              className="flex flex-col items-center gap-2 p-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-colors"
            >
              <MessageCircle className="w-6 h-6" />
              <span className="text-sm font-medium">Message</span>
            </button>

            <button
              onClick={() => handleCall("voice")}
              className="flex flex-col items-center gap-2 p-4 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors"
            >
              <Phone className="w-6 h-6" />
              <span className="text-sm font-medium">Call</span>
            </button>

            <button
              onClick={() => handleCall("video")}
              className="flex flex-col items-center gap-2 p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
            >
              <Video className="w-6 h-6" />
              <span className="text-sm font-medium">Video</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
