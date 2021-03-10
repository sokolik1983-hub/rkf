import React, { useState, useEffect } from "react";
import { Checkbox } from "@progress/kendo-react-inputs";
import "./index.scss";


const MustRead = ({ setActiveCategoryId, notificationUrlIndex }) => {
    const [isChecked, setIsChecked] = useState(notificationUrlIndex === 4 ? true : false);

    useEffect(() => {
        if (notificationUrlIndex === 4) {
            setActiveCategoryId(5);
        }
    }, [notificationUrlIndex]);

    const handleCheck = () => {
        if (!isChecked) {
            setIsChecked(true);
            setActiveCategoryId(5);
        } else {
            setIsChecked(false);
            setActiveCategoryId(4);
        }
    };

    return (
        <div className="must-read">
            <Checkbox
                label={'Обязательные к прочтению'}
                onChange={handleCheck}
                checked={isChecked}
            />
        </div>
    );
};

export default React.memo(MustRead);