import React from 'react';
import Nav from './Nav';

export default function Layout({ children })
{
    return (
        <div className="mx-6 md:max-w-4xl md:mx-auto px-4">
            <Nav />
            <main>
                { children }
            </main>
        </div>
    )
}