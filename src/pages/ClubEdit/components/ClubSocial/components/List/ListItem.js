import React from 'react';
import {Form} from '../../../../../../components/Form';
import DeleteButton from '../../../../../../components/DeleteButton';
import RenderFields from '../Form/RenderFields';
import {useVisibility} from '../../../../../../shared/hooks';
import {connectClientClubListItem} from '../../connectors';
import {clubClubSocialConfig, endpointUrl} from '../../config';


const ClientClubListItem = ({
        clubSocial,
        checkForDelete,
        updateClubSocialSuccess,
        deleteClubSocialSuccess
}) => {
    const {setInvisible} = useVisibility(false);

    const onUpdateSuccess = values => {
        updateClubSocialSuccess(values);
        setInvisible()
    };

    const onDeleteSuccess = () => deleteClubSocialSuccess({ id: clubSocial.id });

    const filterObj = (obj, fKey) => {
        return Object.keys(obj)
            .filter(key => key !== fKey)
            .reduce((obj, key) => {
                obj[key] = clubSocial[key];
                return obj;
            }, {});
    };

    const successDelete = () => {
        checkForDelete();
        onDeleteSuccess();
    }

    return (
        <div className="ClientClubListItem">
                <Form
                    action={clubClubSocialConfig.formAction}
                    onSuccess={onUpdateSuccess}
                    method="PUT"
                    initialValues={filterObj(clubSocial, "social_network_type_id")}
                >
                    <RenderFields />
                </Form>
            <div className="ClientClubListItem__controls">
                <DeleteButton
                    onDeleteSuccess={successDelete}
                    windowed
                    actionUrl={`${endpointUrl}/${clubSocial.id}`}
                >
                    Удалить
                </DeleteButton>
            </div>
        </div>
    )
};

export default connectClientClubListItem(React.memo(ClientClubListItem));