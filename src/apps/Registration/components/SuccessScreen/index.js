import React, {PureComponent} from 'react'
import {Link} from 'react-router-dom'
import CommonSplitLayout from 'components/Layout/CommonSplitLayout'

import './styles.scss'

export default class RegistrationSuccess extends PureComponent {

    render() {
        return (

            <CommonSplitLayout image={'/static/images/registration/success.jpeg'}>
                <div className="registration-success-message">
                    <div className="registration__title">Спасибо за вашу регистрацию!</div>
                    <p>Мы выслали вам письмо на почту для подтверждения.
                        Зайдите на указанную вами почту и перейдите по ссылке.</p>
                    <div className="text-center"><Link className="btn" to={"/"}>На сайт</Link></div>
                </div>
            </CommonSplitLayout>
        );
    }
}