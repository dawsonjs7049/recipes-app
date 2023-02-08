import Link from 'next/link';
import { auth } from 'utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { RecipeContext } from '@/pages/_app';
import Recipe from '@/models/Recipe';

export default function Nav()
{
    const [user, loading] = useAuthState(auth);
    const { currentRecipe, setCurrentRecipe } = useContext(RecipeContext);
    const route = useRouter();

    function logout()
    {
        auth.signOut()

        route.push('/auth/login');
    }

    return (
        <nav className="flex flex-col md:flex-row justify-between items-center py-10">
            <Link href={"/dashboard"}>
                <button className="text-3xl font-bold text-cyan-500">Cookbook</button>
            </Link> 

            {
                user &&
                (
                    <div className="flex items-center gap-5 mt-5 md:mt-0">
                        <ul className="">
                            <Link href={"/recipe"} onClick={() => setCurrentRecipe(new Recipe(null))}><span className="p-2 text-sm bg-cyan-500 text-white rounded-lg font-medium shadow-lg hover:bg-cyan-600 transition-all">Add</span></Link>
                        </ul>

                        <ul className="">
                            <Link href={"/recipeSearch"}><span className="p-2 text-sm bg-cyan-500 text-white rounded-lg font-medium shadow-lg hover:bg-cyan-600">Search</span></Link>
                        </ul>
                        
                        <ul className="">
                            <button className="p-2 text-sm bg-cyan-500 text-white rounded-lg font-medium shadow-lg hover:bg-cyan-600" onClick={() => logout() }>Logout</button>
                        </ul>
                    </div>
                ) 
            }
         
        </nav>
    )
}