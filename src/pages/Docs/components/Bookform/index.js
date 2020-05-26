import React, {useEffect, useState, useRef} from "react";
import {Link} from "react-router-dom";
import Loading from "components/Loading";
import Modal from "components/Modal";
import Card from "components/Card";
import HideIf from "components/HideIf";
import {Request} from "utils/request";
import "./index.scss";

const feds = {
    rfss: '<script>(function (w,d,s,o,f,js,fjs){w["BookformObject"]=o;w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};js=d.createElement(s),fjs=d.getElementsByTagName(s)[0];js.id=o;js.src=f;js.async=1;fjs.parentNode.insertBefore(js,fjs);}(window,document,"script","Bookform","https://widget.bookform.ru/29440/js"));</script><div id="bookform-embedded-widget-29440"></div><script>Bookform("embedded",{id:29440});</script>'
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
            setFederation(data);
            setLoading(false);
        },
        error => {
            console.log(error.response);
            setLoading(false);
        }))();
    }, []);

    return (<>
        <Link to={`/${clubAlias}/documents`} onClick={e => {setShowModal('request');e.preventDefault();}}>Запись на сдачу документов</Link><br/>
        <Link to={`/${clubAlias}/documents`} onClick={e => {setShowModal('receive');e.preventDefault();}}>Запись на получение документов</Link>
        <Modal showModal={showModal} handleClose={() => setShowModal(false)}>
            {!loading ? <div ref={ref}>
                <HideIf cond={showModal !== 'request'}>
                    <iframe src={`https://widget.bookform.ru/29440/`}/>
                </HideIf>
                <HideIf cond={showModal !== 'receive'}>
                    <iframe src={`https://widget.bookform.ru/29218/`}/>
                </HideIf>
            </div>
            : <Loading/>}
        </Modal>
    </>)
};

export default React.memo(Bookform);
