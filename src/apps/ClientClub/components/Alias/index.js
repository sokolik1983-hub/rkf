import React from 'react'
import {connectClientClubAlias} from 'apps/ClientClub/connectors'
import {Form, FormField, SubmitButton} from 'components/Form'

function ClientClubAlias({alias, club_id, updateAliasSuccess}) {
    const onSuccess=(values)=>console.log(values)
    const transformValues=values=>({...values, club_id})
    return (
        <div className="ClientClubAlias">
            ClientClubAlias
            <Form
                method={"PUT"}
                action={'/api/Alias'}
                initialValues={{alias_name: ''}}
                onSuccess={onSuccess}
                transformValues={transformValues}
            >
                <FormField name="alias_name"/>
                <SubmitButton>Ok</SubmitButton>
            </Form>
        </div>
    )
}

export default connectClientClubAlias(ClientClubAlias)