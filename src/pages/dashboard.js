import React, { useEffect, useState } from 'react'
import { auth, db } from 'utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import RecipeComp from 'components/RecipeCard';
import RecipeLibrary from 'components/RecipeLibrary.js';
import { collection, doc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import Recipe from '../models/Recipe.js';

export default function Dashboard() {

    const [allRecipes, setAllRecipes] = useState([])
    const [greeting, setGreeting] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [searchableRecipes, setSearchableRecipes] = useState([])

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

            let recipes = snapshot.docs.map((doc) => {
                return new Recipe({ ...doc.data(), id: doc.id });
            })

            // sort by favorited first
            recipes.sort((a, b) => b.isFavorited - a.isFavorited);

            setAllRecipes(recipes);
            setSearchableRecipes(recipes);
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

    function handleSearch(input)
    {
        setSearchValue(input);

        if(input == "")
        {
            // reset
            setSearchableRecipes([...allRecipes]);
        }
        else
        {
            let results = allRecipes.filter((recipe) => {
                return ( (recipe.name.toLowerCase().includes(input.toLowerCase())) || (recipe.tags.includes(input)) )
            })

            setSearchableRecipes(results);
        }
    }

    return (
        
        <div className="w-full max-w-6xl mx-auto h-screen">
            <div className="bg-cyan-500 py-10 w-full text-white rounded-md shadow-md px-5 mb-10">
                <h1 className='text-2xl font-bold'>{ greeting }</h1>
                <h2 className="text-lg mt-3">What's Cooking?</h2>
            </div>
            <div className="w-full text-center mt-10 mb-5">
                <input value={searchValue} onChange={(e) => handleSearch(e.target.value)} className="w-96 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Search By Name or Tag" />
            </div>
            <RecipeLibrary recipes={searchableRecipes} />

        </div>
    )
}
