import React from 'react'
import { MdFavorite } from 'react-icons/md';
import { auth, db } from 'utils/firebase';
import { BsTrash2Fill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import { deleteDoc, doc } from 'firebase/firestore';

export default function Recipe({ recipe }) {

    console.log("RECIPE: " + JSON.stringify(recipe));

    function handleSetFavorited(recipe)
    {

    }

    async function handleDelete(recipe)
    {
        const docRef = doc(db, 'recipes', recipe.id);
        console.log("INSIDE ON DELETE");
        await deleteDoc(docRef);
    }

    return (
        <div className="rounded-md shadow-md w-96 relative hover:shadow-2xl">
            <div className="w-full p-5">
                <h1 className="text-3xl font-bold">{ recipe.name }</h1>
                <button onClick={() => handleSetFavorited(recipe)} style={{position: 'absolute', top: '1.25rem', right: '1.25rem'}}><MdFavorite className={`text-4xl ${recipe.isFavorited ? "text-pink-500" : "text-slate-200"}`}/></button>
                <p className="mt-2"> {recipe.description }</p>
                <p className="font-bold text-center mt-2"> Prep Time: { recipe.prepTime }</p>
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
                <div className="flex flex-row justify-evenly items-center mt-2">
                    {
                        recipe.tags != undefined &&
                            recipe.tags.map((item) => {
                                return (
                                    <span className="tag-btn rounded-md shadow-md bg-cyan-500 text-white p-2">{ item }</span>
                                )
                            })
                    }
                </div>
            </div>
            <div className="flex flex-row">
                <button className="bg-green-500 text-white rounded-m w-2/5 rounded-bl-md p-2">View</button>
                <button className="bg-cyan-500 text-white w-2/5 p-2">Edit</button>
                <button onClick={() => handleDelete(recipe)} className="bg-red-500 text-white rounded-m w-1/5 rounded-br-md p-2 flex flex-row justify-center"><BsTrash2Fill className="text-2xl"/></button>
            </div>
        </div>
    )
}
