import React from 'react'
import {useVisibility} from "shared/hooks";
import {Form} from 'components/Form'
import {connectClientClubListItem} from 'apps/ClubDocuments/connectors'
import {RenderFields} from 'apps/ClubDocuments/components/Form/RenderFields'
import ClubListDocument from './ListDocument'
import {HTTP} from 'appConfig'
import DeleteButton from "../../../../components/DeleteButton";

function ClientClubListItem({clubDocument, updateClubDocumentSuccess, deleteClubDocumentSuccess}) {
    const {
        visibility,
        toggleVisibility,
        setInvisible,
    } = useVisibility(false);
    const onUpdateSuccess = (values) => {
        updateClubDocumentSuccess(values);
        setInvisible()
    };
    const onDeleteSuccess = () => {
        deleteClubDocumentSuccess({id:clubDocument.id})
    };
    return (
        <div className="ClientClubListItem">{
            visibility ?
                <Form
                    action={'/api/clubs/ClubDocument'}
                    onSuccess={onUpdateSuccess}
                    method={HTTP.update}
                    initialValues={clubDocument}
                >
                    <RenderFields isUpdate/>
                </Form>
                :
                <ClubListDocument {...clubDocument}/>
        }
            <div className="ClientClubListItem__controls">
                <button onClick={toggleVisibility}>{visibility ? "отмена" : "изменить"}</button>
                <DeleteButton
                    onDeleteSuccess={onDeleteSuccess}
                    //params={params}
                    actionUrl={`/api/clubs/ClubDocument/${clubDocument.id}`}
                >удалить</DeleteButton>
            </div>
        </div>
    )
}

export default connectClientClubListItem(ClientClubListItem)