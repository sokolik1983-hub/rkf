import React, {Component} from "react";

import {Link} from 'react-router-dom'

import Container from 'components/Layout/Container'


class DemoApp extends Component {

    render() {
        return (
            <Container pad content>
                <h1>Раздел в разработке</h1>
                <p>Вернуться на <Link to="/">главную страницу</Link></p>
            </Container>
        );
    }
}


export default DemoApp