import React from "react";
import Layout from "../components/layout";
import { promises as fs } from "fs";
import path from "path";
import { WithPageLayout } from "../types/with-page-layout";
import matter from "gray-matter";
import yaml from "js-yaml";
import { chain } from "lodash";
import marked from "marked";
import ResourceHeading from "../components/resource-heading";

interface ResourceListProps {
    resources: Array<{
        content: string;
        data: {
            name: string;
            phone_no?: string;
            website?: string;
            services: Array<{ type: string; description: string }>;
        };
        filename: string;
    }>;
    resourceTypes: Record<string, string>;
}

const ResourceList: WithPageLayout<ResourceListProps> = ({
    resources,
    resourceTypes,
}) => {
    const groupedResources = chain(resources)
        .flatMap((resource) => {
            const { data, ...restResource } = resource;
            const { services, ...restData } = data;

            return resource.data.services.map((service) => ({
                ...restResource,
                data: {
                    ...restData,
                    ...service,
                },
            }));
        })
        .groupBy((resource) => resource.data.type)
        .value();

    return (
        <div className="container px-4 mx-auto">
            {Object.keys(groupedResources).map((type, index) => {
                return (
                    <div key={type}>
                        {index > 0 && <hr className="my-4" />}

                        <ResourceHeading
                            label={resourceTypes[type]}
                            type={type}
                        />

                        {groupedResources[type].map(({ data, filename }) => {
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
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: data.description,
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export async function getStaticProps() {
    const resourcesDirectory = path.join(process.cwd(), "content/resources");
    const filenames = await fs.readdir(resourcesDirectory);

    const resources = filenames.map(async (filename) => {
        const filePath = path.join(resourcesDirectory, filename);
        const fileContents = await fs.readFile(filePath, "utf8");
        const { content, data } = matter(fileContents);

        return {
            content,
            data: {
                ...data,
                services: data.services.map((service: any) => ({
                    description: marked(service.description),
                    type: service.type,
                })),
            },
            filename,
        };
    });

    return {
        props: {
            resources: await Promise.all(resources),
            resourceTypes: await getResourceTypes(),
        },
    };
}

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

// eslint-disable-next-line react/display-name
ResourceList.getLayout = (page) => <Layout>{page}</Layout>;

export default ResourceList;
