import React, { useState } from "react";

import Share from "components/Share";
import { Request } from "../../utils/request";

import './index.scss';

const CardFooter = ({
                        id,
                        share_link,
                        is_liked,
                        like_count,
                        likesOn,
                    }) => {
    const [isLiked, setIsLiked] = useState(is_liked);
    const [likesCount, setLikesCount] = useState(like_count);
    console.log('is_liked', is_liked)
    console.log('like_count', like_count)

    const handleLikeClick = async () => {
        if (likesOn) {
            await Request({
                url: isLiked ? '/api/article/remove_like_from_article/' : '/api/article/add_like_to_article/',
                method: isLiked ? 'PUT' : 'POST',
                data: JSON.stringify({article_id: id})
            }, () => {
                setIsLiked(!isLiked);
                setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
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
                         <span>{likesCount ? like_count : '0'}</span>
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
