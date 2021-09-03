import React from "react";
import Link from "next/link";
import useScrollPosition from "../hooks/use-scroll-position";
import Menu, { MenuLink, MobilMenuVisibiltyAtom } from "./menu";
import { useAtom } from "jotai";

interface HeaderProps {
    bgStyle?: "light" | "dark";
}

const Header: React.FC<HeaderProps> = ({ bgStyle = "light" }) => {
    const { y: scrollY } = useScrollPosition();
    const [showMobileMenu] = useAtom(MobilMenuVisibiltyAtom);

    const alternateHeaderStyle =
        scrollY > 10 || bgStyle === "light" || showMobileMenu;

    const toggleColourClasses = alternateHeaderStyle
        ? "text-gray-800"
        : "text-white";
    const headerClasses = alternateHeaderStyle ? "bg-green-100 shadow" : "";

    return (
        <nav
            id="header"
            className={`fixed top-0 z-30 w-full text-white ${headerClasses}`}
        >
            <div className="container flex flex-wrap items-center justify-between w-full py-2 mx-auto mt-0">
                <div className="flex items-center pl-4">
                    <Link href="/">
                        <a
                            className={`text-2xl font-bold text-white no-underline ${toggleColourClasses} hover:no-underline lg:text-4xl`}
                        >
                            FRIENDS OF DONEGAL
                        </a>
                    </Link>
                </div>
                <Menu
                    actionLinkHref="/resource-list"
                    actionLinkText="Resources"
                    style={alternateHeaderStyle ? "light" : "dark"}
                >
                    <MenuLink href="/meetings">Meetings</MenuLink>
                    <MenuLink href="/about-us">About Us</MenuLink>
                    <MenuLink href="/contact">Contact</MenuLink>
                </Menu>
            </div>
        </nav>
    );
};

export default Header;
