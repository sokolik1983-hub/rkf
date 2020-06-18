import React, { useEffect, useRef, useState } from 'react';
import Loading from 'components/Loading';
import Button from 'components/Button';
import Alert from 'components/Alert';
import './styles.scss';

const ImageUpload = () => {
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const inputRef = useRef(null);

    useEffect(() => {
        setPreviews(files.map(f => URL.createObjectURL(f)));
    }, [files]);

    const onFileAttachment = () => inputRef.current.click();
    const onInputChange = e => setFiles([...e.target.files]);

    const onSubmit = () => {
        console.log(files);
        setShowAlert({
            title: "Изображения загружены!",
            autoclose: 1.5,
            onOk: () => {
                setShowAlert(false);
                setLoading(false);
            }
        });
        setLoading(true);
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
                {previews.map((url, index) => <div key={index} className="ImageUpload__preview-item" alt="" style={{ backgroundImage: `url(${url})` }} />)}
            </div>
            <div className="ImageUpload__controls">
                <Button disabled={loading} onClick={onFileAttachment}>Обзор</Button>
                {!!files.length && <Button primary disabled={loading} onClick={onSubmit}>Загрузить </Button>}
                {loading && <Loading centered={false} inline={true} />}
                {showAlert && <Alert {...showAlert} />}
            </div>
        </div>
    )
}

export default ImageUpload;