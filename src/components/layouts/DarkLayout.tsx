import {FC, ReactNode} from "react"
import Head from "next/head"
import {Navbar} from "@/components/ui/Navbar";

interface Props {
    children: ReactNode
    title?: string
}

const origin = typeof window === 'undefined' ? '' : window.location.origin

const DarkLayout: FC<Props> = ({ children, title }) => {

    return (
        <>
            <Head>
                <title>{ title || 'Pokemon App' }</title>
                <meta name="author" content="Juan José Monsalve" />
                <meta name="description" content={`Information about ${ title } pokemon`} />
                <meta name="keywords" content={`${ title }, pokemon, pokedex`} />

                <meta property="og:title" content={`Information about ${ title }`} />
                <meta property="og:description" content={`This the page about ${ title }`} />
                <meta property="og:image" content={`${ origin }/img/banner.png`} />
            </Head>

            <Navbar />

            <main style={{ padding: '0 20px' }}>
                { children }
            </main>
        </>
    )
}

export default DarkLayout