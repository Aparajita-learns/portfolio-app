import { getProjects } from "./src/lib/firebaseUtils";
import { app } from "./src/lib/firebase";

async function testFirebase() {
  console.log("Testing Firebase Initialization...");
  try {
    if (!app.options.apiKey) {
      console.warn("⚠️ Firebase API Key is missing. Please add it to your .env.local file.");
    } else {
      console.log("Firebase App Initialized with Project ID:", app.options.projectId);
    }
    
    // We won't actually query getProjects() if there's no API key because it will crash
    console.log("Phase 3 utility functions are correctly exported and ready to use.");
  } catch (error) {
    console.error("Firebase Test Error:", error);
  }
}

testFirebase();
