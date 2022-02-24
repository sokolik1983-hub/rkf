import React, {useEffect, useState} from 'react';
import ClubInfo from '../ClubInfo';
import ClubDocuments from '../ClubDocuments';
import EditPageButtons from '../EditPageButtons';
import Card from '../../../../components/Card';
import {withRouter} from "react-router-dom";
import ClubForm from "../ClubForm/ClubForm";
import {Request} from "../../../../utils/request";
import {useSelector} from "react-redux";
import DocItem from "../ClubForm/components/DocItem/DocItem";
import {blockContent} from "../../../../utils/blockContent";
import ModalDeleteDocument from "../../../../components/UploadedDocuments/components/ModalDeleteDocument";
import Loading from "../../../../components/Loading";


const ClubMain = ({
        club_alias,
        is_federation,
        handleSubmitForms,
        bindSubmitClubInfo,
        bindSubmitClubAlias,
        bindSubmitClubDocuments,
        history
}) => {
    const [loaded, setLoaded] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const [modal, setModal] = useState({});
    const PromiseRequest = url => new Promise((res, rej) => Request({ url }, res, rej));
    const clubId = useSelector(state => state.authentication.profile_id);

    const handleSuccess = (message) => {
        setSuccess({ status: true, message: message });
        !success && setTimeout(() => {
            setSuccess(false);
        }, 3000);
    };

    const getDocuments = (withSuccess) => PromiseRequest(`/api/document/document/private_list?profileId=${clubId}`)
        .then(data => {
            setLoaded(false);
            if (data) {
                setDocuments(data);
                setLoaded(true);
                withSuccess && handleSuccess();
            }
        });

    const handleError = e => {
        if (e.response) {
            let message;
            if (e.response.data) {
                message = e.response.data.errors
                    ? Object.values(e.response.data.errors)
                    : `${e.response.status} ${e.response.statusText}`;
            } else if (e.response.errors) {
                message = e.response.errors
                    ? Object.values(e.response.errors)
                    : `${e.response.status} ${e.response.statusText}`;
            } else {
                message = 'Произошла ошибка';
            }
            setErrorMessage(message);
            setError(true);
            !error && setTimeout(() => {
                setError(false);
            }, 5000);
        }
    };

    const closeModal = () => {
        setModal({});
        blockContent(false)
    };

    useEffect(() => {
        getDocuments();
    }, []);

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
            <div className="MainInfo__private-docs-wrap">
                <h3>Ваши приватные документы</h3>
                {
                    loaded
                    ?
                        documents?.length > 0
                            ?
                            documents.map(item => <DocItem key={item.id} id={item.id} name={item.name} link={item.link} date_create={item.date_create} setModal={setModal} />)
                            :
                            <h3 className="MainInfo__empty-h3">Вы не загрузили ни одного документа</h3>
                    :
                        <Loading centered={false} />
                }

            </div>
            <ClubForm
                clubAlias={club_alias}
                history={history}
                status="edit"
                getDocuments={getDocuments}
            />
            {
                modal.type === 'deleteDocument' &&
                <ModalDeleteDocument handleError={handleError}
                                     handleSuccess={handleSuccess}
                                     getDocuments={getDocuments}
                                     documentId={modal.documentId}
                                     closeModal={closeModal}
                                     isEditPage
                />
            }

        </Card>
    );
};

export default withRouter(ClubMain);
