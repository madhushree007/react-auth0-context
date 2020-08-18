import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Auth0Context } from '../contexts/auth0-context';

export default function Header() {
    const { isAuthenticated, login, logout, user } = useContext(Auth0Context);
    return (
        <div>
            <div>
                <Link to="/">Home</Link>
                <Link to="/dashboard">Dashboard</Link>
            </div>
            <div>
                {!isAuthenticated && <button onClick={login}>Login</button>}
                {isAuthenticated && user && (
                    <>
                        <button>{user.name}</button>
                        <button onClick={logout}>Logout</button>
                    </>
                )
                }
            </div>
        </div>
    )
}