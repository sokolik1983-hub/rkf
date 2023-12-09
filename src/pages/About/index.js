import React, { useState } from "react";

import Layout from '../../components/Layouts';
import Container from '../../components/Layouts/Container';
import Modal from "../../components/Modal";
import TopBanner from './components/TopBanner';
import President from './components/President'
import RKFToday from "./components/RKFToday";
import Statistics from "./components/Stastics";
import UsefulLinks from "./components/UsefulLinks";

import useIsMobile from "../../utils/useIsMobile";

import "./index.scss";

const AboutPage = () => {
    const [showModal, setShowModal] = useState(false);

    const isMobile701 = useIsMobile(701);

    const schemeClickHandler = () => {
        !isMobile701 && setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }


    return (
        <Layout>
            <TopBanner />
            <Container className="about-page__content">
                <h4>Российская кинологическая федерация основана 12&nbsp;сентября&nbsp;1991&nbsp;года.</h4>

                <h3>ИСТОРИЯ РКФ</h3>

                <div className="about-page__scheme" onClick={schemeClickHandler}>
                    <img src={`static/images/about/about_scheme_${!isMobile701 ? 'full' : 'mobile'}.png`} alt="30 лет РОССИЙСКОЙ КИНОЛОГИЧЕСКОЙ ФЕДЕРАЦИИ"/>
                </div>

                <div className="about-page__info">
                    <President />
                    <RKFToday />
                    <Statistics />
                    <UsefulLinks />
                </div>

                <Modal
                    className="about-page__modal"
                    showModal={showModal}
                    handleClose={closeModal}
                    handleX={closeModal}
                >
                    <img src="static/images/about/about_scheme_full.png" alt="30 лет РОССИЙСКОЙ КИНОЛОГИЧЕСКОЙ ФЕДЕРАЦИИ"/>
                </Modal>
            </Container>
        </Layout>
    )
};

export default React.memo(AboutPage);