import React, {PureComponent} from 'react'
import './styles.scss'

export default class ClientLayout extends PureComponent {
    render() {
        return (
            <div className="client-layout__holder">
                <div className="client-layout__sidebar">sidebar</div>
                <div className="client-layout__content">{this.props.children}</div>
            </div>
        )
    }
}