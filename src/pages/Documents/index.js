import React, { useEffect, useState } from "react";
import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import { Request } from "../../utils/request";
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import "./index.scss";


const DocumentsPage = ({ history, match }) => {
    const [loading, setLoading] = useState(true);
    const [documentLoaded, setDocumentLoaded] = useState(false);
    const [link, setLink] = useState('');
    const documentId = match.params.id;

    useEffect(() => {
        if (documentLoaded) {
            const viewer = document.getElementsByClassName('viewer-layout-main')[0];
            const removeDnd = (e) => {
                e.preventDefault();
                e.stopPropagation();
            };
            viewer.addEventListener('dragover', removeDnd, false);
            viewer.addEventListener('drop', removeDnd, false);
            return () => {
                viewer.removeEventListener('dragover', removeDnd);
                viewer.removeEventListener('drop', removeDnd);
            }
        }
    }, [documentLoaded]);

    useEffect(() => {
        (() => Request({
            url: `/api/document/document/public?id=${documentId}`
        }, data => {
            console.log('data', data);
            setLink(data);
            setLoading(false);
        }, error => {
            console.log(error.response);
            history.replace('/404');
        }))();
    }, [documentId]);

    return loading ?
        <Loading /> :
        <Layout>
            <div className="document-page">
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.min.js">
                    <Viewer fileUrl={link} onDocumentLoad={() => setDocumentLoaded(true)} />
                </Worker>
            </div>
        </Layout>
};

export default React.memo(DocumentsPage);