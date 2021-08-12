import OutsideClickHandler from 'react-outside-click-handler';
import Card from '../../../../components/Card';
import { Link as LinkScroll } from 'react-scroll';
import React from 'react';

function SearchCard({ handleActiveReset, setCardClicked, userType, isAuthenticated }) {
    return (
        <>
            <OutsideClickHandler onOutsideClick={handleActiveReset}>
                <Card className='menu-component__card'>
                    <h3 className='menu-component__title'>Поиск</h3>
                    <ul className='menu-component__list'>


                        <li className='menu-component__item'>
                            <LinkScroll
                                to='global-search-anchor'
                                spy={true}
                                smooth={true}
                                offset={-60}
                                duration={500}
                                className='menu-component__link'
                                title='Глобальный поиск'
                                onClick={() => {
                                    handleActiveReset();
                                    setCardClicked(8);
                                }}
                            >
                                <span className='menu-component__icon'>
                                   <svg width='19' height='20' viewBox='0 0 19 20' fill='none'
                                        xmlns='http://www.w3.org/2000/svg'>
                                        <path
                                            d='M7.36116 14.7223C3.30105 14.7223 0 11.4213 0 7.36116C0 3.30105 3.30105 0 7.36116 0C11.4213 0 14.7223 3.30105 14.7223 7.36116C14.7223 11.4213 11.4213 14.7223 7.36116 14.7223ZM7.36116 1.76527C4.27195 1.76527 1.76527 4.27195 1.76527 7.36116C1.76527 10.4504 4.27195 12.9571 7.36116 12.9571C10.4504 12.9571 12.9571 10.4504 12.9571 7.36116C12.9571 4.27195 10.4416 1.76527 7.36116 1.76527Z'
                                            fill='#72839C' />
                                        <path
                                            d='M12.5529 11.3232L11.3047 12.5714L17.7517 19.0185L19 17.7702L12.5529 11.3232Z'
                                            fill='#72839C' />
                                        </svg>

                                </span>
                                Глобальный поиск
                            </LinkScroll>
                        </li>


                        <li className='menu-component__item'>
                            <LinkScroll
                                to='found-info-anchor'
                                spy={true}
                                smooth={true}
                                offset={-60}
                                duration={500}
                                className='menu-component__link'
                                title='Информация о найденных собаках'
                                onClick={() => {
                                    handleActiveReset();
                                    setCardClicked(1);
                                }}
                            >
                                <span className='menu-component__icon'>
                                    <svg width='19' height='19' viewBox='0 0 19 19' fill='none'
                                         xmlns='http://www.w3.org/2000/svg'>
                                        <path
                                            d='M9.5 0C4.27562 0 0 4.27562 0 9.5C0 14.7244 4.27562 19 9.5 19C14.7244 19 19 14.7244 19 9.5C19 4.27562 14.7244 0 9.5 0ZM10.4512 14.2512H8.55124V8.54876H10.4512V14.2512ZM10.4512 6.64876H8.55124V4.74876H10.4512V6.64876Z'
                                            fill='#72839C' />
                                    </svg>
                                </span>
                                Информация о найденных собаках
                            </LinkScroll>
                        </li>
                        <li className='menu-component__item'>
                            <LinkScroll
                                to='check-status-anchor'
                                spy={true}
                                smooth={true}
                                offset={-60}
                                duration={500}
                                className='menu-component__link'
                                title='Статус документов'
                                onClick={() => {
                                    handleActiveReset();
                                    setCardClicked(2);
                                }}
                            >
                                <span className='menu-component__icon'>
                                    <svg width='19' height='19' viewBox='0 0 19 19' fill='none'
                                         xmlns='http://www.w3.org/2000/svg'>
                                        <g clipPath='url(#clip0)'>
                                            <path
                                                d='M3.67645 0V1.74936H15.8977V17.3235H17.647C17.647 17.202 17.647 0.485934 17.647 0C17.2826 0 4.0409 0 3.67645 0Z'
                                                fill='#72839C' />
                                            <path
                                                d='M2 19H14.8043V2.867H2V19ZM4.76982 6.19565H12.0102V7.3133H4.76982V6.19565ZM4.76982 8.98977H12.0102V10.1074H4.76982V8.98977ZM4.76982 11.7596H12.0102V12.8772H4.76982V11.7596ZM4.76982 14.5537H12.0102V15.6714H4.76982V14.5537Z'
                                                fill='#72839C' />
                                        </g>
                                        <defs>
                                            <clipPath id='clip0'>
                                                <rect width='15.6471' height='19' fill='white'
                                                      transform='translate(2)' />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </span>
                                Статус документов
                            </LinkScroll>
                        </li>
                        <li className='menu-component__item'>
                            <LinkScroll
                                to='check-registration-anchor'
                                spy={true}
                                smooth={true}
                                offset={-60}
                                duration={500}
                                className='menu-component__link'
                                title='Регистационные данные собаки'
                                onClick={() => {
                                    handleActiveReset();
                                    setCardClicked(3);
                                }}
                            >
                                <span className='menu-component__icon'>
                                    <svg width='19' height='19' viewBox='0 0 19 19' fill='none'
                                         xmlns='http://www.w3.org/2000/svg'>
                                        <path
                                            d='M13.8655 8.46722C13.683 6.96988 11.4914 5.73607 8.65933 5.56078C8.65933 5.56078 7.15562 4.44596 7.05468 2.52162C7.03812 2.23029 6.81232 1.94073 6.51906 2.01052C5.7623 2.19007 4.4774 3.12699 4.41337 7.40599C4.41337 7.40599 0.29743 9.40852 0 15.1818C2.63836 16.7105 5.71287 17.6072 8.99453 17.6593L8.95774 16.8323C8.94412 16.541 9.1633 16.2215 9.44602 16.1194L12.9519 14.8514C12.9519 14.8514 16.8503 15.0725 17.5342 13.8821C17.8805 13.282 18.6093 12.8872 18.846 12.6171C19.0396 12.3948 19.0627 11.5551 18.846 11.352C18.1297 10.6853 14.0019 9.58618 13.8655 8.46722ZM11.7858 9.91655C11.4458 9.91655 11.1699 9.65171 11.1699 9.32265C11.1699 8.99288 11.4458 8.72745 11.7858 8.72745C12.1271 8.72745 12.403 8.99288 12.403 9.32265C12.4031 9.65159 12.1272 9.91655 11.7858 9.91655Z'
                                            fill='#72839C' />
                                    </svg>
                                </span>
                                Регистационные данные собаки
                            </LinkScroll>
                        </li>
                        <li className='menu-component__item'>
                            <LinkScroll
                                to='stamp-search-anchor'
                                spy={true}
                                smooth={true}
                                offset={-60}
                                duration={500}
                                className='menu-component__link'
                                title='Поиск клуба/питомника'
                                onClick={() => {
                                    handleActiveReset();
                                    setCardClicked(4);
                                }}
                            >
                                <span className='menu-component__icon'>
                                    <svg width='19' height='19' viewBox='0 0 19 19' fill='none'
                                         xmlns='http://www.w3.org/2000/svg'>
                                        <path d='M2.32454 2H0V17.0789H2.32454V2Z' fill='#72839C' />
                                        <path d='M9.99893 2H6.91693V17.0789H9.99893V2Z' fill='#72839C' />
                                        <path d='M19 2H15.918V17.0789H19V2Z' fill='#72839C' />
                                        <path d='M4.50619 2H3.34052V17.0789H4.50619V2Z' fill='#72839C' />
                                        <path d='M14.0742 2H12.9086V17.0789H14.0742V2Z' fill='#72839C' />
                                    </svg>
                                </span>
                                Поиск клуба/питомника по клейму
                            </LinkScroll>
                        </li>
                        {isAuthenticated && (userType === 3 || userType === 4 || userType === 5) &&
                        <li className='menu-component__item'>
                            <LinkScroll
                                to='check-status__letter'
                                spy={true}
                                smooth={true}
                                offset={-60}
                                duration={500}
                                className='menu-component__link'
                                title='Информация о помётах'
                                onClick={() => {
                                    handleActiveReset();
                                    setCardClicked(5);
                                }}
                            >
                                <span className='menu-component__icon'>
                                    <svg width='19' height='19' viewBox='0 0 19 19' fill='none'
                                         xmlns='http://www.w3.org/2000/svg'>
                                        <path fillRule='evenodd' clipRule='evenodd'
                                              d='M10.5071 17.0413C11.3846 17.0413 12.0991 17.6512 12.1275 18.4122C12.1378 18.6834 11.9192 18.9097 11.648 18.9097H10.0286C7.56109 18.9097 4.40065 19.514 2.4853 17.5956C1.49799 16.6077 0.928798 15.2358 1.00716 13.7783C1.08038 12.4151 1.7965 11.1654 2.88951 10.4142C3.25505 10.1631 3.64791 10.7148 3.29062 10.9777C2.46416 11.5856 1.91921 12.5368 1.86146 13.6045C1.79908 14.7682 2.25536 15.8658 3.04985 16.6526C2.73071 12.5703 6.8496 11.1494 8.16946 8.29468C8.31588 7.9776 8.40559 7.67445 8.45096 7.37799C10.4653 7.81881 12.955 6.41388 10.7581 2.43522C14.0944 9.90429 2.11925 7.15888 8.29629 1.92017C9.33981 -0.0142481 12.1229 -0.808741 14.2738 1.06793C14.9466 1.65465 15.4503 1.99854 16.3711 1.94182C16.7501 1.91759 17.1811 1.91244 17.5425 1.99751C17.6637 1.76498 17.907 1.60567 18.1875 1.60567C18.5891 1.60567 18.9145 1.931 18.9145 2.33263C18.9145 2.68837 18.6587 2.98431 18.3215 3.04721C18.2958 3.23951 18.2303 3.46327 18.1158 3.72415C17.2579 5.67713 15.8535 6.15815 14.047 6.52421C12.6147 6.81551 13.6814 7.75642 14.1434 9.19744C14.8786 11.4897 13.8531 12.9431 13.5969 14.6053C13.4685 15.4415 13.3123 17.0413 14.5486 17.0413C15.4261 17.0413 16.1407 17.6512 16.169 18.4122C16.1794 18.6834 15.9608 18.9097 15.6896 18.9097H13.4082C12.5987 18.9097 11.9202 17.3311 11.5903 15.9241C11.9135 15.2801 12.0027 14.5717 11.7877 13.9118C11.2959 12.4002 9.39446 11.7139 7.54201 12.379C7.1476 12.5208 6.78722 12.7126 6.4686 12.941C6.84754 12.7126 7.28113 12.5399 7.75185 12.444C9.55428 12.0759 11.2216 12.9642 11.4748 14.4279C11.6547 15.4663 11.0618 16.4567 10.2348 17.0614C10.3235 17.0485 10.4143 17.0413 10.5071 17.0413ZM13.5685 1.94028C13.7644 1.96863 13.9134 2.12124 13.9536 2.31149C13.9547 2.3053 13.9557 2.2986 13.9567 2.2919C14.0134 1.89955 13.7562 1.53762 13.3819 1.48297C13.0076 1.42883 12.6575 1.7026 12.6008 2.09495C12.5436 2.4873 12.8013 2.84923 13.1756 2.90388C13.2494 2.9147 13.3221 2.91264 13.3922 2.89924C13.1571 2.8451 13.0004 2.61 13.0375 2.35583C13.0756 2.08979 13.3138 1.90316 13.5685 1.94028Z'
                                              fill='#72839C' />
                                    </svg>
                                </span>
                                Информация о помётах
                            </LinkScroll>
                        </li>}
                        <li className='menu-component__item menu-component__item--judge'>
                            <LinkScroll
                                to='referee-search-anchor'
                                spy={true}
                                smooth={true}
                                offset={-60}
                                duration={500}
                                className='menu-component__link'
                                title='Поиск судьи'
                                onClick={() => {
                                    handleActiveReset();
                                    setCardClicked(6);
                                }}
                            >
                                <span className='menu-component__icon'>
                                    <svg width='19' height='19' viewBox='0 0 19 19' fill='none'
                                         xmlns='http://www.w3.org/2000/svg'>
                                        <path
                                            d='M9.5 16.34C7.125 16.34 5.0255 15.124 3.8 13.3C3.8285 11.4 7.6 10.355 9.5 10.355C11.4 10.355 15.1715 11.4 15.2 13.3C13.9745 15.124 11.875 16.34 9.5 16.34ZM9.5 2.85C10.2559 2.85 10.9808 3.15027 11.5153 3.68475C12.0497 4.21922 12.35 4.94413 12.35 5.7C12.35 6.45587 12.0497 7.18078 11.5153 7.71525C10.9808 8.24973 10.2559 8.55 9.5 8.55C8.74413 8.55 8.01922 8.24973 7.48475 7.71525C6.95027 7.18078 6.65 6.45587 6.65 5.7C6.65 4.94413 6.95027 4.21922 7.48475 3.68475C8.01922 3.15027 8.74413 2.85 9.5 2.85ZM9.5 0C8.25244 0 7.0171 0.245725 5.86451 0.723144C4.71191 1.20056 3.66464 1.90033 2.78249 2.78249C1.00089 4.56408 0 6.98044 0 9.5C0 12.0196 1.00089 14.4359 2.78249 16.2175C3.66464 17.0997 4.71191 17.7994 5.86451 18.2769C7.0171 18.7543 8.25244 19 9.5 19C12.0196 19 14.4359 17.9991 16.2175 16.2175C17.9991 14.4359 19 12.0196 19 9.5C19 4.2465 14.725 0 9.5 0Z'
                                            fill='#72839C' />
                                    </svg>

                                </span>
                                Поиск судьи
                            </LinkScroll>
                        </li>
                        <li className='menu-component__item'>
                            <LinkScroll
                                to='publication-search-anchor'
                                spy={true}
                                smooth={true}
                                offset={-60}
                                duration={500}
                                className='menu-component__link'
                                title='Поиск по объявлениям'
                                onClick={() => {
                                    handleActiveReset();
                                    setCardClicked(7);
                                }}
                            >
                                <span className='menu-component__icon'>
                                    <svg width='19' height='19' viewBox='0 0 19 19' fill='none'
                                         xmlns='http://www.w3.org/2000/svg'>
                                        <path
                                            d='M10.55 6.65H15.775L10.55 1.425V6.65ZM3.9 0H11.5L17.2 5.7V17.1C17.2 17.6039 16.9998 18.0872 16.6435 18.4435C16.2872 18.7998 15.8039 19 15.3 19H3.9C2.8455 19 2 18.145 2 17.1V1.9C2 0.8455 2.8455 0 3.9 0ZM12.45 15.2V13.3H3.9V15.2H12.45ZM15.3 11.4V9.5H3.9V11.4H15.3Z'
                                            fill='#72839C' />
                                    </svg>
                                </span>
                                Поиск по объявлениям
                            </LinkScroll>
                        </li>
                    </ul>
                </Card>
            </OutsideClickHandler>
        </>
    );
}

export default SearchCard;