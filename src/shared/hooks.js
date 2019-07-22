import {useState, useMemo} from "react";

export const useVisibility = (initialVisibility = false) => {
    const [visibility, setVisibility] = useState(initialVisibility);
    const toggleVisibility = () => setVisibility(!visibility);
    const setVisible = () => setVisibility(true);
    const setInvisible = () => setVisibility(false);
    return useMemo(
        () => ({
            visibility,
            toggleVisibility, setVisible, setInvisible,
        }),
        [toggleVisibility, setVisible, setInvisible, visibility],
    );
};