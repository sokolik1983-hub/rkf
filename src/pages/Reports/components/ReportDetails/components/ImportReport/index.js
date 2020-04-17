import React, { useState, useEffect } from 'react';
import Card from "components/Card";
import { Request } from "utils/request";
import './styles.scss';

const importEndpoints = {
    finalReport: '/api/exhibitions/report/exhibition_result/FinalReport/import_file',
    mainRingStatement: '/api/exhibitions/report/exhibition_result/StatementMainRing/import_file',
    judgeLoadReport: '/api/exhibitions/report/exhibition_result/JudgesLoad/import_file'
};

const exampleEndpoints = {
    finalReport: '/api/exhibitions/report/exhibition_result/FinalReport/get_excel_file',
    mainRingStatement: '/api/exhibitions/report/exhibition_result/StatementMainRing/get_excel_file',
    judgeLoadReport: '/api/exhibitions/report/exhibition_result/JudgesLoad/get_excel_file'
};

const ImportReport = ({ type, rankId, handleImport }) => {
    const [importFile, setImportFile] = useState(null);
    const [exampleFile, setExampleFile] = useState(null);

    useEffect(() => {
        fetch(exampleEndpoints[type], { method: 'GET' })
            .then(response => response.blob())
            .then(blob => {
                setExampleFile(window.URL.createObjectURL(blob))
            });
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        const data = new FormData();
        data.append('rank_id', rankId);
        data.append('file', importFile);
        Request({
            url: importEndpoints[type],
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
        <h4>Дорогие друзья! <br />Во избежание возникновения ошибок при загрузке отчетов из файла excel просим Вас пользоваться формой RKF.Online.</h4>
        <form onSubmit={handleSubmit}>
            <span>Прикрепите файл (XLSX)</span>
            <div>
                <input type="file" accept=".xlsx" onChange={e => setImportFile(e.target.files[0])} />

                <a href={exampleFile} download="example.xlsx">Скачать образец</a>
            </div>
            {importFile && <button type="submit">Импорт</button>}
        </form>
    </Card>
};

export default ImportReport;