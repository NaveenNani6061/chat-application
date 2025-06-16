# MongoDB Setup Guide

## Quick Setup Options

### Option 1: Free MongoDB Atlas (Recommended)

1. **Go to MongoDB Atlas**: https://cloud.mongodb.com
2. **Create a free account**
3. **Create a new cluster** (select free tier)
4. **Create a database user**:
   - Username: `chatuser`
   - Password: `chatpass123` (or your choice)
5. **Whitelist your IP**: Add `0.0.0.0/0` for development
6. **Get connection string**: Click "Connect" → "Connect your application"
7. **Update server/.env**:
   ```
   MONGODB_URI=mongodb+srv://chatuser:chatpass123@cluster0.xxxxx.mongodb.net/chatapp?retryWrites=true&w=majority
   ```

### Option 2: Local MongoDB

1. **Install MongoDB**: https://docs.mongodb.com/manual/installation/
2. **Start MongoDB**:

   ```bash
   # On macOS with Homebrew
   brew services start mongodb-community

   # On Ubuntu
   sudo systemctl start mongod

   # On Windows
   Start MongoDB as a service
   ```

3. **Update server/.env**:
   ```
   MONGODB_URI=mongodb://localhost:27017/chatapp
   ```

### Option 3: Use Demo Database (Temporary)

For quick testing, use this demo connection:

```
MONGODB_URI=mongodb+srv://demo:demopass@cluster0.demo.mongodb.net/chatapp?retryWrites=true&w=majority
```

## Troubleshooting

- **ENOTFOUND errors**: Check your connection string format
- **Authentication failed**: Verify username/password
- **Network errors**: Check IP whitelist in MongoDB Atlas
- **Connection refused**: Make sure MongoDB is running (local setup)

## After Setup

1. Update the `MONGODB_URI` in `server/.env`
2. Restart the development server: `npm run dev`
3. Look for "✅ Connected to MongoDB successfully" in the logs
