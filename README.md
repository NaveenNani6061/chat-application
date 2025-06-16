# Real-Time Chat App 💬

A full-featured real-time messaging application built using the MERN stack (MongoDB, Express, React, Node.js), enhanced with Socket.io for real-time communication.

## 🚀 Features

- **Real-time messaging** with Socket.io
- **User authentication** with JWT
- **Online/Offline status** indicators
- **Unread message count** tracking
- **User profiles** with profile pictures
- **Responsive design** with TailwindCSS and DaisyUI
- **Image sharing** in messages
- **Global state management** with Zustand

## 🛠 Tech Stack

- **Frontend**: React.js, TailwindCSS, DaisyUI, Zustand
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Real-time**: Socket.io
- **Authentication**: JWT (JSON Web Token)
- **Styling**: TailwindCSS, DaisyUI

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## 🔧 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd realtime-chat-app
   ```

2. **Install dependencies**

   ```bash
   npm run install-deps
   ```

3. **Setup Environment Variables**

   Create a `.env` file in the `server` directory:

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/chatapp
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   NODE_ENV=development
   ```

   **For MongoDB Atlas (recommended):**
   Replace `MONGODB_URI` with your MongoDB Atlas connection string:

   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chatapp
   ```

4. **Start the application**

   ```bash
   npm run dev
   ```

   This will start both the server (port 5000) and client (port 3000) concurrently.

## 🚀 Usage

1. **Access the application**

   - Open your browser and go to `http://localhost:3000`

2. **Create an account**

   - Click on "Create account" to sign up
   - Fill in your details (full name, username, password, gender)

3. **Start chatting**
   - Log in with your credentials
   - Select a user from the sidebar to start chatting
   - Send text messages or images
   - See real-time online/offline status
   - Track unread message counts

## 📁 Project Structure

```
realtime-chat-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── stores/        # Zustand stores
│   │   ├── context/       # React context
│   │   ├── lib/          # Utility functions
│   │   └── ...
├── server/                # Node.js backend
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── socket/           # Socket.io configuration
│   ├── utils/            # Utility functions
│   └── ...
└── package.json          # Root package.json
```

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/check` - Check authentication status

### Users

- `GET /api/users` - Get all users (except current user)
- `GET /api/users/:id` - Get specific user profile

### Messages

- `GET /api/messages/:id` - Get messages with specific user
- `POST /api/messages/send/:id` - Send message to specific user
- `PUT /api/messages/read/:id` - Mark messages as read
- `GET /api/messages/unread/count` - Get unread message counts

## 🌐 Socket Events

- `connection` - User connects
- `disconnect` - User disconnects
- `getOnlineUsers` - Get list of online users
- `newMessage` - Receive new message

## 🎨 Customization

The app uses DaisyUI themes. You can change the theme by modifying the `data-theme` attribute in `client/src/App.jsx`:

```jsx
<div data-theme="coffee"> // Change to any DaisyUI theme
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)

1. Build the client: `cd client && npm run build`
2. Deploy the `dist` folder

### Backend (Railway/Render/Heroku)

1. Set environment variables in your hosting platform
2. Deploy the `server` directory
3. Update CORS origins in server code

### Database

- Use MongoDB Atlas for production
- Update the `MONGODB_URI` in your environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

1. **MongoDB connection failed**

   - Make sure MongoDB is running locally, or
   - Use MongoDB Atlas and update the connection string

2. **Port already in use**

   - Change the port in the environment variables
   - Kill any processes using ports 3000 or 5000

3. **Dependencies not installing**

   - Delete `node_modules` and `package-lock.json`
   - Run `npm run install-deps` again

4. **Socket.io connection issues**
   - Check if both frontend and backend are running
   - Verify the Socket.io URL in the frontend matches your backend URL

## 🔗 Links

- [Socket.io Documentation](https://socket.io/docs/)
- [React Documentation](https://react.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [DaisyUI Documentation](https://daisyui.com/)

---

**Happy Chatting! 💬✨**
