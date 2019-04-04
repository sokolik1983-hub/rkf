import React, {PureComponent} from 'react'
import {DropDownItem} from 'components/DropDownItem'
import {UserIcon} from './UserIcon'
import {UserLogin} from './UserLogin'
import {UserMenu} from './UserMenu'

import './index.scss'

export default class WidgetLogin extends PureComponent {
    state = {
        dropdownVisible: false,
    };

    toggleDropDown = () => {
        this.setState(prevState => ({dropdownVisible: !prevState.dropdownVisible}))
    };

    render() {
        return (
            <div onClick={this.toggleDropDown} className="widget-login">
                <UserIcon/>
                <UserLogin title="Клуб №112"/>
                <UserMenu opened={this.state.dropdownVisible}>
                    <DropDownItem>Личная информация</DropDownItem>
                    <DropDownItem>Документы</DropDownItem>
                    <DropDownItem>Избранное</DropDownItem>
                    <DropDownItem>Создать заявку</DropDownItem>
                    <DropDownItem>Упаравление заявками</DropDownItem>
                    <DropDownItem>Выход</DropDownItem>
                </UserMenu>
            </div>
        )
    }
}