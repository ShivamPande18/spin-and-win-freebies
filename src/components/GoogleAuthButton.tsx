// src/components/GoogleAuthButton.tsx
import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

interface GoogleAuthButtonProps {
  onDone: () => void;
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ onDone }) => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        const name = user.displayName;
        const email = user.email;

        if (name && email) {
          // Save to Firestore (document id = email)
          await setDoc(doc(db, "nsutUsers", email), {
            name,
            email,
            createdAt: new Date(),
          });
          console.log("User saved:", { name, email });
        }
      }
    } catch (error) {
      console.error("Error during Google login:", error);
    } finally {
      onDone();
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 w-full h-14 text-lg font-bold rounded-2xl"
    >
      Sign in with Google
    </button>
  );
};

export default GoogleAuthButton;
