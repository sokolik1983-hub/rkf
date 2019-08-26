import React from 'react'
import {useVisibility} from "shared/hooks";
import {Form} from 'components/Form'
import {connectClientClubListItem} from 'apps/ClubContacts/connectors'
import {RenderFields} from 'apps/ClubContacts/components/Form/RenderFields'
import ClubListContact from './ListContact'
import {HTTP} from 'appConfig'
import DeleteButton from "../../../../components/DeleteButton";

function ClientClubListItem({clubContact, updateClubContactSuccess, deleteClubContactSuccess}) {
    const {
        visibility,
        toggleVisibility,
        setInvisible,
    } = useVisibility(false);
    const onUpdateSuccess = (values) => {
        updateClubContactSuccess(values);
        setInvisible()
    };
    const onDeleteSuccess = () => {
        deleteClubContactSuccess({id:clubContact.id})
    };
    return (
        <div className="ClientClubListItem">{
            visibility ?
                <Form
                    action={"/api/clubs/Contact"}
                    onSuccess={onUpdateSuccess}
                    method={HTTP.update}
                    initialValues={clubContact}
                >
                    <RenderFields isUpdate/>
                </Form>
                :
                <ClubListContact {...clubContact}/>
        }
            <div className="ClientClubListItem__controls">
                <button onClick={toggleVisibility}>{visibility ? "отмена" : "изменить"}</button>
                <DeleteButton
                    onDeleteSuccess={onDeleteSuccess}
                    //params={params}
                    actionUrl={`/api/clubs/Contact/${clubContact.id}`}
                >удалить</DeleteButton>
            </div>
        </div>
    )
}

export default connectClientClubListItem(ClientClubListItem)