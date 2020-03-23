import React from "react";
import {Form} from "../../../../../../components/Form";
import RenderFields from "./RenderFields";
import {connectLegalInfoForm} from "../../connectors";
import {clubLegalInfoFormConfig} from "../../config";


const UpdateLegalInfoForm = ({clubLegalInfo, updateLegalInfoSuccess, bindSubmitForm}) => {
    if(clubLegalInfo && clubLegalInfo.registration_number) delete clubLegalInfo.registration_number;

    const onSuccess = data => updateLegalInfoSuccess(data);

    return clubLegalInfo &&
        <Form
            onSuccess={onSuccess}
            {...clubLegalInfoFormConfig}
            initialValues={clubLegalInfo}
            bindSubmitForm={bindSubmitForm}
        >
            <RenderFields />
        </Form>
};

export default connectLegalInfoForm(React.memo(UpdateLegalInfoForm));