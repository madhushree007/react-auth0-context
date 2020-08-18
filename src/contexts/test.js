import createAuth0Client from '@auth0/auth0-spa-js';
useEffect(() => {
    initAuth0();

    async function initAuth0() {
      const auth0 = await createAuth0Client({
        domain: 'dev-madhu.eu.auth0.com',
        client_id: 'mMfP4DK0s4flq4tyGHnmsMJhRGvhh2N1'
      })

      const isAuthenticated = await auth0.isAuthenticated();
      console.log(isAuthenticated);

      const user = await auth0.getUser();
      console.log(user);

    };
  }, []);
