import React, { useState } from 'react';

import Share from 'components/Share';
import { Request } from '../../utils/request';
// import processingLikes from './utils/likes/processingLikes';
import profileTypes from './profileTypes';

import './index.scss';

const CardFooter = ({
                        id,
                        share_link,
                        is_liked,
                        like_count,
                        likesOn,
                        type,
                    }) => {
    console.log('profileTypes', profileTypes)
    console.log('profileTypes', profileTypes[type].methodToAdd)

    const [isLiked, setIsLiked] = useState(is_liked);
    const [likesCount, setLikesCount] = useState(like_count);
    console.log('is_liked', is_liked)
    console.log('like_count', like_count)
    // const typey = profileType;
    const urlToAdd =  profileTypes[type].methodToAdd;
    const urlToRemove = profileTypes[type].methodToRemove;


    const handleLikeClick = async () => {
        if (likesOn) {
            await Request({
                // url: isLiked ? '/api/article/remove_like_from_article/' : '/api/article/add_like_to_article/',
                url: isLiked ? profileTypes[type].methodToAdd : profileTypes[type].methodToRemove,
                method: isLiked ? 'PUT' : 'POST',
                data: JSON.stringify({article_id: id})
            }, () => {
                setIsLiked(!isLiked);
                setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);

                console.log('new isLiked', isLiked)
                console.log('new likesCount', likesCount)
            }, e => console.log(e.response));
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

export default CardFooter;
