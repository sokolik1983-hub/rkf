import React from 'react'
import Header from '../Header'
import ClientNews from 'apps/ClientNews'
import Side from '../Side'
import Description from '../Description'
import './styles.scss'

const Wrap = ({children}) => <div className="ClientHome__wrap">{children}</div>;
const Content = ({children}) => <div className="ClientHome__content">{children}</div>;


export default function ClientHome() {
    return (
        <div className="ClientHome">
            <Header/>
            <Wrap>
                <Content>
                    <Description/>
                    <ClientNews/>
                </Content>
                <Side>
                    ClientSide
                </Side>
            </Wrap>
        </div>
    )
}