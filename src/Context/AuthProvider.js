import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';

import { auth } from '../firebase/config';

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [isloading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            console.log(user);
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                setUser({ displayName, email, uid, photoURL });
                setIsLoading(false);
                navigate('/');
                return;
            } else {
                setIsLoading(false);
                // navigate('/login');
            }
        });

        //clean function
        return () => {
            unsubscribe();
        };
    }, [navigate]);

    return <AuthContext.Provider value={{ user }}>{isloading ? <Spin /> : children}</AuthContext.Provider>;
}

export default AuthProvider;
