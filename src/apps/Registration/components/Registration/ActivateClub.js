import React from 'react';
import ClubConfirm from './ClubConfirm';

const ActivateClub = ({ club }) => {
    return (
        <div className="ActivateClub">
            <h3>{club.name ? club.name : club.legal_name}</h3>
            <ClubConfirm club={club} />
        </div>
    )
};

export default ActivateClub;