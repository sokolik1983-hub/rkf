import {FormField} from "../../Form";
import React from "react";

const SelectAsync = (props) => {

    const { activeElem, fields, cityLabel, isMulti } = props;
    console.log('isMulti', isMulti)

    return (
        <FormField className={`ArticleCreateForm__input-city`}  {...fields.dog_city} label={`Место ${cityLabel}`} isMulti={isMulti} />
    )
};

export default SelectAsync;