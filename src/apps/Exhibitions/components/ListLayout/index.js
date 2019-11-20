import React from 'react';
import FilterDate from 'apps/Exhibitions/components/FilterDate';
import Messages from 'apps/Messages';
import Aside from 'components/Layout/Aside';
import Content from 'components/Layout/Content';
import Container from 'components/Layout/Container';
import ExhibitionsAside from 'apps/Exhibitions/Aside';
import ExhibitionsFilter from 'apps/Exhibitions/components/ExhibitionsFilter';
import './styles.scss';


function ExhibitionsListLayout({ children }) {
    return (
        <Container content pad>
            <ExhibitionsFilter className="ExhibitionsListLayout">
                <Messages />
                <Aside className="ExhibitionsAside" >
                    <ExhibitionsAside />
                </Aside>
                <Content className="ExhibitionsContent">
                    <FilterDate />
                    <div className="exhibitions__holder">{children}</div>
                </Content>
            </ExhibitionsFilter>
        </Container>
    );
}

export default ExhibitionsListLayout;
