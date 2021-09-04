import { useState } from "react";

enum AnchorModifierClass {
    Hidden = "hidden",
    Visible = "inline-block",
}

interface ResourceHeadingProps {
    label: string;
    type: string;
}

const ResourceHeading: React.FC<ResourceHeadingProps> = ({ label, type }) => {
    const [anchorModifierClass, setAnchorModifierClass] =
        useState<AnchorModifierClass>(AnchorModifierClass.Hidden);

    const handleHeadingHover = (e: React.MouseEvent<HTMLHeadingElement>) => {
        console.log(e);
        e.preventDefault();

        if (e.type === "mouseover") {
            setAnchorModifierClass(AnchorModifierClass.Visible);
            return;
        }

        setAnchorModifierClass(AnchorModifierClass.Hidden);
    };

    return (
        <h2
            className="pb-4 text-green-700 uppercase"
            onMouseOverCapture={handleHeadingHover}
            onMouseOutCapture={handleHeadingHover}
        >
            <a
                id={type}
                href={`#${type}`}
                className={`${anchorModifierClass} relative pr-1 -ml-5`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                </svg>
            </a>
            {label}
        </h2>
    );
};

export default ResourceHeading;
