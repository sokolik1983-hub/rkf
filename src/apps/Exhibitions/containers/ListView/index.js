import React, {Fragment} from "react";
import FilterDate from 'apps/Exhibitions/components/FilterDate'
import List from 'apps/Exhibitions/containers/ExhibitionsList'
import Paginator from 'components/Paginator'
import Aside from 'components/Layout/Aside'
import Content from 'components/Layout/Content'
import ExhibitionsAside from 'apps/Exhibitions/Aside'

const ExhibitionsListView = () =>
    <Fragment>
        <Aside>
            <ExhibitionsAside/>
        </Aside>
        <Content>
            <div className="exhibitions__holder">
                <FilterDate/>
                {/*<List/>*/}
                {/*<Paginator>*/}
                {/*    <button className="paginator__btn paginator__btn--active">1</button>*/}
                {/*    <button className="paginator__btn">2</button>*/}
                {/*    <button className="paginator__btn">3</button>*/}
                {/*    <button className="paginator__btn paginator__btn--next">Далее</button>*/}
                {/*</Paginator>*/}
            </div>
        </Content>
    </Fragment>

export default ExhibitionsListView