import React, {useEffect, useState} from 'react';
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
        setNeedUpdate,
        needUpdate,
                                       setCheckedId,
    checkedId
}) => {
    const {setInvisible} = useVisibility(false);
    const [isMain, setIsMain] = useState(clubContact.is_main)

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

    const handleChecked = () => {
        setIsMain(!isMain);
        clubContact.is_main = !isMain;
        // setNeedUpdate(true);
        // setCheckedId(clubContact.id);
    };

    // useEffect(() => {
    //     if(checkedId == clubContact.id) {
    //         console.log('11111111111111111', checkedId)
    //     } else if(checkedId !== 0) {
    //         setIsMain(false);
    //     }
    // }, [checkedId]);

    console.log('111111111111111')


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
                    <input onChange={handleChecked} name="contacts" type="checkbox" checked={isMain} id={clubContact.id}/>
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