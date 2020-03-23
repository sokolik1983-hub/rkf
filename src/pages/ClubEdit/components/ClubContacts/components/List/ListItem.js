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
            className="ClientClubContactListItem"
            action={'/api/clubs/Contact'}
            onSuccess={onUpdateSuccess}
            method="PUT"
            initialValues={clubContact}
        >
            <RenderFields disabled={!visibility} isUpdate isMaskedTel={type === 'phone'} />
            {!visibility &&
                <Button
                    className="ClientClubContactListItem__edit"
                    onClick={toggleVisibility}
                >
                    Изменить
                </Button>
            }
            {visibility &&
                <div className="ClientClubContactListItem__controls">
                    <SubmitButton className="btn-green">Сохранить</SubmitButton>
                    <Button className="btn-transparent btn-condensed" onClick={setInvisible}>Отменить</Button>
                    <DeleteButton
                        className="btn-transparent btn-condensed"
                        onDeleteSuccess={onDeleteSuccess}
                        windowed
                        actionUrl={`${ENDPOINT_URL}/${clubContact.id}`}
                    >
                        Удалить
                    </DeleteButton>
                </div>
            }
        </Form>
    )
};

export default connectClientClubContactListItem(React.memo(ClientClubContactListItem));