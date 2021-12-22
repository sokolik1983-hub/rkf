import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layouts';

import './index.scss';


const MetricsDocPage = () => {

    // const id = window.location.href.split('/shared/document/puppycard/');
    const url = window.location.href.match(/\w+/g);
    const id = url[url.length-1]

    const [docUrl, setDocUrl] = useState('');
    console.log('id', id)

    // /shared/document/puppycard/MQAzADQA

    useEffect(() => {
        fetchDoc(id);
    }, [])

    const fetchDoc = (id) => {
        fetch(`api/shared/document/puppy_card?id=${id}`)
            .then(res => res.blob())
            .then(data => URL.createObjectURL(data))
            .then(url => {
                console.log('url', url);
                setDocUrl(url);
            })
    }

    return (
        <Layout>
            <div className="metrics-doc-page">
                <div className="metrics-doc-page__content">
                    <h2 className="metrics-doc-page__heading">
                        Неведомая хрень
                    </h2>

                    <div className="metrics-doc-page__iframe-wrap">
                        <iframe className="metrics-doc-page__iframe"
                                src={ docUrl }
                                src='/'
                                // src='blob:http://localhost:3000/3f880cc8-f871-48a5-9738-0da7a9ba89af'
                                frameborder="0">
                        </iframe>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default MetricsDocPage;