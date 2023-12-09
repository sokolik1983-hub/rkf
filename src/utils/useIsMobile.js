import {useState, useEffect} from "react";

function useIsMobile(width = 991) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < width);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth < width);
        }

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isMobile;
};

export default useIsMobile;