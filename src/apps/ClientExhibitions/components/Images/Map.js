import React from 'react'
import ImageEditable from 'components/ImageEditable'
import {connectExhibitionImages} from 'apps/ClientExhibitions/connectors'
import {pictureTypes} from 'apps/ClientExhibitions/config'
import DeleteButton from "components/DeleteButton";




function ExhibitionMap({exhibition_map_link, exhibitionId, addMapSuccess}) {

    const onSuccess = data => addMapSuccess(data);
    const onDeleteSuccess = data => console.log(data);
    const params = {
        picture_type: pictureTypes.MAP, exhibition_id: parseInt(exhibitionId, 10)
    };
    const transformValues = values => ({...values, ...params})
    return (
        <ImageEditable
            // here we cat pass checkPermission on canEdit
            canEdit={() => true}
            formAction={'/api/exhibition/Picture/full'}
            onAddSuccess={onSuccess}
            imageUrl={exhibition_map_link}
            transformValues={transformValues}
            deleteButton={
                <DeleteButton
                    onDeleteSuccess={onDeleteSuccess}
                    params={params}
                    actionUrl={'/api/exhibition/Picture/bytype'}
                >удалить</DeleteButton>
            }
        />
    )
}

export default connectExhibitionImages(ExhibitionMap)