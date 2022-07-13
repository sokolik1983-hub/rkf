import React, {memo, useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import Container from "../Container";
import Search from "./components/Search";
import Nav from "./components/Nav";
import WidgetLogin from "./components/WidgetLogin";
import Notifications from "./components/Notifications";
import Feedback from "../../Feedback";
import {connectShowFilters} from "../connectors";
import {connectAuthVisible} from "../../../pages/Login/connectors";
import useIsMobile from "../../../utils/useIsMobile";
import "./index.scss";


const Header = ({isAuthenticated, isOpenFilters, setShowFilters}) => {
    const [openWidgets, setOpenWidgets] = useState(false);
    const [open, setOpen] = useState(false);
    const isMobile = useIsMobile(1080);
    const {pathname} = useLocation();
    const {withFilters, login_page, isOpen} = useSelector(state => state.layout) || {};

    const needChangeIsOpen = valueIsOpen => {
        if (valueIsOpen) {
            setShowFilters({ isOpenFilters: false });
        }
    };

    const hideSideMenu = () => {
        setShowFilters({isOpenFilters: false, isOpen: false});
        setOpen(false);
    };

    const strokeColor = isOpenFilters ? 'stroke-color__active' : 'stroke-color__inactive';

    const setOverflowFilter = isOpenFilters => {
        if (window.innerWidth <= 680) {
            document.body.style.overflow = isOpenFilters || isOpen ? 'hidden' : '';
        } else if (window.innerWidth > 680 && isOpenFilters) {
            document.body.style.overflow = '';
        }
    };

    useEffect(() => {
        setOverflowFilter(isOpenFilters);

        window.addEventListener('resize', () => setOverflowFilter(isOpenFilters));

        return () => window.removeEventListener('resize', () => setOverflowFilter(isOpenFilters));
    }, [isOpenFilters]);

    return (
        <header className="header">
            <Container className="header__content">
                {isMobile ?
                    <div className="header__nav-wrap">
                        <Nav
                            isOpenFilters={isOpenFilters}
                            needChangeIsOpen={needChangeIsOpen}
                            login_page={login_page}
                            isOpen={isOpen}
                            setShowFilters={setShowFilters}
                        />
                    </div> :
                    <div><Link to='/' className="header__logo" /></div>
                }
                <Search hideSideMenu={hideSideMenu} withFilters={withFilters} />
                {!isMobile &&
                    <Nav isAuthenticated={isAuthenticated} setOpen={setOpen} />
                }
                <div className="header__widgets">
                    {isAuthenticated &&
                        <div onClick={hideSideMenu} className="header__widgets-notifications-wrap">
                            <Notifications open={openWidgets} setOpen={setOpenWidgets}/>
                        </div>
                    }
                    {!isAuthenticated && isMobile &&
                        <div className={`header__widgets--feedback${login_page ? ' __hidden' : ''}`}>
                            <Feedback isMainNav={true} title="Поддержка"/>
                        </div>
                    }
                    {isMobile ?
                        <div className={withFilters || pathname === '/' ? 'header__filters' : 'header__filters __hidden'}
                             onClick={() => setShowFilters({ isOpenFilters: !isOpenFilters })}>
                            <div className={isOpenFilters ? 'open' : ''}>
                                {isOpenFilters ?
                                    <svg className={`no-scale ${strokeColor}`} width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                        <line y1='1' x1='1' x2='20' y2='20' strokeWidth='1.32' />
                                        <line y1='20' x1='1' x2='20' y2='1' strokeWidth='1.32' />
                                    </svg> :
                                    <svg className={strokeColor} width='20' height='18' viewBox='0 0 20 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                        <path d='M3.47827 12.6608V17.4434' strokeWidth='1.32'
                                              strokeMiterlimit='10' />
                                        <path d='M0 15.0521H3.47826' strokeWidth='1.32'
                                              strokeMiterlimit='10' />
                                        <path d='M6.95654 15.0521H20' strokeWidth='1.32'
                                              strokeMiterlimit='10' />
                                        <path d='M0 2.3913H6.08696' strokeWidth='1.32'
                                              strokeMiterlimit='10' />
                                        <path d='M9.56519 2.3913H20' strokeWidth='1.32'
                                              strokeMiterlimit='10' />
                                        <path d='M6.08691 0V4.78261' strokeWidth='1.32'
                                              strokeMiterlimit='10' />
                                        <path d='M15.6522 6.33044V11.1131' strokeWidth='1.32'
                                              strokeMiterlimit='10' />
                                        <path d='M15.6522 8.72174H20' strokeWidth='1.32'
                                              strokeMiterlimit='10' />
                                        <path d='M0 8.72174H12.1739' strokeWidth='1.32'
                                              strokeMiterlimit='10' />
                                    </svg>
                                }
                            </div>
                            <span style={{ color: isOpenFilters && '#3366ff', width: '50px' }}>
                                {pathname.match (/uploaded-documents/) ?
                                    (isOpenFilters ? 'Закрыть' : 'Категории') :
                                    (isOpenFilters ? 'Закрыть' : 'Фильтр')
                                }
                            </span>
                        </div> :
                        <WidgetLogin login_page={login_page} setOpen={setOpen} open={open} />
                    }
                </div>
            </Container>
        </header>
    );
};

export default connectAuthVisible(connectShowFilters(memo(Header)));