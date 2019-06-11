import React, {Component} from "react";

import {Link} from 'react-router-dom'
import Request from 'utils/ApiCall'
import Container from 'components/Layout/Container'


class TestView extends Component {
    state = {}

    componentDidMount() {
        this.makeRequest()
    }

    makeRequest = () => {
        const req = new Request({url:'/'});
        req.get()
    };
    successAction=()=>{

    }

    render() {
        return (
            <Container pad content>
                <h1 className="text-center">Test View</h1>
                <p>Вернуться на <Link to="/">главную страницу</Link></p>
            </Container>
        );
    }
}


export default TestView