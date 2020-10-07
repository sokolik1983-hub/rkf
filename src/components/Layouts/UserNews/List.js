import React from "react";
import CardNews from "../../CardNews";


const List = ({list, className, isFullDate = true, removable, onAdClose, onDelete}) => (
    <div className={`list${className ? ' ' + className : ''}`}>
        <ul className="list__content">
            {list && !!list.length && list.map(item =>
                <li className="list__item" key={item.id}>
                    <CardNews
                        user={item.user_type}
                        id={item.id}
                        name={item.name}
                        city={item.fact_city_name}
                        date={item.create_date}
                        isFullDate={isFullDate}
                        small_photo={item.picture_short_link}
                        photo={item.picture_link}
                        text={item.content}
                        url={`/news/${item.id}`}
                        alias={item.alias}
                        removable={removable}
                        isAd={item.is_advert}
                        adBreedName={item.advert_breed_name}
                        adCode={item.advert_code}
                        adPrice={item.advert_cost}
                        adAmount={item.advert_number_of_puppies}
                        adCategory={item.advert_type_name}
                        videoLink={item.video_link}
                        isClosedAd={item.is_closed_advert}
                        onAdClose={onAdClose}
                        onDelete={onDelete}
                        logo_link={item.logo_link}
                    />
                </li>
            )}
        </ul>
    </div>
);

export default React.memo(List);