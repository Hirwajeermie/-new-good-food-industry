import React, { useState, useEffect, useRef } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { f, gS } from '../../public/functions';

const PrivateRouteChl = ({ element }) => {
    const { token } = useParams();
    const [isAuth, setIsAuth] = useState(null),
    hasFetched = useRef(false)

    useEffect(() => {
        const checkAuthentication = async () => {
            
                const scheme = gS;
                if (!token) {
                    setIsAuth(false);
                    return;
                }
    
                try {
                    let res = await f(`checkLink/${token}`, scheme);
                    if (res.success) {
                        setIsAuth(true);
                    } else {
                        alert(res.message);
                        setIsAuth(false);
                    }
                    hasFetched.current = true
                } catch (error) {
                    console.error('Error during authentication check:', error);
                    setIsAuth(false);
                }   
        };
        if (!hasFetched.current) {
            checkAuthentication();
        }
    }, [token]);

    if (isAuth === null) {
        return <div>Loading...</div>;
    }

    return isAuth ? element : <Navigate to="/" />;
};

export default PrivateRouteChl;
