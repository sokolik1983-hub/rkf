import React from "react";
import { connect } from 'formik';
import { getHeaders } from "utils/request";
import './styles.scss';

const FormFileDownloadable = ({ formik, onChange, name, url, id, loading, className, disabled, ...props }) => {
    const isDownloadable = url && id;
    const handleClick = async (e) => {
        e.preventDefault();
        if (isDownloadable) {
            let el = e.target;
            el.innerText = 'Загрузка...';
            await fetch(`${url}?id=${id}`, {
                method: 'GET',
                headers: getHeaders()
            })
                .then(response => response.blob())
                .then(blob => {
                    let url = window.URL.createObjectURL(blob),
                        a = document.createElement('a');
                    a.href = url;
                    a.download = name;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                });
            el.innerText = 'Скачать';
        }
    };

    return <div className="FormFileDownloadable">
        <input {...props} className="FormFileDownloadable__input" name={name} type="file" onBlur={formik.handleBlur} onChange={e => {
            formik.setFieldValue(name, e.currentTarget.files[0]);
            onChange && onChange(e);
        }} />
        <div className="FormFileDownloadable__buttons">
            {isDownloadable && !disabled && <a className="btn FormFileDownloadable__download" onClick={handleClick} href="/" title={name}>Скачать</a>}
        </div>
    </div>
}

export default connect(FormFileDownloadable);
