import React, { useEffect, useState, useContext } from 'react'
import { MdFavorite } from 'react-icons/md';
import { auth, db } from 'utils/firebase';
import { BsTrash2Fill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import Link from 'next/link';
import toastMessage from 'utils/util_functions';
import { RecipeContext } from '@/pages/_app';

export default function RecipeCard({ recipe }) {

    const [isFavorited, setIsFavorited] = useState((recipe.isFavorited ? recipe.isFavorited : false));
    const { currentRecipe, setCurrentRecipe } = useContext(RecipeContext);

    async function handleSetFavorited(recipe)
    {
        const docRef = doc(db, 'recipes', recipe.id);
        await updateDoc(docRef, {
            isFavorited: !isFavorited
        });

        setIsFavorited(!isFavorited);
    }

    async function handleDelete(recipe)
    {
        const docRef = doc(db, 'recipes', recipe.id);
        await deleteDoc(docRef);

        toastMessage("Successfully Deleted Recipe", "success");
    }

    return (
        <div className="dark:bg-slate-200 rounded-md shadow-md w-96 relative hover:shadow-2xl transition-all flex flex-col justify-between">
            <div className="w-full p-5">
                <h1 className="text-3xl font-bold">{ recipe.name }</h1>
                <button onClick={() => handleSetFavorited(recipe)} style={{position: 'absolute', top: '1.25rem', right: '1.25rem'}}><MdFavorite className={`text-4xl ${isFavorited ? "text-pink-500" : "text-slate-200"}`}/></button>
                <p className="mt-2"> {recipe.description }</p>
                <p className="font-bold text-center mt-6"> Prep Time: { recipe.prepTime }</p>
                <div className="flex flex-row justify-evenly items-center p-2 gap-2">
                    <div className="shadow-md rounded-md w-1/2 text-center p-2">
                        <div>Ingredients</div>
                        <div>{ recipe.ingredients.length }</div>
                    </div>
                    <div className="shadow-md rounded-md w-1/2 text-center p-2">
                        <div>Steps</div>
                        <div>{ recipe.steps.length }</div>
                    </div>
                </div>
                <div className="flex flex-row justify-evenly items-center my-6">
                    {
                        recipe.tags != undefined &&
                            recipe.tags.map((item, index) => {
                                return (
                                    <span className="tag-btn rounded-md shadow-md bg-cyan-500 text-white p-2" key={index}>{ item }</span>
                                )
                            })
                    }
                </div>
            </div>
            <div className="flex flex-row">
                <Link href={{ pathname: "/viewRecipe" }} onClick={() => setCurrentRecipe(recipe)} className="bg-green-500 text-white rounded-m w-2/5 rounded-bl-md p-2 hover:bg-green-600 text-center">
                    <button className="text-white">View</button>
                </Link>
                <Link href={{ pathname: "/recipe" }} onClick={() => setCurrentRecipe(recipe)} className="w-2/5 p-2 bg-cyan-500 text-center hover:bg-cyan-600"> 
                    <button className=" text-white">Edit</button> 
                </Link>
                <button onClick={() => handleDelete(recipe)} className="bg-red-500 hover:bg-red-600 text-white rounded-m w-1/5 rounded-br-md p-2 flex flex-row justify-center"><BsTrash2Fill className="text-2xl"/></button>
            </div>
        </div>
    )
}
