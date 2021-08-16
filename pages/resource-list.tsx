import React from "react";
import Layout from "../components/layout";
import { promises as fs } from "fs";
import path from "path";
import { WithPageLayout } from "../types/with-page-layout";
import matter from "gray-matter";
import yaml from "js-yaml";
import { groupBy } from "lodash";

interface ResourceListProps {
    resources: Array<{
        content: string;
        data: {
            name: string;
            phone_no?: string;
            website?: string;
            type: string;
        };
        filename: string;
    }>;
}

const ResourceList: WithPageLayout<ResourceListProps> = ({ resources }) => {
    const groupedResources = groupBy(
        resources,
        (resource) => resource.data.type
    );

    return (
        <div className="container px-4 mx-auto">
            {Object.keys(groupedResources).map((type) => {
                return (
                    <div key={type}>
                        <h2 className="font-bold">{type}</h2>
                        {groupedResources[type].map(
                            ({ content, data, filename }) => {
                                const { name, phone_no, website } = data;

                                return (
                                    <div key={filename} className="pb-4">
                                        <h3>{name}</h3>
                                        <p>{phone_no}</p>
                                        <p>
                                            <a
                                                target="_blank"
                                                rel="noreferrer"
                                                href={website}
                                            >
                                                {website}
                                            </a>
                                        </p>
                                        <p>{content}</p>
                                    </div>
                                );
                            }
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export async function getStaticProps() {
    const resourcesDirectory = path.join(process.cwd(), "content/resources");
    const filenames = await fs.readdir(resourcesDirectory);

    const resourceTypes = await getResourceTypes();

    const resources = filenames.map(async (filename) => {
        const filePath = path.join(resourcesDirectory, filename);
        const fileContents = await fs.readFile(filePath, "utf8");
        const { content, data } = matter(fileContents);

        return {
            content,
            data: {
                ...data,
                type:
                    resourceTypes.find((type) => type.value === data.type)
                        ?.label ?? data.type,
            },
            filename,
        };
    });

    return {
        props: {
            resources: await Promise.all(resources),
        },
    };
}

const getResourceTypes = async (): Promise<
    Array<{ label: string; value: string }>
> => {
    const netlifyConfigPath = path.join(
        process.cwd(),
        "public/admin/config.yml"
    );

    const netlifyConfig: any = yaml.load(
        await fs.readFile(netlifyConfigPath, "utf8")
    );

    const { options } = netlifyConfig?.collections
        .find((collection: any) => collection.name === "resources")
        ?.fields.find((field: any) => field.name === "type");

    return options;
};

// eslint-disable-next-line react/display-name
ResourceList.getLayout = (page) => <Layout>{page}</Layout>;

export default ResourceList;
