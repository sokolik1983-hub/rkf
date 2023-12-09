import React from 'react';
import { clubClubSocialConfig } from '../../config';
import {FormField, FormGroup} from '../../../../../../components/Form';


const {fields} = clubClubSocialConfig;

const RenderFields = () => (
    <FormGroup inline>
        <FormField {...fields.site} isUrl={true}/>
        <FormField {...fields.description}/>
    </FormGroup>
);

export default React.memo(RenderFields);