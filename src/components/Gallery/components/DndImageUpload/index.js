import React, { useEffect, useState, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import Loading from 'components/Loading'
import Button from 'components/Button'
import Alert from 'components/Alert'
import { Request } from "utils/request"
import './styles.scss'

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#f5f8ff',
    color: '#72839C',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    textAlign: 'center',
    minHeight: '230px',
    maxHeight: '230px'
};

const activeStyle = {
    borderColor: '#3366ff'
};

const DndImageUpload = ({ callback, album_id }) => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const PromiseRequest = payload => new Promise((res, rej) => Request(payload, res, rej));

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: '.jpg, .jpeg, .png',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {})
    }), [
        isDragActive
    ]);

    const handleCaptionInput = ({ target }, name) => {
        let updatedFiles = [...files];
        updatedFiles.find(f => f.name === name).caption = target.value;
        setFiles([
            ...updatedFiles
        ]);
    };

    const uploadFile = (file) => {
        const url = album_id
            ? `/api/photogallery?album_id=${album_id}`
            : '/api/photogallery';
        let data = new FormData();
        data.append('photo', file);
        data.append('caption', file.caption || '');
        data.append('album_id', album_id ? album_id : 0);
        data.append('sorted_number', 0);
        return PromiseRequest({
            url: url,
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
                    }
                });
                setLoading(false);
                callback && callback();
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

    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <section className="DndImageUpload__wrap">
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <div>
                    <img src="/static/icons/camera.svg" alt="" /><br />
                    <h3>Загрузка изображений</h3>
                    Перетащите файлы в эту область<br />
                    Поддерживаемые форматы: JPG, JPEG, PNG
                </div>
            </div>
            <div className="DndImageUpload__preview">
                {
                    files.map(file => (
                        <div key={file.name} className="DndImageUpload__preview-item">
                            <div alt="" style={{ backgroundImage: `url(${file.preview})` }} />
                            <input onChange={(e) => handleCaptionInput(e, file.name)} placeholder="Введите название" />
                        </div>
                    ))
                }
            </div>
            <div className="DndImageUpload__controls">
                {!!files.length && <Button primary disabled={loading} onClick={onSubmit}>Загрузить {loading && <Loading centered={false} inline={true} />}</Button>}
                {showAlert && <Alert {...showAlert} />}
            </div>
        </section>
    );
}

export default DndImageUpload;