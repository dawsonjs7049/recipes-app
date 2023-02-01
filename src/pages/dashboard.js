import React, { useEffect, useState } from 'react'
import { auth, db } from 'utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import RecipeComp from 'components/recipe';
import RecipeLibrary from 'components/RecipeLibrary.js';
import { collection, doc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import Recipe from '../models/Recipe.js';

export default function Dashboard() {

    const [allRecipes, setAllRecipes] = useState([])
    const [greeting, setGreeting] = useState("");

    const [user, loading] = useAuthState(auth);
    const route = useRouter();

    useEffect(() => {
        if(loading)
        {
            // don't run while loading
            return;
        }

        if(!user)
        {
            route.push('auth/login')
        }
        else
        {
            getRecipes();
            getGreeting();
        }
    }, [user, loading]);

    async function getRecipes()
    {
        console.log("CALLING GET RECIPES");
        const collectionRef = collection(db, 'recipes');

        // this would require compound index in firebase...
        // const q = query(collectionRef, where('userId', '==', user.uid), orderBy('timestamp', 'desc'));

        const q = query(collectionRef, where('userId', '==', user.uid));
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setAllRecipes(snapshot.docs.map((doc) => {
                let data = { ...doc.data(), id: doc.id }
                return new Recipe(data);
            }));
        });

        return unsubscribe;

    }

    function getGreeting()
    {
        let hours = new Date().getHours();
        if(hours < 12)
        {
            setGreeting("Good Morning " + user.displayName)
        }
        else if( (hours > 12) && (hours < 17) )
        {
            setGreeting("Good Afternoon " + user.displayName)
        }
        else 
        {
            setGreeting("Good Evening " + user.displayName)
        }
    }

    return (
        
        <div className="w-full max-w-6xl mx-auto h-screen">
            <h1 className='text-2xl font-bold mt-10'>{ greeting }</h1>
            <h2 className="text-lg mt-10">Recipes</h2>
            {/* <div className="w-full flex flex-row justify-evenly gap-4 flex-wrap"> */}
            <div>
            {
                // allRecipes.length > 0 &&
                //     allRecipes.map((recipe) => {
                //         return <RecipeComp recipe={recipe} key={recipe.id} />
                //     }) 
            }
            <RecipeLibrary recipes={allRecipes} />

            </div>
        </div>
    )
}
