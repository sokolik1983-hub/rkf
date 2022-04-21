import React from "react";
import {Link} from "react-router-dom";
import Container from "../Container";
import personalDataProcessingPolicy from "./../../../pages/PersonalDataProcessingPolicy/Politika_PDn.pdf";
import './index.scss';


const Footer = ({ showCopyright = true }) => (
    <footer className="Footer">
        <Container className="Footer__inner">
            <div className="Footer__bottom">
                <p>{showCopyright && `© 1991—${new Date().getFullYear()} СОКО РКФ.`}</p>
                <div className="Footer__socials">
                    {/*<a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/ruskynologfed/"><img src="/static/icons/social/facebook.svg" alt="" /></a>*/}
                    <a target="_blank" rel="noopener noreferrer" href="https://vk.com/ruskynologfed"><img src="/static/icons/social/vk.svg" alt="" /></a>
                    {/* <a target="_blank" rel="noopener noreferrer" href="https://ok.ru/rkforg"><img src="/static/icons/social/odnoklassniki.svg" alt="" /></a>
                    <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/ruskynologfed"><img src="/static/icons/social/twitter.svg" alt="" /></a> */}
                    <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/channel/UC1mzNt3TccDxGfA-vkEAQig"><img src="/static/icons/social/youtube.svg" alt="" /></a>
                    {/*<a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/russiankynologfed/"><img src="/static/icons/social/instagram.svg" alt="" /></a>*/}
                    <a target="_blank" rel="noopener noreferrer" href="https://t.me/RkfOnlineOfficial"><img src="/static/icons/social/telegram.svg" alt="" /></a>
                </div>
                {showCopyright &&
                    <Link
                        className="Footer__policy"
                        to={personalDataProcessingPolicy}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Политика обработки персональных данных
                    </Link>
                }
            </div>
        </Container>
    </footer>
);

export default Footer;