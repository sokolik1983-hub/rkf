import React, {useEffect, useState} from 'react';
import ClubInfo from '../ClubInfo';
import ClubDocuments from '../ClubDocuments';
import EditPageButtons from '../EditPageButtons';
import Card from '../../../../components/Card';
import {withRouter} from "react-router-dom";
import ClubForm from "../ClubForm/ClubForm";
import {Request} from "../../../../utils/request";
import {useSelector} from "react-redux";


const ClubMain = ({
        club_alias,
        is_federation,
        handleSubmitForms,
        bindSubmitClubInfo,
        bindSubmitClubAlias,
        bindSubmitClubDocuments,
        history
}) => {
    const [documents, setDocuments] = useState([]);
    const [success, setSuccess] = useState(false);
    const PromiseRequest = url => new Promise((res, rej) => Request({ url }, res, rej));
    const clubId = useSelector(state => state.authentication.profile_id)

    const handleSuccess = (message) => {
        setSuccess({ status: true, message: message });
        !success && setTimeout(() => {
            setSuccess(false);
        }, 3000);
    };

    const getDocuments = (withSuccess) => PromiseRequest(`/api/document/document/private_list?profileId=${clubId}`)
        .then(data => {
            if (data) {
                setDocuments(data);
                withSuccess && handleSuccess();
            }
        });

    useEffect(() => {
        getDocuments();
    }, []);

    console.log('documents', documents);

    return (
        <Card className="MainInfo">
            <h3>Основная информация</h3>
            <ClubInfo
                bindSubmitClubAlias={bindSubmitClubAlias}
                bindSubmitClubInfo={bindSubmitClubInfo}
                isFederation={is_federation}
                club_alias={club_alias}
            />
            <ClubDocuments
                bindSubmitForm={bindSubmitClubDocuments}
            />
            <EditPageButtons
                handleSubmitForms={handleSubmitForms}
            />
                <ClubForm
                    clubAlias={club_alias}
                    history={history}
                    status="edit"
                    isEditPage
                />
        </Card>
    );
};

export default withRouter(ClubMain);
