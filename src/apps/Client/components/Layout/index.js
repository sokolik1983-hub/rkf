import React from 'react';
import Header from "../../../../components/Layouts/Header";
import Container from 'components/Layout/Container';
import './styles.scss';

export default function ClientLayout ({children}){
    return (
        <>
            <Header/>
            <Container content className="client-layout">
                <div className="client-layout__content">{children}</div>
            </Container>
        </>
    )
}