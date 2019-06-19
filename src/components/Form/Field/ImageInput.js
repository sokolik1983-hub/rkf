import React, {PureComponent} from 'react';


export default class ImageInput extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            src: props.value
        }
    }

    handleChange = (e) => {
        const {name} = this.props;
        this.props.setFieldValue(name, e.target.files[0]);
        this.setState({
            src: URL.createObjectURL(e.target.files[0])
        })
    };

    render() {
        const {
            id,
            name,
            className,
            placeholder,
            onBlur,
            disabled,
        } = this.props;

        return <div className="image-input__wrap">
            {
                this.state.src &&
                <img style={{maxHeight: 32, maxWidth:32}} className="image-input__preview" src={this.state.src} alt={this.state.src}/>
            }
            <input
                id={id}
                type="file"
                name={name}
                placeholder={placeholder}
                onChange={this.handleChange}
                disabled={disabled}
                onBlur={onBlur}
                className={className}
            />
        </div>
    }
}