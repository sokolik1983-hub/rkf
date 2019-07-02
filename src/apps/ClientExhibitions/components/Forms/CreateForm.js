import React, {useCallback} from 'react'
import {FormFormikEnhanced} from "components/Form";
import RenderFields, {FormButton} from './RenderFields'
import {firstStepForm} from "apps/ClientExhibitions/config";
import {connectCreateExhibitionForm} from "apps/ClientExhibitions/connectors";
import history from 'utils/history'


function CreateExhibitionForm({addExhibitionSuccess}) {

    const onAddExhibitionSuccess = useCallback(data => {
        addExhibitionSuccess(data);
        history.push(`/client/exhibitions/${data.id}/details/schedule`)
    }, []);

    return (
        <FormFormikEnhanced
            onSuccess={onAddExhibitionSuccess}
            {...firstStepForm}
        >
            <RenderFields/>
            <FormButton/>
        </FormFormikEnhanced>
    )
}

export default connectCreateExhibitionForm(CreateExhibitionForm)