import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import toastMessage from 'utils/util_functions';

export default function recipeSearch() {
  
    const [searchResults, setSearchResults] = useState([]);

    async function fetchRecipes()
    {
        // set loading symbol ? 
        const recipeQuery = useQuery({
            queryKey: ['recipes'],
            queryFn: () => fetch("http://www.themealdb.com/api/json/v1/1/search.php?s=Pork")
                .then((response) => response.json())
                .then((data) => { 
                    // console.log("DATA: " + JSON.stringify(data)); 
                    data.meals.forEach((meal) => console.log("MEAL: " + JSON.stringify(meal)))
                    setSearchResults(data); 
                    return data; 

                    // if no results, toast message and return empty array

                    // else remove loading symbol, set searchResults


                })
        })
    }

    // fetchRecipes();
    toastMessage("Testing toast", "success");
  
    return (
    <div>
        <h1>Here we do some searchin</h1>
    </div>
  )
}
