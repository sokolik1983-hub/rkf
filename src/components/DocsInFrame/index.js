import React, {useEffect, useState} from "react";
import Viewer, {Worker} from '@phuocng/react-pdf-viewer';
import Loading from "../../components/Loading";
import {Request} from "../../utils/request";
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import "./index.scss";


const DocsInFrame = ({...fedDetails}) => {
    const [loading, setLoading] = useState(true);
    const [link, setLink] = useState('');

    const documentId = fedDetails.fedDetails;

    useEffect(() => {
        if (documentId) {
            (() => Request({
                url: `/api/document/document/public?id=${documentId}`
            }, data => {
                setLink(data);
                setLoading(false);
            }, error => {
                console.log(error.response);
                // history.replace('/404');
            }))();
        }
    }, [documentId]);

    return loading ?
        <Loading/> :
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.min.js">
            <div className="details-viewer container">
                <Viewer fileUrl={link}/>
            </div>
        </Worker>
};

export default React.memo(DocsInFrame);