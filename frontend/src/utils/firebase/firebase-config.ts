// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  getAuth,
  signInWithPopup,
  signOut,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);

// optional
googleProvider.setCustomParameters({
  prompt: "select_account",
});

//
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // Session persistence successfully enabled
    console.log("Session persistence enabled.");
  })
  .catch((error) => {
    console.error("Error enabling session persistence: ", error);
  });

// authendicate user

export const signupWithGoogle = async () => {
  return await signInWithPopup(auth, googleProvider);
};

//signout

export const signOutUser = async () => await signOut(auth);

// File upload

export const uploadFile = async (file: any) => {
  try {
    const storage = getStorage();
    const storageRef = ref(storage);

    const storageFileRef = ref(storageRef, file.name);
    // Create a reference to the file with its original name
    const uploadTask = uploadBytesResumable(storageFileRef, file);

    // Track the upload progress
    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% complete`);
    });

    // Wait for the upload to complete
    const uploadStatus = await uploadTask;

    // Get the download URL
    const downloadURL = await getDownloadURL(storageFileRef);

    return { downloadURL, uploadStatus };
  } catch (error) {
    console.error("Something went wrong while uploading:", error);
  }
};
