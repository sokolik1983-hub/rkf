import React from 'react'
import { useVisibility } from "shared/hooks";
import { Form } from 'components/Form'
import { connectClientClubListItem } from 'apps/ClubSocial/connectors'
import { RenderFields } from 'apps/ClubSocial/components/Form/RenderFields'
import ClubListSocial from './ListSocial'
import { HTTP } from 'appConfig'
import DeleteButton from "components/DeleteButton";
import { clubClubSocialConfig, endpointUrl } from 'apps/ClubSocial/config'
import Dropdown from 'components/Dropdown';

function ClientClubListItem({ clubSocial, updateClubSocialSuccess, deleteClubSocialSuccess }) {
    const {
        visibility,
        toggleVisibility,
        setInvisible,
    } = useVisibility(false);
    const onUpdateSuccess = (values) => {
        updateClubSocialSuccess(values);
        setInvisible()
    };
    const onDeleteSuccess = () => {
        deleteClubSocialSuccess({ id: clubSocial.id })
    };
    return (
        <div className="ClientClubListItem">{
            visibility ?
                <Form
                    action={clubClubSocialConfig.formAction}
                    onSuccess={onUpdateSuccess}
                    method={HTTP.update}
                    initialValues={clubSocial}
                >
                    <RenderFields isUpdate />
                </Form>
                :
                <ClubListSocial {...clubSocial} />
        }
            <div className="ClientClubListItem__controls">
                {
                    visibility
                        ? <button className="btn" onClick={toggleVisibility}>Отмена</button>
                        : null
                }
                <Dropdown position="right" closeOnClick={true}>
                    <button onClick={toggleVisibility}>Изменить</button>
                    <DeleteButton
                        onDeleteSuccess={onDeleteSuccess}
                        windowed
                        //params={params}
                        actionUrl={`${endpointUrl}?id=${clubSocial.id}`}
                    >Удалить</DeleteButton>
                </Dropdown>
            </div>
        </div>
    )
}

export default connectClientClubListItem(ClientClubListItem)