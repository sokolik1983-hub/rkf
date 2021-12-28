import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layouts';

import './index.scss';


const MetricsDocPage = () => {
    const url = window.location.href.match(/\w+/g);
    const id = url[url.length-1]
    const isMobileDeviseType = !!navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i);

    const [docUrl, setDocUrl] = useState('');

    useEffect(() => {
        fetchDoc(id);
    }, [])

    const fetchDoc = (id) => {
        fetch(`/api/shared/document/puppy_card?id=${id}`)
            .then(res => res.blob())
            .then(data => URL.createObjectURL(data))
            .then(url => {
                setDocUrl(url);
            })
    }


    return (
        <Layout>
            <div className="metrics-doc-page">
                <div className="metrics-doc-page__content">
                    <div className="metrics-doc-page__iframe-wrap">
                        {
                            !isMobileDeviseType ?
                                <iframe className="metrics-doc-page__iframe"
                                        src={ docUrl }
                                        title="metrics_document"
                                        allow="fullscreen"
                                        scrolling="yes"
                                >
                                    Ваш браузер не поддерживает фреймы
                                </iframe> :
                                <div className="metrics-doc-page__link-wrap">
                                    <a
                                        className="metrics-doc-page__link"
                                        href={ docUrl }
                                    >
                                        ссыль
                                    </a>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default MetricsDocPage;