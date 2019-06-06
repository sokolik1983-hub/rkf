import React, {PureComponent, Fragment} from 'react'
import {Link} from 'react-router-dom'
import {DropDownItem} from 'components/DropDownItem'
import DropDown from 'components/DropDown'
import {UserIcon} from './UserIcon'
import {UserLogin} from './UserLogin'
import {LOGIN_URL, REGISTER_URL} from 'appConfig'
import './index.scss'


const DropInner = () =>
    <Fragment>
        <UserIcon/>
        <UserLogin title="Клуб"/>
    </Fragment>;

const Inner = () =>
    <div className="widget-login__auth-link">
        Личный кабинет
    </div>

export default class WidgetLogin extends PureComponent {
    render() {
        const {isAuthenticated, logOutUser} = this.props;
        return isAuthenticated ?
            <DropDown className="widget-login" innerComponent={<DropInner/>}>
                <DropDownItem><Link to="/client">Личная кабинет</Link></DropDownItem>
                <DropDownItem onClick={logOutUser}>Выход</DropDownItem>
            </DropDown>
            :
            <DropDown className="widget-login" innerComponent={<Inner/>}>
                <DropDownItem><Link to={LOGIN_URL}>Вход</Link></DropDownItem>
                <DropDownItem><Link to={REGISTER_URL}>Регистрация</Link></DropDownItem>
            </DropDown>

    }
}

