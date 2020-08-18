import React, { createContext, useState, useEffect } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';

export const Auth0Context = createContext();

export function Auth0Provider({ children }) {
    const [auth0Client, setAuth0Client] = useState(null);
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        initAuth0();

        async function initAuth0() {
            const auth0 = await createAuth0Client({
                domain: 'dev-madhu.eu.auth0.com',
                client_id: 'mMfP4DK0s4flq4tyGHnmsMJhRGvhh2N1',
                redirect_uri: window.location.origin
            })

            setAuth0Client(auth0);

            //Handle redirect when user comes back

            if (
                window.location.search.includes('code=') &&
                window.location.search.includes('state=')
            ) {
                try {
                    await auth0.handleRedirectCallback();
                } catch (err) {
                    alert(err);
                }

                window.location.replace(window.location.pathname);
            }

            const isAuthenticated = await auth0.isAuthenticated();
            setIsAuthenticated(isAuthenticated);
            //console.log(isAuthenticated);

            if (isAuthenticated) {
                const user = await auth0.getUser();
                setUser(user);
                //console.log(user);
            }

            setIsLoading(false);

        };
    }, []);

    return (
        <Auth0Context.Provider value={{
            isAuthenticated,
            user,
            isLoading,
            login: (...p) => auth0Client.loginWithRedirect(...p),
            logout: (...p) => auth0Client.logout(...p)
        }}>
            {children}
        </Auth0Context.Provider>
    )
}
