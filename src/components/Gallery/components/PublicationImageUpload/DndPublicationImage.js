import React, { useEffect, useState, useMemo } from "react"
import { useDropzone } from "react-dropzone"
import Loading from "components/Loading"
import Button from "components/Button"
import Alert from "components/Alert"

import "./styles.scss"

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


const DndPublicationImage = ({loadPictures, setLoadPictures,oldPictures, closeModal}) => {

    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertImg, setShowAlertImg] = useState(false);

    const onSubmit = () => {
        setLoading(true);
        setLoadPictures(loadPictures.concat(files))
        setShowAlert({
            title: "Изображения загружены!",
                    autoclose: 1.5,
                    onOk: () => {
                        setShowAlert(false);
                        setLoading(false);
                        setFiles([]);
                        setLoading(false);
                        closeModal();
                    }}
        )
    };

    useEffect( () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    const { getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: '.jpg, .jpeg',
        maxSize: 20971520, // 20mb
        onDrop: (acceptedFiles, rejectedFiles) => {
            const mappedAcc = acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))
            setFiles(curr => [...curr, ...mappedAcc])
            if(rejectedFiles.length > 0) {
                setShowAlert({
                    text:"Ошибка: Формат файла не поддерживается, либо размер файла превышает 20Мб. Поддерживаемые форматы JPG, JPEG.",
                    okButton: true,
                    onOk:() => {
                        setShowAlert(false);
                    }
                });
            };

            if ((!!oldPictures ? (oldPictures?.length + loadPictures?.length + acceptedFiles?.length + files?.length) : (loadPictures?.length + acceptedFiles?.length + files?.length)) > 5) {
                setShowAlert({
                    text:"Ошибка: Нельзя загрузить больше 5 файлов",
                    okButton: true,
                    onOk:() => {
                        setLoadPictures([])
                        setShowAlert(false);
                    }
                })
            }
        }
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {})
    }), [
        isDragActive
    ]);

    return (
        <section className="DndImageUpload__wrap">
            <div
                {...getRootProps({ style })}
            >
                <input {...getInputProps()} />
                <div className="DndImageUpload__text">
                    <img src="/static/icons/camera.svg" alt="" />
                    <h3>Загрузка изображений</h3>
                    <p>Перетащите файлы в эту область</p>
                    <p>Поддерживаемые форматы: JPG и JPEG</p>
                </div>
            </div>
            <div className="DndImageUpload__preview">
                {
                    files.map(file => (
                        <div key={file.name} className="DndImageUpload__preview-item">
                            <div alt="" style={{ backgroundImage: `url(${file.preview})` }} />
                        </div>
                    ))
                }
            </div>
            <div className="DndImageUpload__controls">
                {!!files.length && <Button primary disabled={loading} onClick={onSubmit}>Загрузить {loading && <Loading centered={false} inline={true} />}</Button>}
                {showAlert && <Alert {...showAlert} />}
            </div>
            {showAlertImg &&
                <Alert
                    text="Ошибка: формат файла не поддерживается, либо размер файла превышает 5 Мб, поддерживаемые форматы JPEG,JPG."
                    okButton={true}
                    autoclose={3.5}
                    onOk={() => setShowAlertImg(false)}
                />
            }
        </section>
    );
}

export default DndPublicationImage;