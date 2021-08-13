/* eslint-disable @next/next/no-sync-scripts */
import Head from "next/head";
import React from "react";
import Footer from "./footer";
import Header from "./header";
import PageTitle from "./title";

const Layout: React.FC = ({ children }) => {
    return (
        <>
            <Head>
                <PageTitle />
            </Head>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
};

export default Layout;
