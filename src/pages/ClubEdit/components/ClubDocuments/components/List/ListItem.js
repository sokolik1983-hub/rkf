import React from "react";
import {Form} from "../../../../../../components/Form";
import DeleteButton from "../../../../../../components/DeleteButton";
import RenderFields from "../../components/Form/RenderFields";
import {useVisibility} from "../../../../../../shared/hooks";
import {connectClientClubListItem} from "../../connectors";


function ClientClubListItem({clubDocument, updateClubDocumentSuccess, deleteClubDocumentSuccess}) {
    const {visibility, toggleVisibility, setInvisible} = useVisibility(false);

    const onUpdateSuccess = (values) => {
        updateClubDocumentSuccess(values);
        setInvisible();
    };

    const onDeleteSuccess = () => {
        deleteClubDocumentSuccess({ id: clubDocument.id });
    };

    return (
        <div className="ClientClubListItem">
                <Form
                    action={'/api/clubs/ClubDocument'}
                    onSuccess={onUpdateSuccess}
                    method="PUT"
                    initialValues={clubDocument}
                >
                    <RenderFields isUpdate />
                </Form>
            <div className="ClientClubListItem__controls">
                <DeleteButton
                    onDeleteSuccess={onDeleteSuccess}
                    windowed
                    actionUrl={`/api/clubs/ClubDocument/${clubDocument.id}`}
                >
                    Удалить
                </DeleteButton>
            </div>
        </div>
    )
}

export default connectClientClubListItem(React.memo(ClientClubListItem));