import React, {PureComponent} from 'react'
import './style.scss'
export default class InputPassword extends PureComponent {
    state = {
        show: false
    };
    toggle=()=>{
        console.log('toggle')
        this.setState(prevState=>({show: !prevState.show}))
    }
    render() {
        const {className, onChange, value, placeholder} = this.props;
        return <div className="input-password">
            <input
                className={className}
                type={this.state.show ? 'text' : 'password'}
                placeholder={placeholder} value={value}
                onChange={onChange}
            />
            <button type="button" onClick={this.toggle} className="input-password__toggle"/>
        </div>
    }
}
