import React from "react";
import Header from "../../../../components/Layouts/Header";
import Container from "../../../../components/Layouts/Container";
import "./styles.scss";

export default function ClientLayout ({children}){
    return (
        <>
            <Header/>
            <Container className="content client-layout">
                <div className="client-layout__content">{children}</div>
            </Container>
        </>
    )
}