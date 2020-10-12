import React, {useState} from "react";
import "./index.scss";


const AddPDF = ({closeModal}) => {
    const [pdfArray, setPdfArray] = useState([{
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
            newPdfArray[index].errorName = 'Поле не может быть пустым';
        }

        setPdfArray(newPdfArray);
    };
    
    const handleChangeFile = (e, index) => {
        const newPdfArray = [...pdfArray];

        const file = e.target.files[0];

        console.log(file);

        if(file) {
            newPdfArray[index].file = file;
            newPdfArray[index].errorFile = '';
        } else {
            newPdfArray[index].errorFile = 'Поле не может быть пустым';
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
        console.log('pdfArray', pdfArray);
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
                    <button type="submit" className="btn btn-primary">Добавить</button>
                </div>
            </form>
        </div>
    )
};

export default React.memo(AddPDF);