import React, { useEffect, useState } from "react";
import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import { Request } from "../../utils/request";
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import "./index.scss";


const PedigreeViewer = ({url = 'http://pedigreeapi.rkf24.ru:5555/pedigree/NzU0ODM5Nzgy'}) => {

    return <Layout>
        <div className="pedigree-viewer">
            <iframe src={url}
                 title="просмотр документа">Ваш браузер не поддерживает фреймы</iframe>
        </div>
    </Layout>
};

export default React.memo(PedigreeViewer);