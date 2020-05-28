import React, {useEffect, useState, useRef} from "react";
import {Link} from "react-router-dom";
import Loading from "components/Loading";
import Modal from "components/Modal";
import Card from "components/Card";
import HideIf from "components/HideIf";
import {Request} from "utils/request";
import "./index.scss";

const feds = {
    "РФСС": {
        request: 29514,
        receive: 29515
    },
    "РФЛС": {
        request: 29516,
        receive: 29517
    },
    "РФОС": {
        request: 29518,
        receive: 29519
    },
    "ОАНКОО/Фауна": {
        request: 29520,
        receive: 29521
    },
    "ОАНКОО/РКК": {
        request: 29525,
        receive: 29526
    },
    "ОАНКОО/Элита": {
        request: 29523,
        receive: 29524
    }
}

const Bookform = ({history, clubAlias, distinction}) => {
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [federation, setFederation] = useState(null);

    const ref = useRef();

    useEffect(() => {
        (() => Request({
            url: '/api/Club/club_federation'
        },
        data => {
            data && data.short_name && feds[data.short_name] && setFederation(feds[data.short_name]);
            setLoading(false);
        },
        error => {
            console.log(error.response);
            setLoading(false);
        }))();
    }, []);

    return (<HideIf cond={loading || !federation }>
        <Link to={`/${clubAlias}/documents`} onClick={e => {setShowModal('request');e.preventDefault();}}>Запись на сдачу документов</Link><br/>
        <Link to={`/${clubAlias}/documents`} onClick={e => {setShowModal('receive');e.preventDefault();}}>Запись на получение документов</Link>
        <Modal showModal={showModal} handleClose={() => setShowModal(false)}>
            {!loading ? <div ref={ref}>
                <HideIf cond={showModal !== 'request'}>
                    <iframe src={`https://widget.bookform.ru/${federation.request}/`}/>
                </HideIf>
                <HideIf cond={showModal !== 'receive'}>
                    <iframe src={`https://widget.bookform.ru/${federation.receive}/`}/>
                </HideIf>
            </div>
            : <Loading/>}
        </Modal>
    </HideIf>)
};

export default React.memo(Bookform);
