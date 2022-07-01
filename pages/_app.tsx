import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Layout from "../components/layout/Layout";
import {Provider} from 'next-auth/client';
import {JournalContextProvider} from "../store/JournalContext";
import Head from "next/head";

function MyApp({Component, pageProps}: AppProps) {
    return <>
        <Provider session={pageProps.session}>
            <JournalContextProvider>
                <Layout>
                    <Head>
                        <meta name="viewport" content='width=device-width, initial-scale=1'/>
                        <link rel="shortcut icon" href="/Mawer.svg"/>
                    </Head>
                    <Component {...pageProps} />
                </Layout>
            </JournalContextProvider>
        </Provider>
    </>
}

export default MyApp
