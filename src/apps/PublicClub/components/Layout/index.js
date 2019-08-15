import React from 'react'
import Header from '../Header'
import PublicClubNews from 'apps/PublicClubNews'
import Side from '../Side'
import Description from '../Description'
import './styles.scss'

const Wrap = ({children}) => <div className="PublicHome__wrap">{children}</div>;
const Content = ({children}) => <div className="PublicHome__content">{children}</div>;


export default function PublicHome() {
    return (
        <React.Fragment>
            <Header/>
            <Wrap>
                <Content>
                    <Description/>
                    <PublicClubNews/>
                </Content>
                <Side>
                    ClientSide
                </Side>
            </Wrap>
        </React.Fragment>
    )
}