import React, { useState } from 'react';
import Card from "components/Card";
import { Request } from "utils/request";
import './styles.scss';

const endpoints = {
    finalReport: '/api/exhibitions/report/exhibition_result/FinalReport/import_file',
    mainRingStatement: '/api/exhibitions/report/exhibition_result/StatementMainRing/import_file',
    judgeLoadReport: '/api/exhibitions/report/exhibition_result/JudgesLoad/import_file'
};

const ImportReport = ({ type, rankId, handleImport }) => {
    const [importFile, setImportFile] = useState(null);

    const handleSubmit = e => {
        e.preventDefault();
        const data = new FormData();
        data.append('rank_id', rankId);
        data.append('file', importFile);
        Request({
            url: endpoints[type],
            method: 'POST',
            data: data,
            isMultipart: true
        }, data => {
            alert('Файл успешно импортирован');
            handleImport(data, true);
        }, error => {
            alert('Ошибка импорта');
        })
    };

    return <Card className="import-report">
        <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h4>
        <form onSubmit={handleSubmit}>
            <div>
                <input type="file" accept=".xlsx" onChange={e => setImportFile(e.target.files[0])} />
                <a href="/">Скачать образец</a>
            </div>
            {importFile && <button type="submit">Импорт</button>}
        </form>
    </Card>
};

export default ImportReport;