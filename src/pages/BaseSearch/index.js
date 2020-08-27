import React from "react";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import CheckStatus from "../Club/components/CheckStatus";
import CheckRegistration from "./components/CheckRegistration"
import FoundInfo from "./components/FoundInfo";
import "./index.scss";


const BaseSearch = () => {
    return (
        <Layout>
            <div className="base-search__wrap">
                <Container className="base-search content">
                    <CheckStatus isBaseSearch />
                    <CheckRegistration />
                    <FoundInfo />
                    <div className="base-search__copy-wrap">
                        <p>© 1991—{new Date().getFullYear()} СОКО РКФ.</p>
                        <p>Политика обработки персональных данных</p>
                    </div>
                </Container>
            </div>
        </Layout>
    )
};

export default React.memo(BaseSearch);