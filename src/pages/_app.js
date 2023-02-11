import '@/styles/globals.css'
import Layout from "/components/layout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useContext, useState } from 'react';
import Recipe from '@/models/Recipe';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

const queryClient = new QueryClient();
export const RecipeContext = createContext(null);

export default function App({ Component, pageProps }) 
{
  const [currentRecipe, setCurrentRecipe] = useState(new Recipe(null));
  const route = useRouter()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RecipeContext.Provider value={{ currentRecipe, setCurrentRecipe }} >
          <Layout>
            <ToastContainer />
            <AnimatePresence mode='wait'>
              <motion.div 
                key={route.route}
                initial="initialState"
                animate="animateState"
                exit="exitState"
                transition={{ duration: 0.6 }}
                variants={{
                  initialState: {
                    opacity: 0,
                    y: '-20px'
                  },
                  animateState: {
                    opacity: 1,
                    y: '0px'
                  },
                  exitState: {
                    opacity: 0, 
                    y: '20px'
                  }
                }}
              >
                <Component {...pageProps} />
              </motion.div>
            </AnimatePresence>
          </Layout>
        </RecipeContext.Provider>
      </QueryClientProvider>
    </>
  );
}
