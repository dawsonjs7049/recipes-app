import React, { useEffect } from 'react'
import { auth } from 'utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';

export default function Dashboard() {

    const [user, loading] = useAuthState(auth);
    const route = useRouter();

    let hours = new Date().getHours();
    let greeting = "Good Evening " + user.displayName;
    if(hours < 12)
    {
        greeting = "Good Morning " + user.displayName;
    }
    else if( (hours > 12) && (hours < 17) )
    {
        greeting = "Good Afternoon " + user.displayName;
    }

    useEffect(() => {
        if(!user)
        {
            route.push('auth/login')
        }
    }, []);

    return (
        <div className="w-full max-w-96 mx-auto h-screen">
            <h1 className='text-2xl font-bold mt-10'>{ greeting }</h1>
        </div>
    )
}
