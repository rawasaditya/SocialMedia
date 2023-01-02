import React from 'react'
import Layout from '../Components/Layout/Layout'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/globals.css"
import { AppProvider } from '../context';
const MyApp = ({ Component, pageProps }) => {
    return (<AppProvider>
        <Layout>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Component {...pageProps} /></Layout>
    </AppProvider>)
}

export default MyApp