import React, {Fragment, PureComponent} from 'react'
import Header from 'components/Layout/Header'
import Container from 'components/Layout/Container'
import Footer from 'components/Layout/ClientFooter'
import SideBar from './SideBar'
import {MenuSeparator} from './SideBar/MenuItem'
import './styles.scss'

import {
    clientNavPersonalSection,
    clientNavServicesSection,
    clientNavCustomSection,
    clientNavSettingsSection
} from './SideBar/data'

export default class DogOwnerLayout extends PureComponent {
    render() {
        return (
            <Fragment>
                <Header/>
                <Container content className="DogOwner-layout">
                    <div className="DogOwner-layout__sidebar">

                        <SideBar items={clientNavPersonalSection}/>
                        <MenuSeparator/>
                        <SideBar items={clientNavServicesSection}/>
                        <MenuSeparator/>
                        <SideBar items={clientNavCustomSection}/>
                        <MenuSeparator/>
                        <SideBar items={clientNavSettingsSection}/>
                    </div>
                    <div className="DogOwner-layout__content">
                        {this.props.children}
                        <Footer/>
                    </div>

                </Container>

            </Fragment>
        )
    }
}