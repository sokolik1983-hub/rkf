import React from "react";
import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import Layout from "../../components/Layouts";
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import "./index.scss";


const PedigreeViewer = ({ history, match }) => {

    return <Layout>
            <div className="document-page">
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.min.js">
                    <Viewer fileUrl={`http://pedigreeapi.rkf24.ru:5555/pedigree/NzU0ODM5Nzgy`} />
                </Worker>
            </div>
        </Layout>
};

export default React.memo(PedigreeViewer);