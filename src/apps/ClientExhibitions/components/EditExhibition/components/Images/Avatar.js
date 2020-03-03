import React, {useRef} from 'react';
import ActiveImageWrapper from "../../../../../../components/ActiveImageWrapper";
import {connectExhibitionImages} from 'apps/ClientExhibitions/connectors';
import {pictureTypes} from 'apps/ClientExhibitions/config';
import {DEFAULT_IMG} from "../../../../../../appConfig";


const ExhibitionAvatar = ({exhibition_avatar_link, exhibitionId, addAvatarSuccess}) => {
    const ref = useRef(null);
    const onSuccess = data => addAvatarSuccess(data);
    const params = {
        picture_type: pictureTypes.AVATAR,
        exhibition_id: parseInt(exhibitionId, 10)
    };

    return (
        <ActiveImageWrapper
            requestUrl={'/api/exhibitions/Picture/full'}
            additionalParams={params}
            onSubmitSuccess={onSuccess}
        >
            <div
                ref={ref}
                style={{backgroundImage: `url(${exhibition_avatar_link || DEFAULT_IMG.clubAvatar})`}}
                className="exhibition-schedule__img"
            />
        </ActiveImageWrapper>
    )
};

export default connectExhibitionImages(ExhibitionAvatar)