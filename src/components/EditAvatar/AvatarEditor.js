import React, { memo, useRef, useState } from "react";
import Dropzone from "react-dropzone";
import AvatarEditor from "react-avatar-editor";
import { Slider } from "@material-ui/core";
import { Button } from '@progress/kendo-react-buttons';
import LightTooltip from "../LightTooltip";
import { Request } from "../../utils/request";
import Alert from "../Alert";
import ls from "local-storage";
import "./index.scss";


const CustomAvatarEditor = ({ avatar, setModalType, userType, onSubmitSuccess }) => {
    const [image, setImage] = useState(avatar || '');
    const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);
    const [editorErrors, setEditorErrors] = useState([]);
    const editor = useRef(null);
    const UPLOAD_AVATAR = `/static/icons/default/user-avatar-upload.svg`;

    const handleSubmit = () => {
        Request({
            url: '/api/avatar/full_v3',
            method: 'POST',
            data: {
                data: editor.current.getImageScaledToCanvas().toDataURL('image/jpeg', 1)
            }
        }, data => {
            if (data) {
                userType === 'club' && onSubmitSuccess({ image_link: data });
                ls.set('user_info', { ...ls.get('user_info'), logo_link: data });
                setModalType('');
                window.location.reload();
            }
        },
            error => {
                console.log(error);
            }
        )
    };

    const handleError = () => {
        setEditorErrors([
            ...editorErrors,
            'Ошибка: Формат файла не поддерживается, либо размер файла превышает 5Мб'
        ]);
    };

    return (
        <div className="avatar-editor">
            <div className="avatar-editor__dropzone">
                <Dropzone
                    accept={['.jpg', '.jpeg']}
                    maxSize={5242880} //5MB
                    noClick
                    multiple={false}
                    onDrop={acceptedFiles => setImage(acceptedFiles[0])}
                    onDropRejected={handleError}
                >
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                            <AvatarEditor
                                ref={editor}
                                scale={parseFloat(scale)}
                                width={332}
                                height={332}
                                position={position}
                                onPositionChange={pos => setPosition(pos)}
                                rotate={parseFloat(rotate)}
                                borderRadius={166}
                                image={image}
                                className="avatar-editor__canvas"
                                style={image ? {} : { background: `url(${UPLOAD_AVATAR}) no-repeat center / cover` }}
                            />
                            <div className="avatar-editor__add-file">
                                <label htmlFor="avatar" className="avatar-editor__add-label">
                                    <LightTooltip title="Добавить файл">
                                        <span className="k-icon k-i-plus"></span>
                                    </LightTooltip>
                                </label>
                                <input
                                    name="avatar"
                                    id="avatar"
                                    className="avatar-editor__add-input"
                                    type="file"
                                    onChange={e => setImage(e.target.files[0])}
                                    {...getInputProps()}
                                />
                            </div>
                        </div>
                    )}
                </Dropzone>
            </div>
            <div className="avatar-editor__controls">
                <LightTooltip title="Масштабировать">
                    <Slider
                        className="avatar-editor__scale-bar"
                        min={1}
                        max={2}
                        step={0.01}
                        value={scale}
                        onChange={(e, newValue) => setScale(newValue)}
                    />
                </LightTooltip>
                <LightTooltip title="Повернуть">
                    <button className="avatar-editor__btn" onClick={() => setRotate(rotate - 90)}>
                        <span className="k-icon k-i-reset"></span>
                    </button>
                </LightTooltip>
                <LightTooltip title="Повернуть">
                    <button className="avatar-editor__btn" onClick={() => setRotate(rotate + 90)}>
                        <span className="k-icon k-i-reload"></span>
                    </button>
                </LightTooltip>
            </div>
            <Button
                className="k-button k-primary avatar-editor__submit"
                variant="contained"
                type="button"
                disabled={!image}
                onClick={handleSubmit}
            >
                Сохранить
            </Button>
            {!!editorErrors.length &&
                <Alert
                    text="Ошибка: Формат файла не поддерживается, либо размер файла превышает 5Мб. Поддерживаемые форматы JPG, JPEG."
                    okButton={true}
                    onOk={() => setEditorErrors([])}
                />
            }
        </div>
    )
};

export default memo(CustomAvatarEditor);