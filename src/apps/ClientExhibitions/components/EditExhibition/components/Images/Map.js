import React, {useRef} from 'react';
import ActiveImageWrapper from "../../../../../../components/ActiveImageWrapper";
import {connectExhibitionImages} from 'apps/ClientExhibitions/connectors';
import {pictureTypes} from 'apps/ClientExhibitions/config';
import {DEFAULT_IMG} from "../../../../../../appConfig";


const ExhibitionMap = ({exhibition_map_link, exhibitionId, addMapSuccess}) => {
    const ref = useRef(null);
    const onSuccess = data => addMapSuccess(data);
    const params = {
        picture_type: pictureTypes.MAP,
        exhibition_id: parseInt(exhibitionId, 10)
    };

    return (
        <ActiveImageWrapper
            requestUrl={'/api/exhibitions/Picture/full'}
            additionalParams={params}
            onSubmitSuccess={onSuccess}
        >
            <div ref={ref}
                 style={{backgroundImage: `url(${exhibition_map_link || DEFAULT_IMG.clubAvatar})`}}
                 className="exhibition-schedule__img"
            />
        </ActiveImageWrapper>
    )
};

export default connectExhibitionImages(ExhibitionMap)