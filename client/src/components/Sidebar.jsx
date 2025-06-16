import { useEffect, useState } from "react";
import { Users, Search, Settings, LogOut, Info } from "lucide-react";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import UserProfile from "./UserProfile";
import useChatStore from "../stores/chatStore";
import useAuthStore from "../stores/authStore";
import { useSocket } from "../context/SocketContext";

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    isUsersLoading,
    unreadCounts,
    getUnreadCount,
  } = useChatStore();
  const { logout, authUser } = useAuthStore();
  const { onlineUsers } = useSocket();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfileUser, setSelectedProfileUser] = useState(null);
  const [showUserProfile, setShowUserProfile] = useState(false);

  const handleUserProfileClick = (user, e) => {
    e.stopPropagation();
    setSelectedProfileUser(user);
    setShowUserProfile(true);
  };

  const handleChatClick = (user) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    getUsers();
    getUnreadCount();
  }, [getUsers, getUnreadCount]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOnlineFilter = showOnlineOnly
      ? onlineUsers.includes(user._id)
      : true;
    return matchesSearch && matchesOnlineFilter;
  });

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="w-80 border-r border-gray-200 dark:border-dark-700 flex flex-col bg-gray-50 dark:bg-dark-800 transition-all duration-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-dark-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-gradient-to-tr from-primary-500 to-primary-600 flex items-center justify-center">
              <Users className="size-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-dark-900 dark:text-white">
                Chats
              </h1>
              <p className="text-sm text-dark-500 dark:text-dark-400">
                {onlineUsers.length - 1} online
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors text-dark-500 hover:text-red-500"
            title="Logout"
          >
            <LogOut className="size-5" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-dark-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors text-dark-900 dark:text-white placeholder-dark-500"
          />
        </div>

        {/* Online filter toggle */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className="sr-only"
          />
          <div
            className={`w-4 h-4 rounded border-2 transition-colors ${
              showOnlineOnly
                ? "border-primary-500 bg-primary-500"
                : "border-dark-300 dark:border-dark-600"
            }`}
          >
            {showOnlineOnly && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-2 h-1 bg-white transform rotate-45 origin-left scale-x-110"></div>
                <div className="w-1 h-2 bg-white transform -rotate-45 -ml-1 mt-0.5"></div>
              </div>
            )}
          </div>
          <span className="text-sm text-dark-600 dark:text-dark-400">
            Show online only
          </span>
        </label>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto">
        {filteredUsers.length === 0 ? (
          <div className="p-6 text-center text-dark-500 dark:text-dark-400">
            {searchTerm ? "No conversations found" : "No online users"}
          </div>
        ) : (
          <div className="p-2">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className={`relative group rounded-xl transition-all duration-200 hover:bg-white dark:hover:bg-dark-700 ${
                  selectedUser?._id === user._id
                    ? "bg-white dark:bg-dark-700 shadow-sm ring-1 ring-primary-500/20"
                    : ""
                }`}
              >
                <button
                  onClick={() => handleChatClick(user)}
                  className="w-full p-4 flex items-center gap-3"
                >
                  <div className="relative">
                    <img
                      src={user.profilePic || "/avatar.png"}
                      alt={user.fullName}
                      className="size-12 object-cover rounded-full ring-2 ring-white dark:ring-dark-600"
                    />
                    {onlineUsers.includes(user._id) && (
                      <div className="absolute -bottom-0.5 -right-0.5 size-4 bg-green-500 rounded-full ring-2 ring-white dark:ring-dark-700"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-dark-900 dark:text-white truncate">
                        {user.fullName}
                      </h3>
                      <div className="flex items-center gap-1">
                        {unreadCounts[user._id] > 0 && (
                          <div className="size-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                            {unreadCounts[user._id] > 9
                              ? "9+"
                              : unreadCounts[user._id]}
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-dark-500 dark:text-dark-400">
                      {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                    </p>
                  </div>
                </button>

                {/* Profile view button */}
                <button
                  onClick={(e) => handleUserProfileClick(user, e)}
                  className="absolute top-2 right-2 p-2 bg-gray-100 dark:bg-dark-600 hover:bg-gray-200 dark:hover:bg-dark-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                  title="View Profile"
                >
                  <Info className="w-4 h-4 text-dark-600 dark:text-dark-400" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* User Profile at bottom */}
      <div className="p-4 border-t border-gray-200 dark:border-dark-700">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-dark-700">
          <img
            src={authUser?.profilePic || "/avatar.png"}
            alt={authUser?.fullName}
            className="size-10 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-dark-900 dark:text-white truncate">
              {authUser?.fullName}
            </h4>
            <p className="text-sm text-dark-500 dark:text-dark-400 truncate">
              @{authUser?.username}
            </p>
          </div>
        </div>
      </div>

      {/* User Profile Modal */}
      <UserProfile
        user={selectedProfileUser}
        isOpen={showUserProfile}
        onClose={() => {
          setShowUserProfile(false);
          setSelectedProfileUser(null);
        }}
      />
    </aside>
  );
};

export default Sidebar;
