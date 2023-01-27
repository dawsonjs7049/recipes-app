import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from 'utils/firebase';
import { useRouter } from 'next/router';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { AiFillPlusSquare, AiOutlinePlus} from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';

export default function recipe() {

    const [user, loading] = useAuthState(auth);
    const route = useRouter();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [ingredient, setIngredient] = useState("");
    const [steps, setSteps] = useState([]);
    const [measurement, setMeasurement] = useState('tsp');
    const [step, setStep] = useState("");
    const [amount, setAmount] = useState(0);
    const [tags, setTags] = useState([])

    const options = [
        'tsp ',
        'Tbs ',
        'c',
        'oz',
        'fl oz',
        'pt',
        'qt',
        'gal'
    ]

    async function submitRecipe(event)
    {
        event.preventDefault();

        const collectionRef = collection(db, 'recipes');

        await addDoc(collectionRef, {
            name: name,
            description: description,
            ingredients: ingredients,
            steps: steps,
            userId: user.uid,
            timestamp: serverTimestamp()
        })

        // route.push('/dashboard');
    }

    function addIngredient()
    {
        setIngredients([ ...ingredients, { name : ingredient, amount: amount, measurement: measurement } ]);

        setIngredient("");
        setAmount("")
        setMeasurement("tsp");
    }

    function handleAddStep()
    {
        setSteps([...steps, step])

        setStep("")
    }

    function handleRemoveIngredient(removeItem)
    {
        setIngredients(ingredients.filter((item) => item.name != removeItem.name))
    }

    function handleRemoveStep(removeStep)
    {
        setSteps(steps.filter((item) => item != removeStep));
    }

    function updateTags(inputTag)
    {
        if(tags.includes(inputTag))
        {
            setTags(tags.filter((tag) => tag != inputTag));
        }
        else 
        {
            setTags([...tags, inputTag])
        }
    }

    return (
        <div className="my-20 p-12 shadow-lg rounded-lg max-w-xl mx-auto">
            <form onSubmit={submitRecipe}>
                <h1 className="font-bold text-2xl">Add a Recipe</h1>
                <div className="py-2">
                    <h3 className="text-lg font-medium py-2">Name</h3>
                    <input value={name} onChange={(e) => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Name" />

                    <h3 className="text-lg font-medium py-2 mt-4">Description</h3>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="bg-gray-800 h-36 w-full text-white rounded-lg p-2 text-small"></textarea>

                    <div>
                        <h3 className="text-lg font-medium py-2 mt-4">Ingredients</h3>
                        <div className="flex flex-row justify-between items-center">
                            <input value={ingredient} onChange={(e) => setIngredient(e.target.value)} className="w-3/5 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Ingredient" />
                            <div className="w-1/3 flex flex-row">
                                <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" className="w-1/2 rounded-r-0 border-r-0 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                <Dropdown options={options} onChange={(e) => setMeasurement(e.value)} value={measurement} placeholder="Select an Option" className="shadow rounded w-1/2"/>
                            </div>
                        </div>
                        <button type="button" onClick={() => addIngredient()} className="mt-2 w-full rounded-md shadow-lg bg-cyan-500 text-center hover:bg-cyan-600 flex flex-row justify-center"><AiOutlinePlus className="text-3xl text-white" /></button>
                        <div>
                            {
                                ingredients.length != 0 &&
                                    <div className="flex flex-row w-full mt-2">   
                                        <div className="w-1/2 font-bold">
                                            Name
                                        </div>
                                        <div className="w-1/4 font-bold">
                                            Amount 
                                        </div> 
                                    </div>
                            }
                            {
                                ingredients.length != 0 &&
                                    ingredients.map((item) => {
                                        return (
                                            <div className="flex flex-row w-full mt-2" key={item.name}>   
                                                <div className="w-1/2">
                                                    { item.name }
                                                </div>
                                                <div className="w-1/4">
                                                    { item.amount } { item.measurement }
                                                </div> 
                                                <div className="w-1/4 flex flex-row justify-end items-center">
                                                    <button onClick={() => handleRemoveIngredient(item)} ><RxCross1 className="text-xl text-red-500"/></button>
                                                </div>
                                                
                                            </div>
                                        )
                                    })
                            }
                          
                        </div>
                    </div>

                    <h3 className="text-lg font-medium py-2 mt-4">Steps</h3>
                    <input value={step} onChange={(e) => setStep(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Step" />
                    <button type="button" onClick={() => handleAddStep()} className="mt-2 w-full rounded-md shadow-lg bg-cyan-500 text-center hover:bg-cyan-600 flex flex-row justify-center"><AiOutlinePlus className="text-3xl text-white" /></button>
                    <div>
                        {
                            steps.length != 0 &&
                                steps.map((item, index) => {
                                    return (
                                        <div className="flex flex-row w-full mt-2" key={item}>   
                                            <div className="w-4/5">
                                                { index + 1 }: { item }
                                            </div>
                                            <div className="w-1/5 flex flex-row justify-end items-center">
                                                <button onClick={() => handleRemoveStep(item)} ><RxCross1 className="text-xl text-red-500" /></button>
                                            </div>
                                        </div>
                                    )
                                })
                        }
                    </div>

                    <h3 className="text-lg font-medium pt-2 pb-3 mt-4">Tags</h3>
                    <div className="flex flex-row justify-evenly">
                        <button onClick={() => updateTags("Breakfast")} className={`tag-btn rounded-md shadow-md text-white p-2 ${tags.includes("Breakfast") ? "animate-up" : "bg-cyan-500"}`} type="button">Breakfast</button>
                        <button onClick={() => updateTags("Lunch")} className={`tag-btn rounded-md shadow-md text-white p-2 ${tags.includes("Lunch") ? "animate-up" : "bg-cyan-500"}`} type="button">Lunch</button>
                        <button onClick={() => updateTags("Dinner")} className={`tag-btn rounded-md shadow-md text-white p-2 ${tags.includes("Dinner") ? "animate-up" : "bg-cyan-500"}`} type="button">Dinner</button>
                        <button onClick={() => updateTags("Snack")} className={`tag-btn rounded-md shadow-md text-white p-2 ${tags.includes("Snack") ? "animate-up" : "bg-cyan-500"}`} type="button">Snack</button>
                        <button onClick={() => updateTags("Dessert")} className={`tag-btn rounded-md shadow-md text-white p-2 ${tags.includes("Dessert") ? "animate-up" : "bg-cyan-500"}`} type="button">Dessert</button>

                    </div>
                </div>
                <hr className="my-10"></hr>
                <button type="submit" className="p-2 mt-2 w-full rounded-md shadow-lg bg-cyan-500 text-center text-white hover:bg-cyan-600 flex flex-row justify-center">Save</button>
            </form>
        </div>
    )
}
