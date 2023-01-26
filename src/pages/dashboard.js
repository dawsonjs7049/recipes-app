import React, { useEffect } from 'react'
import { auth } from 'utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';

export default function Dashboard() {

    const [user, loading] = useAuthState(auth);
    const route = useRouter();

    useEffect(() => {
        if(!user)
        {
            route.push('auth/login')
        }
    }, []);

    return (
        <div>
            Dashboard
        </div>
    )
}
