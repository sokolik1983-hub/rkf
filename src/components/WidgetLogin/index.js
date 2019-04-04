import React, {PureComponent} from 'react'
import {DropDownItem} from 'components/DropDownItem'
import {UserIcon} from './UserIcon'
import {UserLogin} from './UserLogin'
import {UserMenu} from './UserMenu'

import './index.scss'

export default class WidgetLogin extends PureComponent {
    render() {
        return (
            <div className="widget-login">
                <UserIcon/>
                <UserLogin title="Клуб №112"/>
                <UserMenu>
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