import React from "react";
//import FilterDate from 'apps/Exhibitions/components/FilterDate'
//import Paginator from 'components/Paginator'
import Aside from 'components/Layout/Aside'
import Content from 'components/Layout/Content'
import ExhibitionsAside from 'apps/Exhibitions/Aside'
import './styles.scss'


function ExhibitionsListLayout({children}) {

    return (
        <div className="ExhibitionsListLayout">
            <Aside>
                <ExhibitionsAside/>
            </Aside>
            <Content>
                <div className="exhibitions__holder">
                    {/*<FilterDate/>*/}
                    {children}
                </div>
            </Content>
        </div>
    )
}


export default ExhibitionsListLayout