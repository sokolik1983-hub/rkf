import React from 'react';
import Layout from "components/Layouts";
import Container from "components/Layouts/Container";
import Disclaimer from "components/Disclaimer";
import Card from "components/Card";
import './styles.scss';

const NurseryEdit = () => {
    return <Layout>
        <Container className="nursery-edit content">
            <h2 className="nursery-edit__page-heading">Редактирование профиля</h2>
            <Disclaimer>
                <a className="Disclaimer__support-link" href="https://help.rkf.online/ru/knowledge_base/art/54/cat/3/#/" target="_blank" rel="noopener noreferrer">
                    Инструкция по редактированию профиля
                    </a>
            </Disclaimer>
            <Card>
                NurseryEdit
            </Card>
        </Container>
    </Layout>
};

export default NurseryEdit;