import React, { memo, useState } from 'react';

import { connectAuthVisible } from '../../pages/Login/connectors';
import Share from 'components/Share';
import { Request } from '../../utils/request';
import profileTypes from './profileTypes';

import './index.scss';


const CardFooter = ({
                        id,
                        share_link,
                        is_liked,
                        like_count,
                        likesOn,
                        type,
                        userType,
                        isAuthenticated,
                    }) => {
    const [isLiked, setIsLiked] = useState(is_liked);
    const [likesCount, setLikesCount] = useState(like_count);

    const organizationType = userType === 4 ? 'kennels' : userType === 7 ? 'nbc' : 'federationsAndClubs';
    const judgesType = userType === 4 ? 'byBreed' : 'onWorkingQualities';

    const profileType = (!userType && userType !== 0) ? profileTypes[type]
        : (type === 'organizations' ? profileTypes[type][organizationType]
            : type === 'judges' ? profileTypes[type][judgesType] : '');

    const typeId = profileType?.profileId;

    const handleLikeClick = async () => {
        if (likesOn && isAuthenticated) {
            await Request({
                url: !isLiked ? profileType.methodToAdd : profileType.methodToRemove,
                method: isLiked ? 'PUT' : 'POST',
                data: JSON.stringify({ [typeId]: id })
            }, () => {
                setIsLiked(!isLiked);
                setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
            }, e => console.log(e.response));
        }

        if (!isAuthenticated) {
            alert('Необходимо авторизоваться');
        }
    }

    return (
        <div className="CardFooter">
            <div className="CardFooter__controls">
                <div className="CardFooter__controls-left">
                    <div>
                            <span
                                className={`k-icon ${isLiked
                                    ? ' k-i-heart colored-icon'
                                    : ' k-i-heart-outline'}`}
                                onClick={handleLikeClick}
                            />
                         <span>{likesCount ? likesCount : '0'}</span>
                    </div>
                    <div>
                        <span className="k-icon k-i-comment" />
                        <span>0</span>
                    </div>
                    <Share url={share_link} />
                </div>

                <div className="CardFooter__controls-right">
                    <div>
                        <span className="k-icon k-i-preview" />
                        <span>0</span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default memo(connectAuthVisible(CardFooter));