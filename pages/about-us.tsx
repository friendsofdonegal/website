/* eslint-disable react/display-name */
import Head from "next/head";
import React from "react";
import Layout from "../components/layout";
import PageTitle from "../components/title";
import {
    attributes,
    react as AboutUsContent,
} from "../content/pages/about-us.md";
import { WithPageLayout } from "../types/with-page-layout";

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

const AboutUs: WithPageLayout = () => {
    const { title } = getAttributes<AboutUsAttributes>(attributes);

    return (
        <>
            <Head>
                <PageTitle title={title} />
            </Head>
            <div className="container px-4 mx-auto">
                <AboutUsContent />
            </div>
        </>
    );
};

AboutUs.getLayout = (page) => <Layout>{page}</Layout>;

export default AboutUs;
