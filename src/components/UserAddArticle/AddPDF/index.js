import React, {useState} from "react";
import "./index.scss";


const AddPDF = ({documents, setDocuments, closeModal}) => {
    const [pdfArray, setPdfArray] = useState(documents.length ? documents : [{
        name: '',
        file: '',
        errorName: '',
        errorFile: ''
    }]);

    const handleChangeName = (e, index) => {
        const newPdfArray = [...pdfArray];
        newPdfArray[index].name = e.target.value;

        if(e.target.value) {
            newPdfArray[index].errorName = '';
        } else {
            newPdfArray[index].errorName = 'Укажите название файла';
        }

        setPdfArray(newPdfArray);
    };
    
    const handleChangeFile = (e, index) => {
        const newPdfArray = [...pdfArray];

        const file = e.target.files[0];
        newPdfArray[index].file = file;

        if(file) {
            if(file.size > 20971520) newPdfArray[index].errorFile = 'Файл не должен превышать 20 мб';
            newPdfArray[index].errorFile = '';
        } else {
            newPdfArray[index].errorFile = 'Загрузите файл';
        }

        setPdfArray(newPdfArray);
    };

    const handleDeleteRow = index => {
        if(window.confirm('Вы действительно хотите удалить эту строку?')) {
            setPdfArray([...pdfArray].filter((item, i) => i !== index));
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        e.stopPropagation();

        const newPdfArray = [...pdfArray];
        let valid = !!newPdfArray.length;

        newPdfArray.map(item => {
            if(!item.name) {
                item.errorName = 'Укажите название файла';
                valid = false;
            }
            if(!item.file) {
                item.errorFile = 'Загрузите файл';
                valid = false;
            }

            return item;
        });

        if(!valid) {
            setPdfArray(newPdfArray);
        } else {
            setDocuments(newPdfArray.map(item => ({name: item.name, file: item.file})));
            closeModal();
        }
    };

    return (
        <div className="add-pdf">
            <form className="add-pdf__form" onSubmit={handleSubmit}>
                {pdfArray.map((item, index) =>
                    <div className="add-pdf__form-row" key={index}>
                        <div className="add-pdf__form-item">
                            <label className="add-pdf__form-label">Название файла</label>
                            <input
                                type="text"
                                placeholder="Название файла"
                                className={`add-pdf__form-input${item.errorName ? ' _error' : ''}`}
                                value={item.name}
                                onChange={e => handleChangeName(e, index)}
                            />
                            {item.errorName && <p className="add-pdf__form-error">{item.errorName}</p>}
                        </div>
                        <div className="add-pdf__form-item">
                            <span className="add-pdf__form-label">Файл PDF</span>
                            <label
                                htmlFor={`file-${index}`}
                                className={item.file ? 'add-pdf__form-attached' : 'btn btn-primary'}
                            >
                                {item.file ? `Загружено: ${item.file.name}` : 'Загрузить'}
                            </label>
                            <input
                                id={`file-${index}`}
                                type="file"
                                accept=".pdf"
                                className="add-pdf__form-hidden"
                                onChange={e => handleChangeFile(e, index)}
                            />
                            {item.errorFile && <p className="add-pdf__form-error">{item.errorFile}</p>}
                        </div>
                        <button
                            type="button"
                            className="add-pdf__form-delete"
                            title="Удалить"
                            onClick={() => handleDeleteRow(index)}
                        />
                    </div>
                )}
                {pdfArray.length < 3 &&
                    <div className="add-pdf__form-add-row">
                        <button 
                            type="button"
                            className="add-pdf__form-add-row-btn"
                            onClick={() => setPdfArray([...pdfArray, {
                                name: '',
                                file: '',
                                errorName: '',
                                errorFile: ''
                            }])}
                        >Добавить ещё</button>
                    </div>
                }
                <div className="add-pdf__form-controls">
                    <button type="button" className="btn btn-simple" onClick={closeModal}>Отмена</button>
                    <button type="submit" className="btn btn-primary" disabled={!pdfArray.length}>Добавить</button>
                </div>
            </form>
        </div>
    )
};

export default React.memo(AddPDF);