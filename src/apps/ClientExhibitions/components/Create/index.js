import React, {PureComponent} from 'react'
import Steps from './Steps'


export default class ExhibitionCreate extends PureComponent {
    render() {
        return (
            <div style={{padding: '0 150px'}} className="exhibition-create-view">
                <div className="title">Создание выставки</div>
                <Steps/>
            </div>
        )
    }
}