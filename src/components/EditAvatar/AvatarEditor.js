import React, {memo, useRef, useState} from "react";
import {useSelector} from "react-redux";
import Dropzone from "react-dropzone";
import AvatarEditor from "react-avatar-editor";
import {Slider} from "@material-ui/core";
import {Button} from "@progress/kendo-react-buttons";
import Alert from "../Alert";
import Avatar from "../Layouts/Avatar";
import LightTooltip from "../LightTooltip";
import {Request} from "../../utils/request";
import ls from "local-storage";

import "./index.scss";


const CustomAvatarEditor = ({ avatar, setModalType, userType, onSubmitSuccess, pageBanner, canvasWidth, owner, name }) => {
    const [image, setImage] = useState(avatar || '');
    const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);
    const [editorErrors, setEditorErrors] = useState([]);
    const editor = useRef(null);
    const reduxUserType = useSelector(state => state.authentication.user_info.user_type);
    const reduxUserName = name ? name : useSelector(state => state.authentication.user_info.name);
    const UPLOAD_AVATAR = `/static/icons/default/club-avatar-new.png`;
    const OWNER_DEFAULT_AVATAR = '/static/images/noimg/icon-no-image.svg';
    const BANNER_DEFAULT_AVATAR = '/static/images/noimg/no-banner.png';
    const currentLink = pageBanner ? '/api/headerpicture/full_v3' : owner ? '/api/nbcownerpicture' : '/api/avatar/full_v3';

    const handleSubmit = async () => {
        await Request({
            url: currentLink,
            method: 'POST',
            data: {
                data: editor.current.getImageScaledToCanvas().toDataURL('image/jpeg', 1)
            }
        }, data => {
            if (data) {
                userType === 'club' && onSubmitSuccess({ image_link: data });
                !pageBanner && !owner && ls.set('user_info', { ...ls.get('user_info'), logo_link: data });
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
            'Ошибка: Формат файла не поддерживается, либо размер файла превышает 20Мб'
        ]);
    };

    return (
        <div className="avatar-editor">
            <div className="avatar-editor__dropzone" style={{width: canvasWidth}}>
                <Dropzone
                    accept={['.jpg', '.jpeg']}
                    maxSize={20971520} //20MB
                    noClick
                    multiple={false}
                    onDropAccepted={acceptedFiles => setImage(acceptedFiles[0])}
                    onDropRejected={handleError}
                >
                    {({ getRootProps, getInputProps }) => (
                        <div className="avatar-editor__wrap-canvas" {...getRootProps()}>
                            <AvatarEditor
                                ref={editor}
                                scale={parseFloat(scale)}
                                width={pageBanner ? canvasWidth : 332}
                                height={332}
                                position={position}
                                onPositionChange={pos => setPosition(pos)}
                                rotate={parseFloat(rotate)}
                                borderRadius={pageBanner ? 0 : 166}
                                image={image}
                                className="avatar-editor__canvas"
                                style={(image && reduxUserType !== 1 && reduxUserType !== 4 && reduxUserType !== 7) ?
                                    {} : (owner) ?
                                        { background: `url(${OWNER_DEFAULT_AVATAR}) no-repeat center / cover` } :
                                        pageBanner ?
                                            { background: `url(${BANNER_DEFAULT_AVATAR}) no-repeat center / cover`} :
                                            { background: `url(${UPLOAD_AVATAR}) no-repeat center / cover` }}
                            />
                            {
                                !image && (reduxUserType === 1 || reduxUserType === 4 || reduxUserType === 7) && !owner && !pageBanner &&
                                <Avatar
                                    card="editor"
                                    name={(reduxUserType === 4 || reduxUserType === 7) ? reduxUserName : null}
                                />
                            }
                            <div className="avatar-editor__add-file">
                                <label htmlFor="avatar" className="avatar-editor__add-label">
                                    <LightTooltip title="Добавить файл">
                                        <span className="k-icon k-i-plus" />
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
                        <span className="k-icon k-i-reset" />
                    </button>
                </LightTooltip>
                <LightTooltip title="Повернуть">
                    <button className="avatar-editor__btn" onClick={() => setRotate(rotate + 90)}>
                        <span className="k-icon k-i-reload" />
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
                    text="Ошибка: Формат файла не поддерживается, либо размер файла превышает 20Мб. Поддерживаемые форматы JPG, JPEG."
                    okButton={true}
                    onOk={() => setEditorErrors([])}
                />
            }
        </div>
    )
};

export default memo(CustomAvatarEditor);