import React, {useCallback} from 'react'
import {FormFormikEnhanced} from "components/Form";
import RenderFields, {FormButton} from './RenderFields'
import {firstStepForm} from "apps/ClientExhibitions/config";
import {connectUpdateExhibitionForm} from "apps/ClientExhibitions/connectors";
import {objectNotEmpty} from "utils";


function UpdateExhibitionForm({updateExhibitionSuccess, exhibitionDetails}) {

    const onUpdateExhibitionSuccess = useCallback(data => {
        updateExhibitionSuccess(data);
    }, []);

    const detailsLoaded = objectNotEmpty(exhibitionDetails)
    console.log('UpdateExhibitionForm.render', exhibitionDetails)
    return detailsLoaded ? (
            <FormFormikEnhanced
                onSuccess={onUpdateExhibitionSuccess}
                {...firstStepForm}
                formInitials={exhibitionDetails}
                isUpdate
            >
                <RenderFields/>
                <FormButton isUpdate/>
            </FormFormikEnhanced>
        )
        :
        <div className="centered-block">Загрузка...</div>
}

export default connectUpdateExhibitionForm(UpdateExhibitionForm)