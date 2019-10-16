import React, {useCallback} from 'react'
import Card from 'components/Card'
import {FormFormikEnhanced} from "components/Form";
import RenderFields, {FormButton} from './RenderFields'
import {firstStepForm} from "apps/ClientExhibitions/config";
import {connectUpdateExhibitionForm} from "apps/ClientExhibitions/connectors";
import {objectNotEmpty} from "utils";


function UpdateExhibitionForm({updateExhibitionSuccess, exhibitionDetails}) {
    const onUpdateExhibitionSuccess = useCallback(data => {
        updateExhibitionSuccess(data);
    }, []);

    const detailsLoaded = objectNotEmpty(exhibitionDetails);

    return detailsLoaded ? (
            <Card style={{marginTop: 40}}>
                <FormFormikEnhanced
                    onSuccess={onUpdateExhibitionSuccess}
                    {...firstStepForm}
                    formInitials={exhibitionDetails}
                    isUpdate
                >
                    <RenderFields/>
                    <FormButton className='btn-primary' isUpdate/>
                </FormFormikEnhanced>
            </Card>
        )
        :
        <div className="centered-block">Загрузка...</div>
}

export default connectUpdateExhibitionForm(UpdateExhibitionForm)