import React, {Fragment, PureComponent} from 'react'
import Header from 'components/Layout/Header'
import Container from 'components/Layout/Container'
import SideBar from './SideBar'
import {MenuSeparator} from './SideBar/MenuItem'
import './styles.scss'

import {menuFakeData1, menuFakeData2, menuFakeData3} from './SideBar/data'

export default function ClientLayout ({children}){

        return (
            <Fragment>
                <Header/>
                <Container content className="client-layout">
                    <div className="client-layout__sidebar">

                        <SideBar items={menuFakeData1}/>
                        <MenuSeparator/>
                        <SideBar items={menuFakeData2}/>
                        <MenuSeparator/>
                        <SideBar items={menuFakeData3}/>
                    </div>
                    <div className="client-layout__content">{children}</div>
                </Container>
            </Fragment>
        )

}