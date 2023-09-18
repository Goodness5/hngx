"use client"
import React from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';

const Navbar = () => {
    const { user, error, isLoading } = useUser();

    return (
        <nav>
            <div className="logo">
                <Link href="/">Your Logo</Link>
            </div>
            <div className="nav-links">
                <Link href="/">Home</Link>
                <Link href="/gallery">Gallery</Link>
            </div>
            <div className="auth-button">
                {isLoading ? (
                    <div>Loading...</div>
                ) : user ? (
                    <a href="/api/auth/signin">Logout</a>
                ) : (
                    <a href="/api/auth/signin">Login</a>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
