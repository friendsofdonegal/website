/* eslint-disable @next/next/no-sync-scripts */
import Head from "next/head";
import React from "react";
import Footer from "./footer";
import Header from "./header";
import PageTitle from "./title";

interface LayoutProps {
    bgStyle?: "light" | "dark";
}

const Layout: React.FC<LayoutProps> = ({ bgStyle, children }) => {
    return (
        <>
            <Head>
                <PageTitle />
            </Head>
            <Header bgStyle={bgStyle} />
            <main className="pt-24">{children}</main>
            <Footer />
        </>
    );
};

Layout.displayName = "Layout";

export default Layout;
