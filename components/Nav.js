import Link from 'next/link';
import { auth } from 'utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';

export default function Nav()
{
    const [user, loading] = useAuthState(auth);
    const route = useRouter();

    function logout()
    {
        auth.signOut()

        route.push('/auth/login');
    }

    return (
        <nav className="flex justify-between items-center py-10">
            <Link href={"/"}>
                <button className="text-lg font-medium">Recipes</button>
            </Link> 

            {
                user ? 
                (
                    <div className="flex items-center gap-5">
                        <ul className="">
                            <Link href={"/post"}><span className="p-2 text-sm bg-cyan-500 text-white rounded-lg font-medium shadow-lg">Add Recipe</span></Link>
                        </ul>

                        <ul className="">
                            <Link href={"/dashboard"}><span className="p-2 text-sm bg-cyan-500 text-white rounded-lg font-medium shadow-lg">Dashboard</span></Link>
                        </ul>
                        
                        <ul className="">
                            <button className="p-2 text-sm bg-cyan-500 text-white rounded-lg font-medium shadow-lg" onClick={() => logout() }>Logout</button>
                        </ul>
                    </div>
                ) 
                :
                (
                    <ul className="flex items-center gap-10">
                        <Link href={"/auth/login"}><span className="py-2 px-4 text-sm bg-cyan-500 text-white rounded-lg font-medium ml-8 shadow-lg">Sign Up</span></Link>
                    </ul>
                )
            }
         
        </nav>
    )
}