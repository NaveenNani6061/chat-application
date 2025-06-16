import { useState, useEffect } from "react";
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Volume2,
} from "lucide-react";

const CallInterface = ({ user, callType, isOpen, onClose }) => {
  const [callStatus, setCallStatus] = useState("connecting"); // connecting, ringing, connected, ended
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(callType === "video");
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    // Simulate call progression
    const timer1 = setTimeout(() => setCallStatus("ringing"), 1000);
    const timer2 = setTimeout(() => setCallStatus("connected"), 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isOpen]);

  useEffect(() => {
    if (callStatus !== "connected") return;

    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [callStatus]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleEndCall = () => {
    setCallStatus("ended");
    setTimeout(() => {
      onClose();
      setCallStatus("connecting");
      setCallDuration(0);
      setIsMuted(false);
      setIsVideoEnabled(callType === "video");
    }, 1000);
  };

  if (!isOpen || !user) return null;

  const getStatusText = () => {
    switch (callStatus) {
      case "connecting":
        return "Connecting...";
      case "ringing":
        return "Ringing...";
      case "connected":
        return formatDuration(callDuration);
      case "ended":
        return "Call Ended";
      default:
        return "";
    }
  };

  const getStatusColor = () => {
    switch (callStatus) {
      case "connecting":
        return "text-yellow-500";
      case "ringing":
        return "text-blue-500";
      case "connected":
        return "text-green-500";
      case "ended":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Call Header */}
        <div className="text-center p-8">
          <div className="relative mb-6">
            <img
              src={user.profilePic || "/avatar.png"}
              alt={user.fullName}
              className="w-32 h-32 rounded-full object-cover mx-auto shadow-xl"
            />
            {callStatus === "connecting" && (
              <div className="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent animate-spin"></div>
            )}
          </div>

          <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-2">
            {user.fullName}
          </h2>

          <div className="flex items-center justify-center gap-2 mb-4">
            {callType === "video" ? (
              <Video className="w-5 h-5 text-primary-500" />
            ) : (
              <Phone className="w-5 h-5 text-primary-500" />
            )}
            <span className={`text-lg font-medium ${getStatusColor()}`}>
              {getStatusText()}
            </span>
          </div>

          {/* Video preview area */}
          {callType === "video" && callStatus === "connected" && (
            <div className="bg-gray-900 rounded-xl p-4 mb-6 aspect-video relative">
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <div className="text-center">
                  <Video className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm opacity-75">Video call in progress</p>
                </div>
              </div>

              {/* Small self-view window */}
              <div className="absolute top-4 right-4 w-20 h-15 bg-gray-800 rounded-lg border-2 border-white/20 flex items-center justify-center">
                <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
              </div>
            </div>
          )}
        </div>

        {/* Call Controls */}
        <div className="p-6 bg-gray-50 dark:bg-dark-700">
          <div className="flex items-center justify-center gap-4">
            {/* Mute button */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-4 rounded-full transition-all duration-200 ${
                isMuted
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-gray-200 dark:bg-dark-600 hover:bg-gray-300 dark:hover:bg-dark-500 text-dark-700 dark:text-white"
              }`}
              disabled={callStatus !== "connected"}
            >
              {isMuted ? (
                <MicOff className="w-6 h-6" />
              ) : (
                <Mic className="w-6 h-6" />
              )}
            </button>

            {/* Video toggle (only for video calls) */}
            {callType === "video" && (
              <button
                onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                className={`p-4 rounded-full transition-all duration-200 ${
                  !isVideoEnabled
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-gray-200 dark:bg-dark-600 hover:bg-gray-300 dark:hover:bg-dark-500 text-dark-700 dark:text-white"
                }`}
                disabled={callStatus !== "connected"}
              >
                {isVideoEnabled ? (
                  <Video className="w-6 h-6" />
                ) : (
                  <VideoOff className="w-6 h-6" />
                )}
              </button>
            )}

            {/* Speaker button */}
            <button
              className="p-4 rounded-full bg-gray-200 dark:bg-dark-600 hover:bg-gray-300 dark:hover:bg-dark-500 text-dark-700 dark:text-white transition-colors"
              disabled={callStatus !== "connected"}
            >
              <Volume2 className="w-6 h-6" />
            </button>

            {/* End call button */}
            <button
              onClick={handleEndCall}
              className="p-4 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors shadow-lg"
            >
              <PhoneOff className="w-6 h-6" />
            </button>
          </div>

          {callStatus === "ended" && (
            <div className="text-center mt-4">
              <p className="text-dark-600 dark:text-dark-400">
                Call duration: {formatDuration(callDuration)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallInterface;
