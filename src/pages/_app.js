import '@/styles/globals.css'
import Layout from "/components/layout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useContext, useState } from 'react';
import Recipe from '@/models/Recipe';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

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
            {/* <AnimatePresence key={"SDKLFJ"} mode={"wait"}> */}
              <Component {...pageProps} />
            {/* </AnimatePresence> */}
          </Layout>
        </RecipeContext.Provider>
      </QueryClientProvider>
    </>
  );
}
