import React from 'react';
import {clubClubDocumentsConfig} from '../../config';
import {FormField, FormGroup} from '../../../../../../components/Form';


const {fields} = clubClubDocumentsConfig;

const RenderFields = () => (
    <FormGroup className="ClubDocs" inline >
        <FormField {...fields.url} isUrl={true}/>
        <FormField {...fields.name}/>
    </FormGroup>
);

export default React.memo(RenderFields);