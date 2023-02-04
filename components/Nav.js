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
        <nav className="flex justify-between items-center py-10">
            <Link href={"/dashboard"}>
                <button className="text-2xl font-bold text-slate-500">Cookbook</button>
            </Link> 

            {
                user ? 
                (
                    <div className="flex items-center gap-5">
                        <ul className="">
                            <Link href={"/recipe"} onClick={() => setCurrentRecipe(new Recipe(null))}><span className="p-2 text-sm bg-cyan-500 text-white rounded-lg font-medium shadow-lg hover:bg-cyan-600">Add Recipe</span></Link>
                        </ul>

                        <ul className="">
                            <Link href={"/recipeSearch"}><span className="p-2 text-sm bg-cyan-500 text-white rounded-lg font-medium shadow-lg hover:bg-cyan-600">Search Recipes</span></Link>
                        </ul>
                        
                        <ul className="">
                            <button className="p-2 text-sm bg-cyan-500 text-white rounded-lg font-medium shadow-lg hover:bg-cyan-600" onClick={() => logout() }>Logout</button>
                        </ul>
                    </div>
                ) 
                :
                (
                    <ul className="flex items-center gap-10">
                        <Link href={"/auth/login"}><span className="py-2 px-4 text-sm bg-cyan-500 text-white rounded-lg font-medium ml-8 shadow-lg hover:bg-cyan-600">Sign Up</span></Link>
                    </ul>
                )
            }
         
        </nav>
    )
}