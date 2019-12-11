import React from 'react';
import './SocialLink.scss';

export default function SocialLink({ description, site }) {
    return (
        <div className="SocialLink">
            <div className="SocialLink__description"><a href={site} className="link" target="_blank" rel="noopener noreferrer">{description}</a></div>
        </div>
    );
}
