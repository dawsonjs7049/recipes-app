import { useQuery } from '@tanstack/react-query'
import Animation from 'components/Animation';
import ApiRecipeCard from 'components/ApiRecipeCard';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs';
import toastMessage from 'utils/util_functions';

export default function recipeSearch() {
  
    const [searchResults, setSearchResults] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [searchInput, setSearchInput] = useState("");

    const route = useRouter();

    const { isLoading, isError, isSuccess, data } = useQuery(
        ["recipes", searchValue],
        () => fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
            .then(response => response.json())
            .then(data => {
                if(data.meals)
                {
                    setSearchResults(data.meals);
                }
                else
                {
                    setSearchResults([]);

                    toastMessage("No Matches Found", "error");
                }
 
                return data;
            }),
            { enabled: searchValue.trim().length > 0 }
    )

    function handleSearch()
    {
        let search = searchInput.trim();

        if(search.length > 0)
        {
            setSearchValue(search);
        }
        else
        {
            // clear the results
            setSearchResults([])
        }
    }

    return (
        <Animation path={route.pathname}>
            <div className="w-full">
                <h1 className="dark:text-white text-center font-bold text-2xl mt-10">Search for a Recipe</h1>
                <div className="w-full text-center mt-10 mb-5 flex flex-row justify-center items-center gap-2">
                    <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className="w-3/4 md:w-96 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Search By Name" />
                    <button onClick={() => handleSearch()} className="rounded-md shadow-md ml-2 p-2 text-white bg-cyan-500 hover:bg-cyan-600"><BsSearch className="text-2xl"/></button>
                </div>
                <div className="flex flex-row justify-evenly items-start flex-wrap gap-5">            
                {
                    searchResults.length > 0 &&
                        searchResults.map((meal, index) => {
                            return <ApiRecipeCard data={meal} key={index} />
                        })
                }
                </div>
            </div>
        </Animation>
    )
}
