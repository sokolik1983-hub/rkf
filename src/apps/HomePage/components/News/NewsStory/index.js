import React from 'react'
import classnames from 'classnames'
import {connectNewsStory} from 'apps/HomePage/connectors'


function NewsStory(props) {
    const {id, className, image, category, title} = props;
    return id ? (
        <div className={classnames("NewsStory", {[className]: className})}>

            <div style={{
                backgroundImage: image ? `url(${image})` : null
            }}
                 className="NewsStory__image"/>
            <div className="NewsStory__info">
                <div className="NewsStory__category">
                    {category}
                </div>
                <div className="NewsStory__title">
                    {title}
                </div>
            </div>

        </div>
    ) : null;
}

export default connectNewsStory(NewsStory)