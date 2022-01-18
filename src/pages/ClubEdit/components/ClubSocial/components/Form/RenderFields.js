import React from "react";
import {FormField, FormGroup} from "../../../../../../components/Form";
import { clubClubSocialConfig } from "../../config";


const {fields} = clubClubSocialConfig;

const RenderFields = () => (
    <FormGroup inline>
        <FormField {...fields.site} isUrl={true}/>
        <FormField {...fields.description}/>
    </FormGroup>
);

export default React.memo(RenderFields);