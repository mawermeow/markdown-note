import {ParsedUrlQuery} from "querystring";
import {Connect} from "vite";
import IncomingMessage = Connect.IncomingMessage;
import {NextApiRequestCookies} from "next/dist/server/api-utils";
import {ServerResponse} from "http";
import {GetServerSidePropsResult, PreviewData} from "next";

export type CustomGetServerSideProps<
    P extends { [key: string]: any } = { [key: string]: any },
    Q extends ParsedUrlQuery = ParsedUrlQuery
    > = (context: GetServerSidePropsContext<Q>) => Promise<GetServerSidePropsResult<P>>

type GetServerSidePropsContext<Q extends ParsedUrlQuery = ParsedUrlQuery> = {
    req: IncomingMessage & {
        cookies: NextApiRequestCookies
    }
    res: ServerResponse
    params?: Q
    query: ParsedUrlQuery
    preview?: boolean
    previewData?: PreviewData
    resolvedUrl: string
    locales?: string[]
    defaultLocale?: string
}
