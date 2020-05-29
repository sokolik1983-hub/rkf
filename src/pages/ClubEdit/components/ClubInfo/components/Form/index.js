import React from "react";
import ls from "local-storage";
import {Form} from "../../../../../../components/Form";
import RenderFields from "./RenderFields";
import {connectClubInfoForm} from "../../../../connectors";
import {clubInfoFormConfig} from "../../config";


const ClubInfoForm = ({clubInfo, clubInfoUpdateSuccess, bindSubmitForm}) => {
    const transformValues = values => {
        let newValues = {...values};

        if (newValues.status_id) delete newValues.status_id;

        newValues.site = values.site || null;

        return {...newValues}
    };

    const onSuccess = values => {
        clubInfoUpdateSuccess(values);
        ls.set('user_info', { ...ls.get('user_info'), name: values.name });
    };

    return (
        <div style={{flex: 2}}>
            <h3>Общая информация</h3>
            <Form
                method={"PUT"}
                action={'/api/Club'}
                validationSchema={clubInfoFormConfig.validationSchema}
                onSuccess={onSuccess}
                initialValues={clubInfo}
                transformValues={transformValues}
                bindSubmitForm={bindSubmitForm}
            >
                <RenderFields />
            </Form>
        </div>
    )
};

export default connectClubInfoForm(React.memo(ClubInfoForm));