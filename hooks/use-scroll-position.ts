import { useEffect, useState } from "react";

export default function useScrollPosition() {
    const [scrollX, setScrollX] = useState(0);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            setScrollX(window.scrollX);
            setScrollY(window.scrollY);
        };

        document.addEventListener("scroll", onScroll);

        return () => {
            document.removeEventListener("scroll", onScroll);
        };
    }, []);

    return { x: scrollX, y: scrollY };
}
