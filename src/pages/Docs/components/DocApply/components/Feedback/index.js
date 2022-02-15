import React, { useState } from "react";
import { FormField, FormGroup } from "../../../../../../components/Form";
import {options} from "./config.js";

import "./style.scss"


const FeedBack = () => {

    const [categoryId, setCategoryId] = useState(null);

    const {fields} = options

    console.log(categoryId);


    return (
        <FormGroup>
            <FormField {...fields.reason} />
            <FormField {...fields.category} onChange={() => console.log('eeee')}/>
            <FormField {...fields.subCategory}
                       disabled={!categoryId}
                       optionsEndpoint={`/api/feedback/sub_categories?categoryId=${categoryId}`}/>
            <FormField {...fields.feedbackText} />
        </FormGroup>
    );
};

export default FeedBack;
