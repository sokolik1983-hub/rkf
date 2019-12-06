import React from 'react';
import Card from 'components/Card';
import { connectClubDescription } from 'apps/HomePage/connectors';
import './styles.scss';

function ClubDescription({ description }) {
    return (
        description
            ? <Card className="ClubDescription">
                <h4 className="text-upper">Описание</h4>
                {description}
            </Card>
            : null
    )
};

export default connectClubDescription(ClubDescription);