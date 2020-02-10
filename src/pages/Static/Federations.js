import React from "react";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import { Link } from 'react-router-dom';
import './styles.scss';

const Federations = () => {
    return <Layout>
        <Container className="content federations">
            <h1>Федерации</h1>
            <ul>
                <li><Link className="link" to="/rfls">РФЛС</Link></li>
                <li><Link className="link" to="/rfss">РФСС</Link></li>
                <li><Link className="link" to="/rfos">РФОС</Link></li>
                <li><Link className="link" to="/oankoo">ОАНКОО</Link></li>
            </ul>
            {
                //             id: 2.1,
                //             title: "РФЛС",
                //             to: '/rfls',
                //             exact: false
                //         },
                //         {
                //             id: 2.2,
                //             title: "РФСС",
                //             to: '/rfss',
                //             exact: false
                //         },
                //         {
                //             id: 2.3,
                //             title: "РФОС",
                //             to: '/rfos',
                //             exact: false
                //         },
                //         {
                //             id: 2.4,
                //             title: "ОАНКОО",
                //             to: '/oankoo',
                //             exact: false
                //         
            }
        </Container>
    </Layout>
};

export default React.memo(Federations);