import React, {useState} from 'react';
import {connect} from 'formik'
import ImagePreview from 'components/ImagePreview'
import './styles.scss'

function ImageInput({id, className, name, placeholder, disabled, formik}) {
    const [src, setSrc] = useState('');

    const handleChange = e => {
        if (e.target.files[0]) {
            formik.setFieldValue(name, e.target.files[0]);
            setSrc(URL.createObjectURL(e.target.files[0]));
        }
        else{
            formik.setFieldValue(name, '');
            setSrc('');
        }
    };


    return (
        <div className="ImageInput">

            <input
                id={id}
                type="file"
                name={name}
                placeholder={placeholder}
                onChange={handleChange}
                disabled={disabled}
                onBlur={formik.onBlur}
                className={className}
            />
            {src ? <ImagePreview src={src}/> : null}
        </div>
    )
}

export default connect(ImageInput)
//
// export default class ImageInput extends PureComponent {
//     constructor(props) {
//         super(props);
//         this.state = {
//             src: props.value
//         }
//     }
//
//     handleChange = (e) => {
//         const {name} = this.props;
//         this.props.setFieldValue(name, e.target.files[0]);
//         this.setState({
//             src: URL.createObjectURL(e.target.files[0])
//         })
//     };
//
//     render() {
//         const {
//             id,
//             name,
//             className,
//             placeholder,
//             onBlur,
//             disabled,
//         } = this.props;
//
//         return <div className="image-input__wrap">
//             {
//                 this.state.src &&
//                 <img style={{maxHeight: 32, maxWidth: 32}} className="image-input__preview" src={this.state.src}
//                      alt={this.state.src}/>
//             }
//             <input
//                 id={id}
//                 type="file"
//                 name={name}
//                 placeholder={placeholder}
//                 onChange={this.handleChange}
//                 disabled={disabled}
//                 onBlur={onBlur}
//                 className={className}
//             />
//         </div>
//     }
// }