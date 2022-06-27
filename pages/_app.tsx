import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Layout from "../components/layout/Layout";
import {Provider} from 'next-auth/client';
import {JournalContextProvider} from "../store/JournalContext";

function MyApp({Component, pageProps}: AppProps) {
    return <>
        <Provider session={pageProps.session}>
            <JournalContextProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </JournalContextProvider>
        </Provider>
    </>
}

export default MyApp
