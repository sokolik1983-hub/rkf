import React from "react";
import ls from "local-storage";
import {Form, FormGroup, FormAliasInput} from "../../../../../../components/Form";
import {connectClubAlias} from "../../../../connectors";


const ClientClubAlias = ({club_alias, club_id, clubAliasUpdateSuccess, bindSubmitForm}) => {
    const onSuccess = values => {
        clubAliasUpdateSuccess(values);
        ls.set('user_info', { ...ls.get('user_info'), club_alias: values.alias_name });
    };

    const transformValues = values => ({ ...values, club_id });

    return (
        <div className="ClientClubAlias">
            <Form
                method={"PUT"}
                action={'/api/Alias'}
                initialValues={{ alias_name: club_alias ? club_alias : '' }}
                onSuccess={onSuccess}
                transformValues={transformValues}
                bindSubmitForm={bindSubmitForm}
            >
                <FormGroup inline>
                    <FormAliasInput name="alias_name"/>
                </FormGroup>
            </Form>
        </div>
    )
};

export default connectClubAlias(React.memo(ClientClubAlias));