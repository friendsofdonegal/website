/* eslint-disable react/display-name */
import Head from "next/head";
import React from "react";
import Layout from "../components/layout";
import PageTitle from "../components/title";
import { attributes, react as HomeContent } from "../content/pages/home.md";
import Link from "next/link";
import { promises as fs } from "fs";
import path from "path";
import { WithPageLayout } from "../types/with-page-layout";
import yaml from "js-yaml";
import marked from "marked";
import matter from "gray-matter";

interface HomeAttributes {
    title: string;
    description: string;
    pageTitle: string;
    subPageTitle: string;
}

function getAttributes<TAttributes = unknown>(
    attributes: unknown
): TAttributes {
    return {
        ...(attributes as TAttributes),
    };
}

interface HomeProps {
    resources: {
        type: string;
        description: string;
    }[];
    resourceTypes: Record<string, string>;
}

const { title, description, pageTitle, subPageTitle } =
    getAttributes<HomeAttributes>(attributes);

const Home: WithPageLayout<HomeProps> = ({ resources, resourceTypes }) => {
    return (
        <>
            <Head>
                <PageTitle title={title} />
                <meta name="description" content={description} />
            </Head>

            <div className="relative bg-green-600">
                <div className="relative w-full h-0 mb-24 -mt-24">
                    <div className="bg-green-600"></div>
                </div>
                <div className="container relative flex flex-col flex-wrap items-center px-3 mx-auto text-white">
                    <div className="flex flex-col items-start justify-center w-full text-center">
                        <h1 className="max-w-3xl mx-auto my-4 text-4xl font-bold leading-tight">
                            {pageTitle}
                        </h1>
                        <p className="max-w-3xl mx-auto mb-16 text-2xl leading-normal">
                            {subPageTitle}
                        </p>
                    </div>
                </div>
            </div>
            <section className="p-8 bg-white border-b">
                <div className="container max-w-5xl m-8 mx-auto">
                    <HomeContent />
                </div>
            </section>
            <section className="py-8 bg-white border-b">
                <div className="container flex flex-wrap pt-4 pb-12 mx-auto">
                    <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
                        Resources
                    </h1>
                    <div className="w-full mb-4">
                        <div className="w-64 h-1 py-0 mx-auto my-0 rounded-t opacity-25 gradient"></div>
                    </div>
                    {resources.map(({ type, description }) => {
                        return (
                            <div
                                key={type}
                                className="flex flex-col flex-grow flex-shrink w-full p-6 md:w-1/3"
                            >
                                <div className="flex-1 overflow-hidden bg-white rounded-t rounded-b-none shadow">
                                    <Link href={`/resource-list#${type}`}>
                                        <a className="flex flex-wrap no-underline hover:no-underline">
                                            <div className="w-full px-6 pt-6 text-xl font-bold text-gray-800">
                                                {resourceTypes[type]}
                                            </div>
                                            <div
                                                className="px-6 mb-5 text-base text-gray-800"
                                                dangerouslySetInnerHTML={{
                                                    __html: description,
                                                }}
                                            />
                                        </a>
                                    </Link>
                                </div>
                                <div className="flex-none p-6 mt-auto overflow-hidden bg-white rounded-t-none rounded-b shadow">
                                    <div className="flex items-center justify-start">
                                        <Link href={`/resource-list#${type}`}>
                                            <a className="px-8 py-4 mx-auto my-6 font-bold text-white transition duration-300 ease-in-out transform rounded-full shadow-lg lg:mx-0 hover:underline gradient focus:outline-none focus:shadow-outline hover:scale-105">
                                                Explore
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* <!-- Change the colour #f8fafc to match the previous section colour --> */}
            <svg
                className="wave-top"
                viewBox="0 0 1439 147"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
            >
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g
                        transform="translate(-1.000000, -14.000000)"
                        fillRule="nonzero"
                    >
                        <g className="wave" fill="#f8fafc">
                            <path d="M1440,84 C1383.555,64.3 1342.555,51.3 1317,45 C1259.5,30.824 1206.707,25.526 1169,22 C1129.711,18.326 1044.426,18.475 980,22 C954.25,23.409 922.25,26.742 884,32 C845.122,37.787 818.455,42.121 804,45 C776.833,50.41 728.136,61.77 713,65 C660.023,76.309 621.544,87.729 584,94 C517.525,105.104 484.525,106.438 429,108 C379.49,106.484 342.823,104.484 319,102 C278.571,97.783 231.737,88.736 205,84 C154.629,75.076 86.296,57.743 0,32 L0,0 L1440,0 L1440,84 Z"></path>
                        </g>
                        <g
                            transform="translate(1.000000, 15.000000)"
                            fill="#FFFFFF"
                        >
                            <g transform="translate(719.500000, 68.500000) rotate(-180.000000) translate(-719.500000, -68.500000) ">
                                <path
                                    d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                                    opacity="0.100000001"
                                ></path>
                                <path
                                    d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                                    opacity="0.100000001"
                                ></path>
                                <path
                                    d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                                    opacity="0.200000003"
                                ></path>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        </>
    );
};

export async function getStaticProps() {
    const [resources, resourceTypes] = await Promise.all([
        getResources(),
        getResourceTypes(),
    ]);

    return {
        props: {
            resources,
            resourceTypes,
        },
    };
}

const getResources = async (): Promise<
    Array<{
        type: string;
        description: string;
    }>
> => {
    const homeFilename = path.join(process.cwd(), "content/pages/home.md");
    const fileContents = await fs.readFile(homeFilename, "utf8");
    const { data } = matter(fileContents);

    return data.resources.map((resource: any) => ({
        description: marked(resource.description),
        type: resource.type,
    }));
};

const getResourceTypes = async (): Promise<Record<string, string>> => {
    const netlifyConfigPath = path.join(
        process.cwd(),
        "public/admin/config.yml"
    );

    const netlifyConfig: any = yaml.load(
        await fs.readFile(netlifyConfigPath, "utf8")
    );

    const { options } = netlifyConfig?.collections
        .find((collection: any) => collection.name === "resources")
        ?.fields.find((field: any) => field.name === "services")
        ?.fields.find((field: any) => field.name === "type");

    return (
        options?.reduce(
            (
                acc: Record<string, string>,
                option: { label: string; value: string }
            ) => {
                acc[option.value] = option.label;
                return acc;
            },
            {}
        ) ?? {}
    );
};

Home.getLayout = (page) => <Layout bgStyle="dark">{page}</Layout>;

export default Home;
