import { useState } from "react";
import { Camera, Mail, User, ArrowLeft, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import ProfileEdit from "../components/ProfileEdit";

const ProfilePage = () => {
  const { authUser } = useAuthStore();
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900">
      <div className="max-w-2xl mx-auto p-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/"
            className="p-2 hover:bg-white dark:hover:bg-dark-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-dark-600 dark:text-dark-400" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-dark-900 dark:text-white">
              Profile
            </h1>
            <p className="text-dark-600 dark:text-dark-400">
              Manage your account information
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl border border-gray-200 dark:border-dark-700 overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-32 bg-gradient-to-r from-primary-500 to-primary-600">
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          <div className="relative px-6 pb-6">
            {/* Avatar section */}
            <div className="flex flex-col items-center -mt-16 mb-6">
              <div className="relative">
                <img
                  src={authUser.profilePic || "/avatar.png"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-dark-800 shadow-xl"
                />
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-2 right-2 bg-primary-500 hover:bg-primary-600 p-3 rounded-full cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200 group"
                >
                  <Camera className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              </div>
              <h2 className="text-xl font-bold text-dark-900 dark:text-white mt-4">
                {authUser?.fullName}
              </h2>
              <p className="text-dark-500 dark:text-dark-400">
                @{authUser?.username}
              </p>
            </div>

            {/* Profile Information */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-dark-700 dark:text-dark-300">
                    <User className="w-4 h-4" />
                    Full Name
                  </label>
                  <div className="p-3 bg-gray-50 dark:bg-dark-700 rounded-xl border border-gray-200 dark:border-dark-600">
                    <p className="text-dark-900 dark:text-white">
                      {authUser?.fullName}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-dark-700 dark:text-dark-300">
                    <Mail className="w-4 h-4" />
                    Username
                  </label>
                  <div className="p-3 bg-gray-50 dark:bg-dark-700 rounded-xl border border-gray-200 dark:border-dark-600">
                    <p className="text-dark-900 dark:text-white">
                      @{authUser?.username}
                    </p>
                  </div>
                </div>
              </div>

              {/* Account Stats */}
              <div className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl p-6 border border-primary-200 dark:border-primary-800">
                <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-4">
                  Account Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white dark:bg-dark-700 rounded-lg">
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {authUser?.createdAt
                        ? new Date(authUser.createdAt).toLocaleDateString()
                        : "N/A"}
                    </div>
                    <div className="text-sm text-dark-600 dark:text-dark-400">
                      Member Since
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white dark:bg-dark-700 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      Active
                    </div>
                    <div className="text-sm text-dark-600 dark:text-dark-400">
                      Account Status
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowEditModal(true)}
                  className="flex-1 py-3 px-4 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
                <button className="flex-1 py-3 px-4 bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 text-dark-900 dark:text-white font-medium rounded-xl transition-colors">
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Edit Modal */}
      <ProfileEdit
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
      />
    </div>
  );
};

export default ProfilePage;
