import React from 'react';
import ClubInfo from '../ClubInfo';
import ClubDocuments from '../ClubDocuments';
import EditPageButtons from '../EditPageButtons';
import Card from '../../../../components/Card';

const ClubMain = ({
        is_federation,
        handleSubmitForms,
        bindSubmitClubInfo,
        bindSubmitClubAlias,
        bindSubmitClubDocuments,
}) => {

    return (
        <Card className="MainInfo">
            <h3>Основная информация</h3>
            <a className="support-link"
               href="https://help.rkf.online/ru/knowledge_base/art/54/cat/3/#/"
               target="_blank"
               rel="noopener noreferrer"
            >
                Инструкция по редактированию профиля
            </a>
            <ClubInfo
                bindSubmitClubAlias={bindSubmitClubAlias}
                bindSubmitClubInfo={bindSubmitClubInfo}
                isFederation={is_federation}
            />
            <ClubDocuments
                bindSubmitForm={bindSubmitClubDocuments}
            />
            <EditPageButtons
                handleSubmitForms={handleSubmitForms}
            />
        </Card>
    );
};

export default ClubMain;
