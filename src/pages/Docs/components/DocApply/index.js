import React, { useState } from "react";
import ls from "local-storage";
import { Redirect, useParams } from "react-router-dom";
import Alert from "components/Alert";
import Button from "components/Button";
import PedigreeHeader from "./forms/PedigreeHeader";
import PedigreeTable from "./forms/PedigreeTable";
import PedigreePayment from "./forms/PedigreePayment";
import PedigreeDeclarant from "./forms/PedigreeDeclarant";
import LitterHeader from "./forms/LitterHeader";
import LitterTable from "./forms/LitterTable";
import LitterPayment from "./forms/LitterPayment";
import LitterDeclarant from "./forms/LitterDeclarant";
import StageStrip from "./components/StageStrip";
import DocHead from "../DocHead";
import Modal from "../../../../components/Modal";
import FeedBack from "./components/Feedback";
import { blockContent } from "../../../../utils/blockContent";

import './index.scss';

const forms = {
    pedigree: {
        header: PedigreeHeader,
        table: PedigreeTable,
        payment: PedigreePayment,
        declarant: PedigreeDeclarant
    },
    litter: {
        header: LitterHeader,
        table: LitterTable,
        payment: LitterPayment,
        declarant: LitterDeclarant
    }
}

const DocApply = ({ clubAlias, history }) => {
    const alias = clubAlias;
    let distinction;
    const profileId = ls.get('profile_id') ? ls.get('profile_id') : '';

    const [okAlert, setOkAlert] = useState(false);
    const [errAlert, setErrAlert] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [showModal, setShowModal] = useState('');
    const [id, setId] = useState(undefined);
    const [stage, setStage] = useState(0);

    let update = false, view = false;

    const stages = {
        header: 0,
        table: 1,
        declarant: 1,
        payment: 2
    }
    let url_stage;//, action;
    if (history) {
        let params = useParams();
        distinction = params.distinction || "pedigree";
        params.id && id !== params.id && setId(params.id);
        //action = params.action || "form";
        url_stage = params.stage || "header";
        url_stage && stages[url_stage] && stage !== stages[url_stage] && setStage(stages[url_stage]);
    } else (setRedirect('/404'))

    const FormContent = (forms[distinction] || forms.pedigree)[url_stage] || forms.pedigree.header;

    const closeModal = () => {
        setShowModal(false);
        blockContent(false);
    };

    const Title = props => <><div>
        <DocHead text={distinction === "pedigree" ? "Регистрация заявления на оформление родословной" : "Оформление заявления на регистрацию помёта"} link={`/${alias}/documents`} history={history}/>
            </div>
            <StageStrip items={[
                {
                    icon: 'pen-opaque',
                    text: 'Основная информация'
                },
                {
                    icon: 'pen-opaque',
                    text: 'Заявки'
                },
                {
                    icon: 'pen-opaque',
                    text: 'Информация об оплате'
                }
            ]} active={stage}/></>


    return <div className={`documents-page__info DocApply ${errAlert ? 'view' : ''}`}>
        {redirect && <Redirect push to={redirect}/>}
        {errAlert &&
            <Alert
                title="Ошибка отправки"
                text={`Пожалуйста, проверьте правильность заполнения всех полей`}
                autoclose={2.5}
                onOk={() => setErrAlert(false)}
            />
        }
        <div className="documents-page__right">
            <FormContent
                {...{alias, id, profileId, Title, update, view}}
            />
            <div className="documents-page__feedback">
                <Button className="btn-condensed"
                        onClick={() => setShowModal(true)}
                >Сообщить о ошибке</Button>
                <span className="hidden-item"> </span>
                {showModal &&
                    <Modal
                        showModal={showModal}
                        handleClose={closeModal}
                        outsideClickHandler={() => setShowModal(false)}
                        className={`stage-controls__modal`}
                        headerName="Сообщить о ошибке"
                    >
                        <FeedBack
                            setShowModal={setShowModal}
                            setOkAlert={setOkAlert}
                            setErrAlert={setErrAlert}
                            blockContent={blockContent}
                        />
                    </Modal>
                }
                {okAlert &&
                    <Alert
                        title="Заявка отправлена"
                        text="Ваша заявка отправлена"
                        autoclose={2.5}
                        okButton={true}
                        onOk={() => setOkAlert(false)}
                    />
                }
                {/*{errAlert &&*/}
                {/*    <Alert*/}
                {/*        title="Ошибка отправки"*/}
                {/*        text={`Пожалуйста, проверьте правильность заполнения всех полей`}*/}
                {/*        autoclose={2.5}*/}
                {/*        onOk={() => setErrAlert(false)}*/}
                {/*    />*/}
                {/*}*/}
            </div>
        </div>
    </div>
};

export default DocApply;
