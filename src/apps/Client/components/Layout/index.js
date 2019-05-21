import React, {Fragment, PureComponent} from 'react'
import Header from 'components/Layout/Header'
import Container from 'components/Layout/Container'
import SideBar from './SideBar'
import './styles.scss'

import {menuFakeData} from './SideBar/data'

export default class ClientLayout extends PureComponent {
    render() {
        return (
            <Fragment>
                <Header/>
                <Container content className="client-layout">
                    <div className="client-layout__sidebar">

                        <SideBar items={menuFakeData}/>

                    </div>
                    <div className="client-layout__content">{this.props.children}</div>
                </Container>
            </Fragment>
        )
    }
}