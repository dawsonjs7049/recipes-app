import Image from 'next/image'
import React from 'react'

export default function ApiRecipeCard({ data }) {

    return (
        <div className="rounded-md shadow-md w-96 hover:shadow-xl">
            <img src={data.strMealThumb} className="w-full h-auto rounded-tl-md rounded-tr-md" />
            <div className="p-5">
                <h1 className="text-center font-bold text-2xl">{ data.strMeal }</h1>
                <h1 className="font-bold mt-4 mb-1">Instructions</h1>
                <p className="h-96 overflow-auto">
                    { unescape(data.strInstructions) }
                </p>
            </div>
        </div>
    )
}
