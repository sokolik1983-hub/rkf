import React, {useState} from 'react';
import {connect} from 'formik'
import {useDropzone} from 'react-dropzone'
import ImagePreview from 'components/ImagePreview'

import './styles.scss'


function ImageInput({id, className, name, placeholder, disabled, formik}) {
    const [src, setSrc] = useState('');
    const handleChange = e => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            formik.setFieldValue(name, file);
            setSrc(URL.createObjectURL(file));
        } else {
            formik.setFieldValue(name, '');
            setSrc('');
        }
    };
    const onDrop = files => {
        if (files.length === 1) {
            formik.setFieldValue(name, files[0]);
            setSrc(URL.createObjectURL(files[0]));
        }
    };

    const {getRootProps, getInputProps} = useDropzone({onDrop, multi: false});


    return (
        <div className="ImageInput"
             {...getRootProps()}
        >
            <input

                id={id}
                type="file"
                name={name}
                placeholder={placeholder}
                onChange={handleChange}
                disabled={disabled}
                onBlur={formik.onBlur}
                className={className}
                {...getInputProps()}
            />
            {src ? <ImagePreview src={src}/> : null}
        </div>
    )
}

export default connect(ImageInput)