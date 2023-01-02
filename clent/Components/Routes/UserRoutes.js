import React, { useEffect, useContext } from 'react'
import API from '../../api'
import { useRouter } from 'next/router'
import { AppContext } from '../../context';
import { toast } from 'react-toastify';
const UserRoutes = ({ children }) => {
    const router = useRouter();
    const [context, setContext] = useContext(AppContext);
    useEffect(() => {
        getCurrentUser();
    }, [])
    const getCurrentUser = async () => {
        API.get('/protected')
            .then(res => {
                if (res.status === 200) {
                    setContext(prev => ({ ...prev, user: res.data.response, loading: false }));
                }
            }).
            catch(err => {
                setContext(prev => ({ ...prev, user: null, loading: false }));
            })
    }
    return children
}

export default UserRoutes