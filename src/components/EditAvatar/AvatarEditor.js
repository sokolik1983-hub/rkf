import React, {memo, useRef, useState} from "react";
import Dropzone from "react-dropzone";
import AvatarEditor from "react-avatar-editor";
import {Slider} from "@material-ui/core";
import {Button} from "@progress/kendo-react-buttons";
import Alert from "../Alert";
import Avatar from "../Layouts/Avatar";
import LightTooltip from "../LightTooltip";
import {Request} from "../../utils/request";
import {DEFAULT_IMG} from "../../appConfig";
import {connectAuthUserInfo} from "../../pages/Login/connectors";
import "./index.scss";


const CustomAvatarEditor = ({user_info, updateUserInfo, setModalType, onSubmitSuccess, pageBanner, canvasWidth, owner}) => {
    const {
        user_type,
        name,
        first_name,
        last_name,
        headliner_link = '',
        logo_link = ''
    } = user_info;

    const [image, setImage] = useState(pageBanner ? headliner_link : logo_link);
    const [position, setPosition] = useState({x: 0.5, y: 0.5});
    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);
    const [editorErrors, setEditorErrors] = useState([]);

    const editor = useRef(null);

    const userName = name || `${last_name} ${first_name}`;

    const handleSubmit = async () => {
        await Request({
            url: pageBanner ? '/api/headerpicture/full_v3' : owner ? '/api/nbcownerpicture' : '/api/avatar/full_v3',
            method: 'POST',
            data: {
                data: editor.current.getImageScaledToCanvas().toDataURL('image/jpeg', 1)
            }
        }, data => {
            if(data) {
                if(!owner) {
                    let userInfo = user_info;

                    if(pageBanner) {
                        userInfo.headliner_link = data;
                    } else {
                        userInfo.logo_link = data;
                    }

                    updateUserInfo(userInfo);
                }

                if(onSubmitSuccess) {
                    onSubmitSuccess({image_link: data});
                }

                setModalType('');
            }
        }, error => {
            console.log(error);
        })
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
                    {({getRootProps, getInputProps}) => (
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
                                style={(image && user_type !== 1 && user_type !== 4 && user_type !== 7) ?
                                    {} : (owner) ?
                                        {background: `url(${DEFAULT_IMG.ownerAvatar}) no-repeat center / cover` } :
                                        pageBanner ?
                                            {background: `url(${DEFAULT_IMG.bannerAvatar}) no-repeat center / cover`} :
                                            {background: `url(${DEFAULT_IMG.uploadAvatar}) no-repeat center / cover`}}
                            />
                            {!image && (user_type === 1 || user_type === 4 || user_type === 7) && !owner && !pageBanner &&
                                <Avatar
                                    card="editor"
                                    name={(user_type === 4 || user_type === 7) ? userName : null}
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

export default memo(connectAuthUserInfo(CustomAvatarEditor));