import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [redirect, setRedirect] = useState(false);

    const { dispatch,url } = useAuthContext();

    const login = async (username, password) => {
        setIsLoading(true); 
        setError(null); 

        const response = await fetch(`${url}/api/user/login`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
            credentials:"include",
        });

        const json = await response.json(); 
        console.log(json);
       
        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        } else {
            localStorage.setItem('user', JSON.stringify(json));

            dispatch({ type: 'LOGIN', payload: json });
            setIsLoading(false); 
            setRedirect(true);
        }
    };

    return { login, isLoading, error, redirect };
};
