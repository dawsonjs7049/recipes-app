import '@/styles/globals.css'
import Layout from "/components/layout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) 
{
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <ToastContainer />
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </>
  );
}
