import React, { useEffect, useContext } from 'react'
import API from '../../api'
import { AppContext } from '../../context';
import { toast } from 'react-toastify';
const UserRoutes = ({ children }) => {
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

                toast.error(err?.response?.data?.message || err.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
                window.localStorage.removeItem("user")
                setContext(prev => ({ ...prev, user: null, loading: false }));
            })
    }
    return children
}

export default UserRoutes