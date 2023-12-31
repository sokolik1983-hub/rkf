import React from 'react';
import ClubSocial from '../ClubSocial';
import ClubContacts from '../ClubContacts';
import EditPageButtons from '../EditPageButtons';
import Card from '../../../../components/Card';

const ClubContactsCard = ({
        handleSubmitForms,
        bindSubmitClubInfo,
        bindSubmitClubEmail,
        bindSubmitClubPhone,
        bindSubmitClubSocials,
}) => {

    return (
        <Card className="contacts">
            <h3>Контакты</h3>
            <ClubContacts
                bindSubmitClubEmail={bindSubmitClubEmail}
                bindSubmitClubPhone={bindSubmitClubPhone}
                bindSubmitClubInfo={bindSubmitClubInfo}
            />
            <ClubSocial
                bindSubmitForm={bindSubmitClubSocials}
            />
            <EditPageButtons
                handleSubmitForms={handleSubmitForms}
            />
        </Card>
    );
};

export default ClubContactsCard;
