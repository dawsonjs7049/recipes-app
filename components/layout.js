import React from 'react';
import Nav from './Nav';

export default function Layout({ children })
{
    return (
        <div className="mx-auto md:max-w-4xl px-2 md:px-4 h-fit">
            <Nav />
            <main>
                { children }
            </main>
        </div>
    )
}