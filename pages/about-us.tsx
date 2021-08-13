/* eslint-disable react/display-name */
import Head from "next/head";
import React from "react";
import Layout from "../components/layout";
import PageTitle from "../components/title";
import { attributes, react as AboutUsContent } from "../content/about-us.md";

interface AboutUsAttributes {
    title: string;
}

function getAttributes<TAttributes = unknown>(
    attributes: unknown
): TAttributes {
    return {
        ...(attributes as TAttributes),
    };
}

export type WithPageLayout<TUnknown = unknown> = TUnknown & {
    getLayout?: (page: React.ReactNode) => React.ReactNode;
};

const AboutUs: WithPageLayout<React.FC> = () => {
    const { title } = getAttributes<AboutUsAttributes>(attributes);

    return (
        <>
            <Head>
                <PageTitle title={title} />
            </Head>
            <AboutUsContent />
        </>
    );
};

AboutUs.getLayout = (page) => <Layout>{page}</Layout>;

export default AboutUs;
