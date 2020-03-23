import React from "react";
import {Form} from "../../../../../../components/Form";
import DeleteButton from "../../../../../../components/DeleteButton";
import Dropdown from "../../../../../../components/Dropdown";
import RenderFields from "../Form/RenderFields";
import ClubListSocial from "./ListSocial";
import {useVisibility} from "../../../../../../shared/hooks";
import {connectClientClubListItem} from "../../connectors";
import {clubClubSocialConfig, endpointUrl} from "../../config";


const ClientClubListItem = ({clubSocial, updateClubSocialSuccess, deleteClubSocialSuccess}) => {
    const {visibility, toggleVisibility, setInvisible} = useVisibility(false);
    
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
    
    return (
        <div className="ClientClubListItem">
            {visibility ?
                <Form
                    action={clubClubSocialConfig.formAction}
                    onSuccess={onUpdateSuccess}
                    method="PUT"
                    initialValues={filterObj(clubSocial, 'social_network_type_id')}
                >
                    <RenderFields isUpdate />
                </Form> :
                <ClubListSocial {...clubSocial} />
            }
            <div className="ClientClubListItem__controls">
                {visibility &&
                    <button className="btn" onClick={toggleVisibility}>Отмена</button>
                }
                <Dropdown position="right" closeOnClick={true}>
                    <button onClick={toggleVisibility}>Изменить</button>
                    <DeleteButton
                        onDeleteSuccess={onDeleteSuccess}
                        windowed
                        actionUrl={`${endpointUrl}/${clubSocial.id}`}
                    >Удалить</DeleteButton>
                </Dropdown>
            </div>
        </div>
    )
};

export default connectClientClubListItem(React.memo(ClientClubListItem));