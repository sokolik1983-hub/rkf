import React, {useState} from "react";
import {getYoutubeVideoId} from "../../../utils/video";
import "./index.scss";


const AddVideoLink = ({setVideoId, showModal}) => {
    const [link, setLink] = useState('');
    const [error, setError] = useState('');

    const handleChange = ({target}) => {
        setLink(target.value);
        setError('');
    };

    const handleSubmit = e => {
        e.preventDefault();
        if(link) {
            if(/(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w-_]+)/.test(link)) {
                setVideoId(getYoutubeVideoId(link));
                showModal(false);
            } else {
                setError('Для добавления доступны только ссылки с YouTube');
            }
        } else {
            setError('Добавьте ссылку');
        }
    };

    return (
        <div className="add-video-link">
            <form className="add-video-link__form" onSubmit={handleSubmit}>
                <div className="add-video-link__form-row">
                    <label className="add-video-link__form-label">Ссылка на видео</label>
                    <input
                        type="text"
                        placeholder="Ссылка на видео"
                        className={`add-video-link__form-input${error ? ' _error' : ''}`}
                        value={link}
                        onChange={handleChange}
                    />
                    {error && <p className="add-video-link__form-error">{error}</p>}
                </div>
                <button className="add-video-link__form-submit" type="submit" disabled={!link}>Сохранить</button>
            </form>
        </div>
    )
};

export default React.memo(AddVideoLink);