import React from 'react';
import {
    FormField,
    FormGroup,
    SubmitButton,
    FormControls
} from 'components/Form';
import { exhibitionDocumentFormConfig } from 'apps/ClientExhibitionDocuments/config';

const { fields } = exhibitionDocumentFormConfig;

export const RenderFields = ({ isUpdate }) => (
    <FormGroup inline>
        <FormField {...fields.name} />
        <FormField {...fields.url} />
        <FormControls>
            <SubmitButton type="submit" className="btn-simple">
                {isUpdate ? 'Обновить' : 'Добавить'}
            </SubmitButton>
        </FormControls>
    </FormGroup>
);
