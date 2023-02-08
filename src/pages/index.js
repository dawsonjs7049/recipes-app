import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from 'utils/firebase'

export default function Home() {

  const [user, loading] = useAuthState(auth);
  const route = useRouter();

  useEffect(() => {
      if(loading) { return; }

      if(!user)
      {
          route.push('auth/login')
      }
      else
      {
          route.push('dashboard');
      }

  }, [user, loading])

  return (
    <>
      <Head>
        <title>Recipes</title>
        <meta name="description" content="Track Your Recipes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    </>
  )
}
