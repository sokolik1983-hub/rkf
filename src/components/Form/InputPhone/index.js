import React, {PureComponent} from 'react'
import './styles.scss'

export default class InputPhone extends PureComponent {
    state = {
        displayValue: ''
    };

    submitPhone = () => {
        this.props.submitPhone(this.props.value)
    };

    render() {
        const {
            placeholder,
            value,
            onChange,
            disabled,
        } = this.props;

        return (

            <div className="input-phone__wrap">
                <input
                    placeholder={placeholder}
                    className="form-input__input"
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                />
                <button onClick={this.submitPhone}>Подтвердить</button>
            </div>

        )
    }
}