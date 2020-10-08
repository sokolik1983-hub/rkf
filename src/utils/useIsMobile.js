import {useState, useEffect} from "react";

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 991);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth < 991);
        }

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isMobile;
};

export default useIsMobile;