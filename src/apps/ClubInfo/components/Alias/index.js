import React from 'react'
import {connectClubAlias} from 'apps/ClientClub/connectors'
import {Form, FormGroup, FormField, SubmitButton} from 'components/Form'


function ClientClubAlias({club_alias, club_id, clubAliasUpdateSuccess}) {
    const onSuccess = (values) => {
        clubAliasUpdateSuccess(values)
    };
    const transformValues = values => ({...values, club_id})
    return (
        <div className="ClientClubAlias">
            <h3>Алиас</h3>
            <Form
                method={"PUT"}
                action={'/api/Alias'}
                initialValues={{alias_name: club_alias ? club_alias : ''}}
                onSuccess={onSuccess}
                transformValues={transformValues}
            >
                <FormGroup inline>
                    <FormField
                        name="alias_name"
                        label={'Алиас клуба, используется для адресации'}
                    />
                    <SubmitButton>Обновить</SubmitButton>
                </FormGroup>

            </Form>
        </div>
    )
}

export default connectClubAlias(ClientClubAlias)