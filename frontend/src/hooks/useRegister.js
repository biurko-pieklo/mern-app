import { useContext, useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useRegister = () => {
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const register = async (username, password) => {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password}),
        });

        const json = await response.json();

        if (!response.ok) {
            setLoading(false);
            setError(json.error);
        } else {
            localStorage.setItem('user', JSON.stringify(json));

            dispatch({
                type: 'LOGIN',
                payload: json,
            });

            setLoading(false);
        }
    }

    return { register, isLoading, error };
}
