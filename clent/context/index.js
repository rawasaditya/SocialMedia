import { useState, createContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import API from '../api';
const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [context, setContext] = useState({
        user: {},
        loading: false
    })


    return <AppContext.Provider value={[context, setContext]}>{children}</AppContext.Provider>
}

export { AppContext, AppProvider };