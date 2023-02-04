import '@/styles/globals.css'
import Layout from "/components/layout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useContext, useState } from 'react';
import Recipe from '@/models/Recipe';

const queryClient = new QueryClient();
export const RecipeContext = createContext(null);

export default function App({ Component, pageProps }) 
{

  const [currentRecipe, setCurrentRecipe] = useState(new Recipe(null));

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RecipeContext.Provider value={{ currentRecipe, setCurrentRecipe }} >
          <Layout>
            <ToastContainer />
            <Component {...pageProps} />
          </Layout>
        </RecipeContext.Provider>
      </QueryClientProvider>
    </>
  );
}
