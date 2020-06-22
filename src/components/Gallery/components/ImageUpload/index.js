import React, { useEffect, useRef, useState } from 'react';
import Loading from 'components/Loading';
import Button from 'components/Button';
import Alert from 'components/Alert';
import { Request } from "utils/request";
import './styles.scss';

const ImageUpload = ({ callback }) => {

    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const PromiseRequest = payload => new Promise((res, rej) => Request(payload, res, rej));
    const inputRef = useRef(null);
    const callInputChange = () => inputRef.current.click();

    const onInputChange = e => {
        let files = [...e.target.files];
        setFiles(files);
        setPreviews(files.map(f => {
            return { name: f.name, url: URL.createObjectURL(f) }
        }));
    };

    const uploadFile = (file) => {
        let data = new FormData();
        data.append('photo', file);
        data.append('caption', file.caption);
        data.append('album_id', 0);
        data.append('sorted_number', 0);

        return PromiseRequest({
            url: '/api/photogallery',
            method: "POST",
            data: data,
            isMultipart: true
        });
    };

    const onSubmit = () => {
        setLoading(true);
        Promise.all(files.map(f => uploadFile(f)))
            .then(data => {
                setShowAlert({
                    title: "Изображения загружены!",
                    autoclose: 1.5,
                    onOk: () => {
                        setShowAlert(false);
                        setLoading(false);
                        setFiles([]);
                        setPreviews([]);
                        callback && callback();
                    }
                });
                setLoading(false);
            })
            .catch(e => {
                handleError(e);
                setLoading(false);
            })
    };

    const handleError = e => {
        let errorText = e.response.data.errors
            ? Object.values(e.response.data.errors)
            : `${e.response.status} ${e.response.statusText}`;
        setShowAlert({
            title: `Ошибка: ${errorText}`,
            text: 'Попробуйте повторить попытку позже, либо воспользуйтесь формой обратной связи.',
            autoclose: 7.5,
            onOk: () => setShowAlert(false)
        });
    };

    const handleCaptionInput = ({ target }, name) => {
        let updatedFiles = [...files];
        updatedFiles.find(f => f.name === name).caption = target.value;
        setFiles([
            ...updatedFiles
        ]);
    };

    return (
        <div className="ImageUpload__wrap">
            <h4>Загрузка изображений</h4>
            <input
                style={{ display: 'none' }}
                ref={inputRef}
                onChange={onInputChange}
                type="file"
                multiple
                accept=".jpg,.png,.gif"
            />
            <div className="ImageUpload__preview">
                {previews.map(({ url, name }, index) => <div className="ImageUpload__preview-item" key={index}>
                    <div alt="" style={{ backgroundImage: `url(${url})` }} />
                    <input onChange={(e) => handleCaptionInput(e, name)} placeholder="Введите название" />
                </div>)}
            </div>
            <div className="ImageUpload__controls">
                <Button disabled={loading} onClick={callInputChange}>Обзор</Button>
                {!!files.length && <Button primary disabled={loading} onClick={onSubmit}>Загрузить </Button>}
                {loading && <Loading centered={false} inline={true} />}
                {showAlert && <Alert {...showAlert} />}
            </div>
        </div>
    )
}

export default ImageUpload;