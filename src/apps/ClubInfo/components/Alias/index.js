import React from 'react'
import {connectClubAlias} from 'apps/ClientClub/connectors'
import {Form, FormGroup, FormField, SubmitButton} from 'components/Form'
import {usePushMessage} from 'apps/Messages/hooks'

import {defaultSuccessMessage} from 'shared/messages'


function ClientClubAlias({club_alias, club_id, clubAliasUpdateSuccess, bindSubmitForm}) {
    const {push} = usePushMessage();
    const onSuccess = (values) => {
        clubAliasUpdateSuccess(values)
        // push(defaultSuccessMessage)
    };
    const transformValues = values => ({...values, club_id})
    return (
        <div className="ClientClubAlias">
            <Form
                method={"PUT"}
                action={'/api/Alias'}
                initialValues={{alias_name: club_alias ? club_alias : ''}}
                onSuccess={onSuccess}
                transformValues={transformValues}
                bindSubmitForm={bindSubmitForm}
            >
                <FormGroup inline>
                    <FormField
                        name="alias_name"
                        label={'Алиас клуба, используется для адресации'}
                    />
                    {/*<SubmitButton>Обновить</SubmitButton>*/}
                </FormGroup>

            </Form>
        </div>
    )
}

export default connectClubAlias(ClientClubAlias)