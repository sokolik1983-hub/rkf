import React from 'react';
import { useVisibility } from 'shared/hooks';
import Button from 'components/Button';
import { Form, SubmitButton } from 'components/Form';
import DeleteButton from 'components/DeleteButton';
import { RenderFields } from 'apps/ClubContacts/components/Form/RenderFields';
import { connectClientClubContactListItem } from 'apps/ClubContacts/connectors';
import { ENDPOINT_URL } from 'apps/ClubContacts/config';

import { HTTP } from 'appConfig';

const clsNames = 'btn-transparent btn-condensed';

function ClientClubContactListItem({
    clubContact,
    updateClubContactSuccess,
    deleteClubContactSuccess
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
            method={HTTP.update}
            initialValues={clubContact}
        >
            <RenderFields disabled={!visibility} isUpdate />
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
