import React, {Fragment} from "react";
import FilterDate from 'apps/Exhibitions/components/FilterDate'
//import Paginator from 'components/Paginator'
import Aside from 'components/Layout/Aside'
import Content from 'components/Layout/Content'
import ExhibitionsAside from 'apps/Exhibitions/Aside'

function ExhibitionsListLayout({children}) {

    return (
        <Fragment>
            <Aside>
                <ExhibitionsAside/>
            </Aside>
            <Content>
                <div className="exhibitions__holder">
                    <FilterDate/>
                    {children}
                </div>
            </Content>
        </Fragment>
    )
}


export default ExhibitionsListLayout