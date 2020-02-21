import React from 'react'
import { useVisibility } from "shared/hooks";
import { Form } from 'components/Form'
import { connectClientClubListItem } from 'apps/ClubDocuments/connectors'
import { RenderFields } from 'apps/ClubDocuments/components/Form/RenderFields'
import ClubListDocument from './ListDocument'
import DeleteButton from "../../../../components/DeleteButton";
import Dropdown from 'components/Dropdown';

function ClientClubListItem({ clubDocument, updateClubDocumentSuccess, deleteClubDocumentSuccess }) {
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
        deleteClubDocumentSuccess({ id: clubDocument.id })
    };
    return (
        <div className="ClientClubListItem">{
            visibility ?
                <Form
                    action={'/api/clubs/ClubDocument'}
                    onSuccess={onUpdateSuccess}
                    method="PUT"
                    initialValues={clubDocument}
                >
                    <RenderFields isUpdate />
                </Form>
                :
                <ClubListDocument {...clubDocument} />
        }
            <div className="ClientClubListItem__controls">
                {
                    visibility
                        ? <button className="btn" onClick={toggleVisibility}>Отмена</button>
                        : null
                }
                <Dropdown position="right" closeOnClick={true}>
                    <DeleteButton
                        onDeleteSuccess={onDeleteSuccess}
                        windowed
                        //params={params}
                        actionUrl={`/api/clubs/ClubDocument/${clubDocument.id}`}
                    >Удалить</DeleteButton>
                </Dropdown>
            </div>
        </div>
    )
}

export default connectClientClubListItem(ClientClubListItem)