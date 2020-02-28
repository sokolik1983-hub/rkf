import React from 'react';
import { useVisibility } from 'shared/hooks';
import Button from 'components/Button';
import { Form, SubmitButton } from 'components/Form';
import DeleteButton from 'components/DeleteButton';
import { RenderFields } from '../../components/Form/RenderFields';
import { connectClientClubContactListItem } from '../../connectors';
import { ENDPOINT_URL } from '../../config';

const clsNames = 'btn-transparent btn-condensed';

function ClientClubContactListItem({
    clubContact,
    updateClubContactSuccess,
    deleteClubContactSuccess,
    type
}) {
    const { visibility, toggleVisibility, setInvisible } = useVisibility(false);
    const onUpdateSuccess = values => {
        updateClubContactSuccess(values);
        setInvisible();
    };
    const onDeleteSuccess = () => {
        deleteClubContactSuccess({ ...clubContact });
    };
    return (
        <Form
            className="ClientClubContactListItem"
            action={'/api/clubs/Contact'}
            onSuccess={onUpdateSuccess}
            method="PUT"
            initialValues={clubContact}
        >
            <RenderFields disabled={!visibility} isUpdate isMaskedTel={type === 'phone' ? true : false} />
            {!visibility ? (
                <Button
                    className="ClientClubContactListItem__edit"
                    onClick={toggleVisibility}
                >
                    Изменить
                </Button>
            ) : null}
            {visibility ? (
                <div className="ClientClubContactListItem__controls">
                    <SubmitButton className="btn-green">Сохранить</SubmitButton>
                    <Button className={clsNames} onClick={setInvisible}>
                        Отменить
                    </Button>

                    <DeleteButton
                        className={clsNames}
                        onDeleteSuccess={onDeleteSuccess}
                        windowed
                        actionUrl={`${ENDPOINT_URL}/${clubContact.id}`}
                    >
                        Удалить
                    </DeleteButton>
                </div>
            ) : null}
        </Form>
    );
}

export default connectClientClubContactListItem(ClientClubContactListItem);
