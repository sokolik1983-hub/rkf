import React, { useState } from "react";

import Share from "components/Share";

import './index.scss';

const CardFooter = ({
                        share_link,
                        is_liked,
                    }) => {
    const [isLiked, setIsLiked] = useState(is_liked);
    // const [likesCount, setLikesCount] = useState(like_count);

    /*
     взято из карточки новостей на будущее
     */
    // const handleLikeClick = () => {
    //     if (isLiked) {
    //         Request({
    //             url: `/api/article/remove_like_from_article/`,
    //             method: 'PUT',
    //             data: JSON.stringify({ article_id: id })
    //         },
    //             () => {
    //                 setIsLiked(!isLiked);
    //                 setLikesCount(likesCount - 1);
    //             }, e => console.log(e.response));
    //     } else {
    //         Request({
    //             url: `/api/article/add_like_to_article/`,
    //             method: 'POST',
    //             data: JSON.stringify({ article_id: id })
    //         },
    //             () => {
    //                 setIsLiked(!isLiked);
    //                 setLikesCount(likesCount + 1);
    //             }, e => console.log(e.response));
    //     }
    // }

    return (
        <div className="CardFooter__controls" style={{ borderTop: '1px solid #e5e5e5', paddingTop: '15px' }}>
            <div className="CardFooter__controls-left">
                <div>
                        <span
                            className={`k-icon ${isLiked
                                ? ' k-i-heart colored-icon'
                                : ' k-i-heart-outline'}`}
                            // onClick={handleLikeClick}
                        />
                    {/* <span>{likesCount}</span> */}
                    <span>0</span>
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
    )
};

export default CardFooter;
