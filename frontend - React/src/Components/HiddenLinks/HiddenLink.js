import React from 'react';
import { selectIsLoggedIn } from '../../app/slice/authSlice';
import { useSelector } from 'react-redux';

const ShowOnLogin = ({children}) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    if(isLoggedIn){
        return children
    }else{
        return null
    }
    
}

export const ShowOnLogOut = ({children}) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    if(!isLoggedIn){
        return children
    }else{
        return null
    }
    
}

export default ShowOnLogin;