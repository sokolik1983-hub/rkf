import React from 'react';
import DeleteButton from '../../../../../../components/DeleteButton';
import {Form} from '../../../../../../components/Form';
import RenderFields from '../../components/Form/RenderFields';
import {useVisibility} from '../../../../../../shared/hooks';
import {connectClientClubContactListItem} from '../../connectors';
import {ENDPOINT_URL} from '../../config';

const ClientClubContactListItem = ({
        type,
        clubContact,
        checkForDelete,
        bindSubmitForm,
        updateClubContactSuccess,
        deleteClubContactSuccess,
}) => {
    const {setInvisible} = useVisibility(false);

    const onUpdateSuccess = values => {
        updateClubContactSuccess(values);
        setInvisible();
    };

    const onDeleteSuccess = () => {
        deleteClubContactSuccess({...clubContact});
    };

    const successDelete = () => {
        checkForDelete();
        onDeleteSuccess();
    }

    return (
        <Form
            className="ClientClubListItem"
            action="/api/clubs/Contact"
            onSuccess={onUpdateSuccess}
            method="PUT"
            initialValues={clubContact}
            bindSubmitForm={bindSubmitForm}
        >
            <RenderFields isMaskedTel={type === "phone"} />
                <div className="ClientClubListItem__controls">
                    <DeleteButton
                        onDeleteSuccess={successDelete}
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