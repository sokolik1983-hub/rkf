import React from 'react'
import { connectClubAlias } from 'apps/ClientClub/connectors'
import { Form, FormGroup, FormAliasInput } from 'components/Form'
import { usePushMessage } from 'apps/Messages/hooks';
import ls from 'local-storage';

function ClientClubAlias({ club_alias, club_id, clubAliasUpdateSuccess, bindSubmitForm }) {
    usePushMessage();
    const onSuccess = (values) => {
        clubAliasUpdateSuccess(values);
        ls.set('user_info', { ...ls.get('user_info'), club_alias: values.alias_name });
        // push(defaultSuccessMessage)
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
                    <FormAliasInput
                        name="alias_name"
                    // fieldType="masked"
                    // mask={['h', 't', 't', 'p', 's', ':', '/', '/', 'u', 'e', 'p', '2', '4', '.', 'r', 'u', '/', /[\w]+/]}
                    // showMask={true}
                    // guide={true}
                    />
                    {/*<SubmitButton>Обновить</SubmitButton>*/}
                </FormGroup>

            </Form>
        </div>
    )
}

export default connectClubAlias(ClientClubAlias)