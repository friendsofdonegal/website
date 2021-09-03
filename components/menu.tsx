import React, { useEffect } from "react";
import Link from "next/link";
import { atom, useAtom } from "jotai";

type MenuStyle = "light" | "dark";

interface MenuProps {
    actionLinkHref: string;
    actionLinkText: string;
    style: MenuStyle;
}

const linkColor: Record<MenuStyle, string> = {
    light: "text-gray-800",
    dark: "text-white",
};

const navBackground: Record<MenuStyle, string> = {
    light: "bg-green-100",
    dark: "bg-gray-100",
};

const navActions: Record<MenuStyle, string> = {
    dark: "bg-white text-gray-800",
    light: "gradient text-white",
};

export const MobilMenuVisibiltyAtom = atom(false);

const Menu: React.FC<MenuProps> = ({
    actionLinkHref,
    actionLinkText,
    children,
    style: inheritedStyle,
}) => {
    const [showMobileMenu, setShowMobileMenu] = useAtom(MobilMenuVisibiltyAtom);

    const handleCompactMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowMobileMenu((prev) => !prev);
    };

    const mobileMenuVisibility = showMobileMenu ? "" : "hidden";
    const style = showMobileMenu ? "light" : inheritedStyle;

    const actionLinkClasses = showMobileMenu
        ? `inline-block px-4 py-2 font-bold ${linkColor[style]} no-underline hover:underline`
        : `px-8 py-4 mx-auto mt-4 font-bold transition duration-300 ease-in-out transform rounded-full shadow opacity-75 lg:mx-0 hover:underline lg:mt-0 focus:outline-none focus:shadow-outline hover:scale-105 ${navActions[style]}`;

    const menuButtonColors =
        showMobileMenu || style === "light"
            ? "text-gray-800 hover:text-gray-900"
            : "text-white hover:text-gray-200";

    useEffect(() => {
        if (!showMobileMenu) {
            return;
        }

        const handleWindowChange = () => {
            setShowMobileMenu(false);
        };

        window.addEventListener("resize", handleWindowChange);
        window.addEventListener("click", handleWindowChange);
        window.addEventListener("scroll", handleWindowChange);

        return () => {
            window.removeEventListener("resize", handleWindowChange);
            window.removeEventListener("click", handleWindowChange);
            window.removeEventListener("scroll", handleWindowChange);
        };
    }, [setShowMobileMenu, showMobileMenu]);

    return (
        <>
            <div className="block pr-4 lg:hidden">
                <button
                    onClick={handleCompactMenuClick}
                    className={`flex items-center p-1 transition duration-300 ease-in-out transform focus:outline-none focus:shadow-outline hover:scale-105`}
                >
                    <svg
                        className={`w-6 h-6 fill-current ${menuButtonColors}`}
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
            <div
                className={`${navBackground[style]} z-20 flex-grow ${mobileMenuVisibility} w-full p-4 mt-2 text-black lg:flex lg:items-center lg:w-auto lg:mt-0 lg:bg-transparent lg:p-0`}
                id="nav-content"
            >
                <ul className="items-center justify-end flex-1 list-reset lg:flex">
                    {React.Children.map(children, (child) => {
                        if (React.isValidElement(child)) {
                            return React.cloneElement(child, { style });
                        }

                        return child;
                    })}
                </ul>
                <Link href={actionLinkHref}>
                    <a id="navAction" className={actionLinkClasses}>
                        {actionLinkText}
                    </a>
                </Link>
            </div>
        </>
    );
};

interface MenuLinkProps {
    href: string;
}

export const MenuLink: React.FC<MenuLinkProps> = ({
    href,
    children,
    ...props
}) => {
    const { style } = props as { style: MenuStyle };

    return (
        <li className="mr-3">
            <Link href={href}>
                <a
                    className={`inline-block px-4 py-2 font-bold ${linkColor[style]} no-underline hover:underline`}
                >
                    {children}
                </a>
            </Link>
        </li>
    );
};

export default Menu;
