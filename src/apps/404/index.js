import React from "react";
import PublicLayout from 'components/Layout';
import Container from 'components/Layout/Container';
import FooterSmall from 'components/Layout/FooterSmall';
import {useWrapClassName} from "../../shared/hooks";
import './styles.scss';

export default function PageNotFound() {
    useWrapClassName('not-found');

    return (
        <PublicLayout>
            <Container className="page-404">
                <div className="page-404__content">
                    <h1>404</h1>
                    <h2>Страница не найдена</h2>
                </div>
            </Container>
            <FooterSmall className="page-404__footer"/>
        </PublicLayout>
    )
}