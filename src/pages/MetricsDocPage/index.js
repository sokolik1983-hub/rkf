import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layouts';

import './index.scss';


const MetricsDocPage = () => {
    const url = window.location.href.match(/\w+/g);
    const id = url[url.length-1]

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
                        <iframe className="metrics-doc-page__iframe"
                                src={ docUrl }
                                title="metrics_document">
                        </iframe>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default MetricsDocPage;