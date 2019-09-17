import React from 'react';
import FilterDate from 'apps/Exhibitions/components/FilterDate';
//import Paginator from 'components/Paginator'
import Messages from 'apps/Messages';
import Aside from 'components/Layout/Aside';
import Content from 'components/Layout/Content';
import Container from 'components/Layout/Container';
import ExhibitionsAside from 'apps/Exhibitions/Aside';
import './styles.scss';
import ExhibitionsFilter from 'apps/Exhibitions/components/ExhibitionsFilter';

function ExhibitionsListLayout({ children }) {
    return (
        <Container content pad>
            <ExhibitionsFilter className="ExhibitionsListLayout">
                <Messages />
                <Aside>
                    <ExhibitionsAside />
                </Aside>
                <Content>
                    <FilterDate />
                    <div className="exhibitions__holder">{children}</div>
                </Content>
            </ExhibitionsFilter>
        </Container>
    );
}

export default ExhibitionsListLayout;
