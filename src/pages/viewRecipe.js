import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from 'utils/firebase';
import Link from 'next/link';
import { RecipeContext } from './_app';

export default function viewRecipe() {

    const [user, loading] = useAuthState(auth);
    const { currentRecipe, setCurrentRecipe } = useContext(RecipeContext);

    const [recipe, setRecipe] = useState([]);
    const [tags, setTags] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);

    const route = useRouter();

    useEffect(() => {
        if(loading) { return; }

        if(!user)
        {
            route.push('auth/login')
        }

    }, [user, loading])

    return (
        <div className="my-20 p-12 shadow-lg rounded-lg max-w-xl mx-auto">
            <h1 className="font-bold text-2xl">{ currentRecipe.name }</h1>
            <div className="py-2">
                <h3 className="text-lg font-medium py-2 mt-4">Description</h3>
                <p className="bg-slate-100 h-36 w-full text-black rounded-lg p-2 text-small">
                    { currentRecipe.description }
                </p>

                <div>
                    {/* should have a way to determine the number of servings here */}
                    <h3 className="text-lg font-medium py-2 mt-4">Ingredients</h3>     
                    <div>
                        {
                            currentRecipe.ingredients.length != 0 && 
                                <div className="flex flex-row w-full mt-2">   
                                    <div className="w-2/3 font-bold">
                                        Name
                                    </div>
                                    <div className="w-1/3 font-bold">
                                        Amount 
                                    </div> 
                                </div>
                        }
                        {
                            currentRecipe.ingredients.length != 0 &&
                                currentRecipe.ingredients.map((item, index) => {
                                    return (
                                        <div className={`flex flex-row w-full mt-2 rounded-md p-1 ${index % 2 == 0 ? 'bg-slate-100' : ''}`} key={index}>   
                                            <div className="w-2/3">
                                                { item.name }
                                            </div>
                                            <div className="w-1/3">
                                                { item.amount } { item.measurement }
                                            </div> 
                                        </div>
                                    )
                                })
                        }
                        
                    </div>
                </div>

                <h3 className="text-lg font-medium py-2 mt-4">Steps</h3>
                <div>
                    {
                        currentRecipe.steps.length != 0 &&
                            currentRecipe.steps.map((item, index) => {
                                return (
                                    <div className={`w-full rounded-md p-1 mt-2 ${index % 2 == 0 ? 'bg-slate-100' : ''}`} key={index} >
                                        { index + 1 }: { item }
                                    </div>
                                )
                            })
                    }
                </div>

                <h3 className="text-lg font-medium pt-2 pb-3 mt-4">Tags</h3>
                <div className="flex flex-row justify-evenly">
                    <button className={`tag-btn rounded-md shadow-md text-white p-2 ${currentRecipe.tags.includes("Breakfast") ? "animate-up" : "bg-cyan-500"}`} type="button">Breakfast</button>
                    <button className={`tag-btn rounded-md shadow-md text-white p-2 ${currentRecipe.tags.includes("Lunch") ? "animate-up" : "bg-cyan-500"}`} type="button">Lunch</button>
                    <button className={`tag-btn rounded-md shadow-md text-white p-2 ${currentRecipe.tags.includes("Dinner") ? "animate-up" : "bg-cyan-500"}`} type="button">Dinner</button>
                    <button className={`tag-btn rounded-md shadow-md text-white p-2 ${currentRecipe.tags.includes("Snack") ? "animate-up" : "bg-cyan-500"}`} type="button">Snack</button>
                    <button className={`tag-btn rounded-md shadow-md text-white p-2 ${currentRecipe.tags.includes("Dessert") ? "animate-up" : "bg-cyan-500"}`} type="button">Dessert</button>

                </div>

                <h3 className="text-lg font-medium pt-2 pb-3 mt-4">Prep Time</h3>
                <div className="flex flex-row justify-evenly gap-4 flex-wrap">
                    <button className={`tag-btn rounded-md shadow-md text-white p-2 ${currentRecipe.prepTime == "5 minutes" ? "animate-up" : "bg-cyan-500"}`} type="button">5 minutes</button>
                    <button className={`tag-btn rounded-md shadow-md text-white p-2 ${currentRecipe.prepTime == "10 minutes" ? "animate-up" : "bg-cyan-500"}`} type="button">10 minutes</button>
                    <button className={`tag-btn rounded-md shadow-md text-white p-2 ${currentRecipe.prepTime == "15 minutes" ? "animate-up" : "bg-cyan-500"}`} type="button">15 minutes</button>
                    <button className={`tag-btn rounded-md shadow-md text-white p-2 ${currentRecipe.prepTime == "30 minutes" ? "animate-up" : "bg-cyan-500"}`} type="button">30 minutes</button>
                    <button className={`tag-btn rounded-md shadow-md text-white p-2 ${currentRecipe.prepTime == "45 minutes" ? "animate-up" : "bg-cyan-500"}`} type="button">45 minutes</button>
                    <button className={`tag-btn rounded-md shadow-md text-white p-2 ${currentRecipe.prepTime == "1 hours" ? "animate-up" : "bg-cyan-500"}`} type="button">1 hours</button>
                    <button className={`tag-btn rounded-md shadow-md text-white p-2 ${currentRecipe.prepTime == "2 hours" ? "animate-up" : "bg-cyan-500"}`} type="button">2 hours</button>
                </div>
            </div>
            <hr className="my-10"></hr>
            <Link href={{ pathname:"/recipe" }} className="p-2 mt-2 w-full rounded-md shadow-lg bg-green-500 text-center text-white hover:bg-green-600 flex flex-row justify-center">
                <button type="button" className="text-white">Edit</button>
            </Link>
        </div>
    )
}
