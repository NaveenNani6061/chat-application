#!/usr/bin/env node

import fetch from "node-fetch";
import { promises as fs } from "fs";

console.log("🔍 Checking Chat App Setup...\n");

// Check if server is running
async function checkServer() {
  try {
    const response = await fetch("http://localhost:5000/api/health");
    const data = await response.json();
    console.log("✅ Server: Running on port 5000");
    return true;
  } catch (error) {
    console.log("❌ Server: Not running or not responding");
    console.log("   💡 Run: npm run dev");
    return false;
  }
}

// Check if client is running
async function checkClient() {
  try {
    const response = await fetch("http://localhost:3000");
    if (response.ok) {
      console.log("✅ Client: Running on port 3000");
      return true;
    }
  } catch (error) {
    console.log("❌ Client: Not running or not responding");
    console.log("   💡 Run: npm run dev");
    return false;
  }
}

// Check environment file
async function checkEnv() {
  try {
    await fs.access("server/.env");
    console.log("✅ Environment: server/.env file exists");
    return true;
  } catch (error) {
    console.log("❌ Environment: server/.env file missing");
    console.log("   💡 Copy server/.env.example to server/.env");
    return false;
  }
}

// Check dependencies
async function checkDeps() {
  try {
    await fs.access("node_modules");
    await fs.access("server/node_modules");
    await fs.access("client/node_modules");
    console.log("✅ Dependencies: All installed");
    return true;
  } catch (error) {
    console.log("❌ Dependencies: Missing dependencies");
    console.log("   💡 Run: npm run install-deps");
    return false;
  }
}

async function main() {
  const checks = [
    await checkDeps(),
    await checkEnv(),
    await checkServer(),
    await checkClient(),
  ];

  const allPassed = checks.every((check) => check);

  console.log("\n" + "=".repeat(50));

  if (allPassed) {
    console.log("🎉 Setup Complete! Your chat app is ready!");
    console.log("📱 Open: http://localhost:3000");
  } else {
    console.log("⚠️  Setup Issues Found - Follow the tips above");
  }

  console.log("\n📚 For MongoDB setup: See MONGODB_SETUP.md");
  console.log("🐛 For help: Check README.md");
}

main().catch(console.error);
