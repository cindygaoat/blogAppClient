import { useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../hooks/UserContext';

export default function Logout() {

    const { setUser, unsetUser } = useContext(UserContext);

    unsetUser();

    useEffect(() => {
        setUser({
            id: null,
            username: null,
            isAdmin: null
        })
    })
    return (
        <Navigate to='/' />
    )
}