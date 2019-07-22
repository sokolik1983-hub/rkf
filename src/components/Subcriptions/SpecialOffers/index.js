import React, {PureComponent} from 'react'
import {Link} from 'react-router-dom'
import FormInput from 'components/Form/FormInput'
import Button from 'components/Button'
import './styles.scss'


export default class SpecialOffersSubscription extends PureComponent {
    state = {
        email: '',
    };

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    render() {
        return (
            <div className="special-offers">
                <div className="special-offers__title">
                    Подпишитесь на специальные предложения от РКФ
                </div>
                <form className="special-offers__form">
                    <FormInput>
                        <label>E-mail</label>
                        <input
                            placeholder="Введите вашу почту"
                            className="FormInput__input"
                            name="email"
                            onChange={this.onChange}
                            value={this.state.email}
                        />
                    </FormInput>
                    <div className="form-controls">
                        <Button className="btn-primary">Подписаться</Button>
                    </div>
                </form>
                <div className="special-offers__signature">Нажимая кнопку «Подписаться», вы принимаете <Link
                    to="/rules">Условия использования</Link> и <Link to={'/policy'}>Политику конфиденциальности</Link>
                </div>
            </div>
        )
    }
}
