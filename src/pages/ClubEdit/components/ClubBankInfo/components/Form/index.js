import React from "react";
import {Form} from "../../../../../../components/Form";
import RenderFields from "./RenderFields";
import {clubBankInfoFormConfig} from "../../config";
import {connectBankInfoForm} from "../../connectors";


const UpdateBankInfoForm = ({clubBankInfo, updateBankInfoSuccess, bindSubmitForm}) => (
    clubBankInfo &&
        <Form
            onSuccess={data => updateBankInfoSuccess(data)}
            {...clubBankInfoFormConfig}
            initialValues={clubBankInfo}
            bindSubmitForm={bindSubmitForm}
        >
            <RenderFields />
        </Form>
);

export default connectBankInfoForm(React.memo(UpdateBankInfoForm));