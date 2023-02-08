import React, { useEffect } from 'react'

import {FcGoogle} from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from 'utils/firebase';
import { Router, useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Login() {

  const route = useRouter();
  const [user, loading] = useAuthState(auth);

  // Sign in with google
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    if(user)
    {
      route.push('/dashboard');
    }
  }, [user])

  async function googleLogin()
  {
    try 
    {
      const result = await signInWithPopup(auth, googleProvider);
      route.push('/dashboard')
    }
    catch(error)
    {
      console.log("ERROR: " + error);
    }
  }

  return (
    <div className="flex flex-row justify-center items-center px-2">
      <div className="shadow-xl max-w-lg mt-32 p-10 text-gray-700 rounded-lg bg-slate-100">
        <h2 className="text-2xl font-medium">Join Today</h2>
        <div className="py-4">
          <h3 className="py-4">Sign in with one of the providers</h3>
          <button className="text-white bg-gray-700 w-full font-medium rounded-lg flex align-middle p-4 gap-2" onClick={() => googleLogin() }>
            <FcGoogle className="text-2xl" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
