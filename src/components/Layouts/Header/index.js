import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from '../Container';
import Search from './components/Search';
import Nav from './components/Nav';
import WidgetLogin from './components/WidgetLogin';
import Notifications from './components/Notifications';
import { connectShowFilters } from '../connectors';
import { connectAuthVisible } from 'pages/Login/connectors';
import useIsMobile from '../../../utils/useIsMobile';

import './index.scss';

const Header = ({
                    isAuthenticated,
                    withFilters,
                    isOpenFilters,
                    setShowFilters,
                    login_page,
                    setNotificationsLength,
                    isOpen,
                    setIsOpen
                }) => {
    const isMobile = useIsMobile(1080);
    const { pathname } = useLocation();
    const [openWidgets, setOpenWidgets] = useState(false);

    const needChangeIsOpen = (valueIsOpen) => {
        if (valueIsOpen) {
            setShowFilters({ isOpenFilters: false });
        }
    };

    const hideSideMenu = () => {
        setShowFilters({ isOpenFilters: false });
        setIsOpen(false);
    };

    const strokeColor = isOpenFilters ? '#3366FF' : '#90999E';

    return (
        <header className='header'>
            <Container className='header__content'>

                {isMobile ?
                    <div className='header__nav-wrap'>
                        <Nav
                            isOpenFilters={isOpenFilters}
                            needChangeIsOpen={needChangeIsOpen}
                            login_page={login_page}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                        />
                    </div> :
                    <div><Link to='/' className='header__logo' /></div>
                }

                <Search hideSideMenu={hideSideMenu} withFilters={withFilters} />

                {!isMobile
                && <Nav isAuthenticated={isAuthenticated} />
                }
                <div className='header__widgets'>
                    {isAuthenticated &&
                    <>
                        {/*<div className={`header__widgets--feedback${login_page ? ' login-page' : ''}`}>*/}
                        {/*    <Feedback isMainNav={true}/>*/}
                        {/*</div>*/}
                        <div onClick={hideSideMenu} className='header__widgets-notifications-wrap'>
                            <Notifications open={openWidgets}
                                           setOpen={setOpenWidgets}
                                           setNotificationsLength={setNotificationsLength}
                            />
                        </div>
                    </>
                    }

                    {isMobile ?
                        <div className={withFilters || pathname === '/'
                            ?
                            'header__filters' :
                            'header__filters __hidden'}
                             onClick={() => {
                                 setShowFilters({ isOpenFilters: !isOpenFilters });
                             }}>
                            <div className={isOpenFilters ? 'open' : ''}>
                                <svg width='20' height='18' viewBox='0 0 20 18' fill='none'
                                     xmlns='http://www.w3.org/2000/svg'>
                                    <path d='M3.47827 12.6608V17.4434' stroke={strokeColor} strokeWidth='1.32'
                                          strokeMiterlimit='10' />
                                    <path d='M0 15.0521H3.47826' stroke={strokeColor} strokeWidth='1.32'
                                          strokeMiterlimit='10' />
                                    <path d='M6.95654 15.0521H20' stroke={strokeColor} strokeWidth='1.32'
                                          strokeMiterlimit='10' />
                                    <path d='M0 2.3913H6.08696' stroke={strokeColor} strokeWidth='1.32'
                                          strokeMiterlimit='10' />
                                    <path d='M9.56519 2.3913H20' stroke={strokeColor} strokeWidth='1.32'
                                          strokeMiterlimit='10' />
                                    <path d='M6.08691 0V4.78261' stroke={strokeColor} strokeWidth='1.32'
                                          strokeMiterlimit='10' />
                                    <path d='M15.6522 6.33044V11.1131' stroke={strokeColor} strokeWidth='1.32'
                                          strokeMiterlimit='10' />
                                    <path d='M15.6522 8.72174H20' stroke={strokeColor} strokeWidth='1.32'
                                          strokeMiterlimit='10' />
                                    <path d='M0 8.72174H12.1739' stroke={strokeColor} strokeWidth='1.32'
                                          strokeMiterlimit='10' />
                                </svg>
                            </div>
                            <span style={{ color: isOpenFilters && '#3366ff' }}>Фильтр</span>
                        </div>
                        : <WidgetLogin login_page={login_page} />}
                </div>


            </Container>

        </header>
    );
};

export default connectAuthVisible(connectShowFilters(React.memo(Header)));