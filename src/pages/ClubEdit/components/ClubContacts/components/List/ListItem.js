import React from "react";
import Button from "../../../../../../components/Button";
import DeleteButton from "../../../../../../components/DeleteButton";
import {Form, SubmitButton} from "../../../../../../components/Form";
import RenderFields from "../../components/Form/RenderFields";
import {useVisibility} from "../../../../../../shared/hooks";
import {connectClientClubContactListItem} from "../../connectors";
import {ENDPOINT_URL} from "../../config";


const ClientClubContactListItem = ({clubContact, updateClubContactSuccess, deleteClubContactSuccess, type}) => {
    const {visibility, toggleVisibility, setInvisible} = useVisibility(false);

    const onUpdateSuccess = values => {
        updateClubContactSuccess(values);
        setInvisible();
    };

    const onDeleteSuccess = () => {
        deleteClubContactSuccess({...clubContact});
    };

    return (
        <Form
            className="ClientClubListItem"
            action={'/api/clubs/Contact'}
            onSuccess={onUpdateSuccess}
            method="PUT"
            initialValues={clubContact}
        >
            <RenderFields isMaskedTel={type === 'phone'} />
                <div className="ClientClubListItem__controls">
                    <DeleteButton
                        onDeleteSuccess={onDeleteSuccess}
                        windowed
                        actionUrl={`${ENDPOINT_URL}/${clubContact.id}`}
                    >
                        Удалить
                    </DeleteButton>
                </div>
        </Form>
    )
};

export default connectClientClubContactListItem(React.memo(ClientClubContactListItem));