import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { mainNav } from '../../../../appConfig';
import Feedback from '../../../Feedback';
import ClickGuard from '../../../ClickGuard';
import NavSublist from './NavSublist';
import { connectAuthVisible } from '../../../../pages/Login/connectors';
import useIsMobile from '../../../../utils/useIsMobile';
import MenuLink from './MenuLink';
import ZlineModal from "../../../../components/ZlineModal";
import {blockContent} from "../../../../utils/blockContent";

const Nav = ({ isAuthenticated, needChangeIsOpen, isOpenFilters, isOpen, setIsOpen, setOpen }) => {
    const [showZlineModal, setShowZlineModal] = useState(false);

    const isMobile = useIsMobile(1080);

    const setOverflow = (isOpen) => {
        if (window.innerWidth <= 1080) {
            document.body.style.overflow = isOpen ? 'hidden' : '';
        } else if (window.innerWidth > 1080 && isOpen) {
            document.body.style.overflow = '';
        }
    };

    useEffect(() => {
        setOverflow(isOpen);
        window.addEventListener('resize', () => setOverflow(isOpen));
        return () => window.removeEventListener('resize', () => setOverflow(isOpen));

    }, [isOpen]);

    useEffect(() => {
        if (isOpenFilters) {
            setIsOpen(false);
        }
    }, [isOpenFilters]);

    const menuTitle = isOpen ? 'Закрыть' : 'Меню';
    const strokeColor = isOpen ? '#3366FF' : '#90999E';

    const handleZlineClick = (e) => {
        e.preventDefault();
        setShowZlineModal(true);
    };
    useEffect(() => {
        blockContent(showZlineModal);
        return () => blockContent(false);
    }, [showZlineModal]);
    return (
        <nav className={`header__nav${!isMobile ? `--desktop` : ``}`}>
            {isMobile ?
                <>
                    <ClickGuard value={isOpen}
                        callback={() => setIsOpen(false)} />

                    <div className={'header__nav-burger'}
                        onClick={() => {
                            setIsOpen(!isOpen);
                            needChangeIsOpen(!isOpen);
                        }}>
                        <div>
                            {
                                isOpen ? <svg width='20' height='20' viewBox='0 0 20 20' fill='none'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <line y1='1' x1='1' x2='20' y2='20' stroke={strokeColor} strokeWidth='1.32' />
                                    <line y1='20' x1='1' x2='20' y2='1' stroke={strokeColor} strokeWidth='1.32' />
                                </svg> : <svg width='20' height='14' viewBox='0 0 20 14' fill='none'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <line y1='1.34' x2='20' y2='1.34' stroke={strokeColor} strokeWidth='1.32' />
                                    <line y1='7.34' x2='20' y2='7.34' stroke={strokeColor} strokeWidth='1.32' />
                                    <line y1='13.34' x2='20' y2='13.34' stroke={strokeColor} strokeWidth='1.32' />
                                </svg>
                            }
                        </div>
                        <span className={isOpen ? 'header__nav-menu _open' : 'header__nav-menu'}>{menuTitle}</span>
                    </div>
                    <ul className={`header__nav-list${isOpen ? ' _open' : ''}`}>
                        <h3 className='headerPopupH3'>Меню</h3>
                        {mainNav.map((navItem, i, arr) => <li className='header__nav-item' key={navItem.id}>
                            {navItem.children ?
                                <NavSublist setIsOpen={setIsOpen} navItem={navItem} /> :
                                <NavLink
                                    to={navItem.to}
                                    exact={navItem.exact}
                                    className={navItem.disabled ? '_disabled' : ''}
                                    onClick={e => navItem.disabled ? e.preventDefault() : setIsOpen(false)}
                                >
                                    {navItem.image}
                                    <span>{navItem.name}</span>
                                </NavLink>
                            }
                        </li>
                        )}
                        <li className='widget-login__item popup-menu'
                            onClick={() => setIsOpen(false)}>
                            <a href='https://help.rkf.online/ru/knowledge_base/art/146/cat/3/'
                                target='_blank'
                                rel='noopener noreferrer'>
                                <span>База знаний</span>
                            </a>
                            <Feedback />
                        </li>
                        <li className='header__nav-item __about'>
                            <NavLink to='/about' exact={false}>
                                <svg width="19" height="19" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.2516 7.74301C7.97133 7.74301 7.74301 7.96834 7.74301 8.2516V13.7484C7.74301 14.0287 7.96834 14.257 8.2516 14.257H13.7484C14.0239 14.257 14.252 14.0289 14.2476 13.7479L14.2474 13.7389H14.2475V8.2516C14.2475 7.97133 14.0222 7.74301 13.7389 7.74301H8.2516ZM6.61093 8.2516C6.61093 7.3366 7.35264 6.61093 8.2516 6.61093H13.7389C14.6539 6.61093 15.3796 7.35264 15.3796 8.2516V13.7348C15.3914 14.6498 14.6506 15.3891 13.7484 15.3891H8.2516C7.3366 15.3891 6.61093 14.6474 6.61093 13.7484V8.2516Z" fill="#8F989D" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.51271 5.00411C5.23243 5.00411 5.00411 5.22945 5.00411 5.51271V16.4873C5.00411 16.7676 5.22945 16.9959 5.51271 16.9959H16.4873C16.7738 16.9959 16.9959 16.7738 16.9959 16.4873V5.51271C16.9959 5.23243 16.7706 5.00411 16.4873 5.00411H5.51271ZM3.87204 5.51271C3.87204 4.59771 4.61374 3.87204 5.51271 3.87204H16.4873C17.4023 3.87204 18.128 4.61375 18.128 5.51271V16.4873C18.128 17.399 17.399 18.128 16.4873 18.128H5.51271C4.59771 18.128 3.87204 17.3863 3.87204 16.4873V5.51271Z" fill="#8F989D" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M10.1871 10.1871V11.8129H11.8129V10.1871H10.1871ZM9.05499 10.1631C9.05499 9.56217 9.53972 9.05499 10.1631 9.05499H11.8369C12.4378 9.05499 12.945 9.53972 12.945 10.1631V11.8369C12.945 12.4443 12.4443 12.945 11.8369 12.945H10.1631C9.56217 12.945 9.05499 12.4603 9.05499 11.8369V10.1631Z" fill="#8F989D" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.96112 1C5.27373 1 5.52716 1.25342 5.52716 1.56604V2.5741C5.52716 2.88672 5.27373 3.14014 4.96112 3.14014C4.6485 3.14014 4.39508 2.88672 4.39508 2.5741V1.56604C4.39508 1.25342 4.6485 1 4.96112 1Z" fill="#8F989D" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.37668 1C7.68929 1 7.94271 1.25342 7.94271 1.56604V2.5741C7.94271 2.88672 7.68929 3.14014 7.37668 3.14014C7.06406 3.14014 6.81064 2.88672 6.81064 2.5741V1.56604C6.81064 1.25342 7.06406 1 7.37668 1Z" fill="#8F989D" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M9.79222 1C10.1048 1 10.3583 1.25342 10.3583 1.56604V2.5741C10.3583 2.88672 10.1048 3.14014 9.79222 3.14014C9.4796 3.14014 9.22618 2.88672 9.22618 2.5741V1.56604C9.22618 1.25342 9.4796 1 9.79222 1Z" fill="#8F989D" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12.2078 1C12.5204 1 12.7738 1.25342 12.7738 1.56604V2.5741C12.7738 2.88672 12.5204 3.14014 12.2078 3.14014C11.8952 3.14014 11.6417 2.88672 11.6417 2.5741V1.56604C11.6417 1.25342 11.8952 1 12.2078 1Z" fill="#8F989D" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M14.6233 1C14.9359 1 15.1893 1.25342 15.1893 1.56604V2.5741C15.1893 2.88672 14.9359 3.14014 14.6233 3.14014C14.3107 3.14014 14.0573 2.88672 14.0573 2.5741V1.56604C14.0573 1.25342 14.3107 1 14.6233 1Z" fill="#8F989D" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M17.0389 1C17.3515 1 17.6049 1.25342 17.6049 1.56604V2.5741C17.6049 2.88672 17.3515 3.14014 17.0389 3.14014C16.7262 3.14014 16.4728 2.88672 16.4728 2.5741V1.56604C16.4728 1.25342 16.7262 1 17.0389 1Z" fill="#8F989D" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.96112 18.8694C5.27373 18.8694 5.52716 19.1228 5.52716 19.4354V20.4339C5.52716 20.7466 5.27373 21 4.96112 21C4.6485 21 4.39508 20.7466 4.39508 20.4339V19.4354C4.39508 19.1228 4.6485 18.8694 4.96112 18.8694Z" fill="#8F989D" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.37668 18.8694C7.68929 18.8694 7.94271 19.1228 7.94271 19.4354V20.4339C7.94271 20.7466 7.68929 21 7.37668 21C7.06406 21 6.81064 20.7466 6.81064 20.4339V19.4354C6.81064 19.1228 7.06406 18.8694 7.37668 18.8694Z" fill="#8F989D" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M9.79222 18.8694C10.1048 18.8694 10.3583 19.1228 10.3583 19.4354V20.4339C10.3583 20.7466 10.1048 21 9.79222 21C9.4796 21 9.22618 20.7466 9.22618 20.4339V19.4354C9.22618 19.1228 9.4796 18.8694 9.79222 18.8694Z" fill="#8F989D" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12.2078 18.8694C12.5204 18.8694 12.7738 19.1228 12.7738 19.4354V20.4339C12.7738 20.7466 12.5204 21 12.2078 21C11.8952 21 11.6417 20.7466 11.6417 20.4339V19.4354C11.6417 19.1228 11.8952 18.8694 12.2078 18.8694Z" fill="#8F989D" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M14.6233 18.8694C14.9359 18.8694 15.1893 19.1228 15.1893 19.4354V20.4339C15.1893 20.7466 14.9359 21 14.6233 21C14.3107 21 14.0573 20.7466 14.0573 20.4339V19.4354C14.0573 19.1228 14.3107 18.8694 14.6233 18.8694Z" fill="#8F989D" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M17.0389 18.8694C17.3515 18.8694 17.6049 19.1228 17.6049 19.4354V20.4339C17.6049 20.7466 17.3515 21 17.0389 21C16.7262 21 16.4728 20.7466 16.4728 20.4339V19.4354C16.4728 19.1228 16.7262 18.8694 17.0389 18.8694Z" fill="#8F989D" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M18.8694 4.96112C18.8694 4.6485 19.1228 4.39508 19.4354 4.39508H20.4339C20.7466 4.39508 21 4.6485 21 4.96112C21 5.27373 20.7466 5.52716 20.4339 5.52716H19.4354C19.1228 5.52716 18.8694 5.27373 18.8694 4.96112Z" fill="#8F989D" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M18.8694 7.37668C18.8694 7.06406 19.1228 6.81064 19.4354 6.81064H20.4339C20.7466 6.81064 21 7.06406 21 7.37668C21 7.68929 20.7466 7.94271 20.4339 7.94271H19.4354C19.1228 7.94271 18.8694 7.68929 18.8694 7.37668Z" fill="#8F989D" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M18.8694 9.79222C18.8694 9.4796 19.1228 9.22618 19.4354 9.22618H20.4339C20.7466 9.22618 21 9.4796 21 9.79222C21 10.1048 20.7466 10.3583 20.4339 10.3583H19.4354C19.1228 10.3583 18.8694 10.1048 18.8694 9.79222Z" fill="#8F989D" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M18.8694 12.2078C18.8694 11.8952 19.1228 11.6417 19.4354 11.6417H20.4339C20.7466 11.6417 21 11.8952 21 12.2078C21 12.5204 20.7466 12.7738 20.4339 12.7738H19.4354C19.1228 12.7738 18.8694 12.5204 18.8694 12.2078Z" fill="#8F989D" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M18.8694 14.6233C18.8694 14.3107 19.1228 14.0573 19.4354 14.0573H20.4339C20.7466 14.0573 21 14.3107 21 14.6233C21 14.9359 20.7466 15.1893 20.4339 15.1893H19.4354C19.1228 15.1893 18.8694 14.9359 18.8694 14.6233Z" fill="#8F989D" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M18.8694 17.0389C18.8694 16.7262 19.1228 16.4728 19.4354 16.4728H20.4339C20.7466 16.4728 21 16.7262 21 17.0389C21 17.3515 20.7466 17.6049 20.4339 17.6049H19.4354C19.1228 17.6049 18.8694 17.3515 18.8694 17.0389Z" fill="#8F989D" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M1 4.96112C1 4.6485 1.25342 4.39508 1.56604 4.39508H2.5741C2.88672 4.39508 3.14014 4.6485 3.14014 4.96112C3.14014 5.27373 2.88672 5.52716 2.5741 5.52716H1.56604C1.25342 5.52716 1 5.27373 1 4.96112Z" fill="#8F989D" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M1 7.37668C1 7.06406 1.25342 6.81064 1.56604 6.81064H2.5741C2.88672 6.81064 3.14014 7.06406 3.14014 7.37668C3.14014 7.68929 2.88672 7.94271 2.5741 7.94271H1.56604C1.25342 7.94271 1 7.68929 1 7.37668Z" fill="#8F989D" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M1 9.79222C1 9.4796 1.25342 9.22618 1.56604 9.22618H2.5741C2.88672 9.22618 3.14014 9.4796 3.14014 9.79222C3.14014 10.1048 2.88672 10.3583 2.5741 10.3583H1.56604C1.25342 10.3583 1 10.1048 1 9.79222Z" fill="#8F989D" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M1 12.2078C1 11.8952 1.25342 11.6417 1.56604 11.6417H2.5741C2.88672 11.6417 3.14014 11.8952 3.14014 12.2078C3.14014 12.5204 2.88672 12.7738 2.5741 12.7738H1.56604C1.25342 12.7738 1 12.5204 1 12.2078Z" fill="#8F989D" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M1 14.6233C1 14.3107 1.25342 14.0573 1.56604 14.0573H2.5741C2.88672 14.0573 3.14014 14.3107 3.14014 14.6233C3.14014 14.9359 2.88672 15.1893 2.5741 15.1893H1.56604C1.25342 15.1893 1 14.9359 1 14.6233Z" fill="#8F989D" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M1 17.0389C1 16.7262 1.25342 16.4728 1.56604 16.4728H2.5741C2.88672 16.4728 3.14014 16.7262 3.14014 17.0389C3.14014 17.3515 2.88672 17.6049 2.5741 17.6049H1.56604C1.25342 17.6049 1 17.3515 1 17.0389Z" fill="#8F989D" />
                                </svg>
                                <span>O RKF.Online</span>
                            </NavLink>
                        </li>
                        {/*{!isAuthenticated && <li className="header__nav-item"><Feedback /></li>}*/}
                    </ul>
                </>
                :
                <>
                    <ul className={`header__nav-list--desktop ${isAuthenticated ? ` _uthenticated` : ``}`}>
                        {mainNav.map(navItem => {
                            return (
                                <li className='header__nav-item--desktop' key={navItem.id}>
                                    <MenuLink  {...navItem} />
                                </li>
                            );
                        })}
                        {!isMobile &&
                            <li className='header__nav-item--desktop Feedback'><Feedback isMainNav title='Поддержка' /></li>
                        }
                    </ul>
                    {/*{!isMobile &&*/}
                    {/*<div className="header__nav-item--desktop Feedback"><Feedback isMainNav title='Поддержка'/></div>*/}
                    {/*}*/}
                    <Link to="" className='header__nav-item--desktop recording' onClick={e => handleZlineClick(e)}>
                        <svg width='23' height='24' viewBox='0 0 23 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path
                                d='M20.6696 5.51138V2.97113C20.6696 1.8884 19.7951 1 18.6985 1H2.97113C1.87451 1 1 1.87451 1 2.97113V22.6408C1 23.7235 1.87451 24.6119 2.97113 24.6119H18.7124C19.7951 24.6119 20.6835 23.7374 20.6835 22.6408V11.7579'
                                stroke='#8F989D' strokeWidth='1.6' strokeMiterlimit='10' strokeLinejoin='round' />
                            <path
                                d='M12.2576 16.9633L15.256 17.1854L23.1405 9.30084C23.9039 8.53738 23.9039 7.28807 23.1405 6.52461L22.6963 6.08041C21.9328 5.31695 20.6835 5.31695 19.92 6.08041L12.0355 13.9649L12.2576 16.9633Z'
                                stroke='#8F989D' strokeWidth='1.6' strokeMiterlimit='10' strokeLinejoin='round' />
                            <path d='M5.21985 5.51123H16.3248' stroke='#8F989D' strokeWidth='1.6' strokeMiterlimit='10'
                                strokeLinejoin='round' />
                            <path d='M5.21985 9.71729H15.7834' stroke='#8F989D' strokeWidth='1.6' strokeMiterlimit='10'
                                strokeLinejoin='round' />
                            <path d='M5.21985 13.9233H12.0355' stroke='#8F989D' strokeWidth='1.6' strokeMiterlimit='10'
                                strokeLinejoin='round' />
                            <path d='M5.21985 18.1294H9.55078' stroke='#8F989D' strokeWidth='1.6' strokeMiterlimit='10'
                                strokeLinejoin='round' />
                        </svg>
                        <span>Записаться</span>
                    </Link>
                </>
            }
            <ZlineModal showModal={showZlineModal}
                handleClose={() => {
                    setShowZlineModal(false);
                    if(!isMobile) {
                        setOpen(false)
                    }
                }}
            >
                <iframe src={'https://zline.me/widgets/registration-for-service?id=33'} title="unique_iframe" />
            </ZlineModal>
        </nav>
    );
};

export default React.memo(connectAuthVisible(Nav));