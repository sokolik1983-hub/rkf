import React from 'react'
import classnames from 'classnames'

const ICON_CLASSNAME = 'btn-i';

const Svg = ({children, className, ...restProps}) =>
    <svg
        className={classnames(
            ICON_CLASSNAME,
            {[className]: className}
        )}
        {...restProps}
    >
        {children}
    </svg>;

const Path = ({d}) =>
    <path
        d={d}
        fill='currentColor'
        fillRule='evenodd'
        clipRule='evenodd'
    />;

export const BtnPus = ({className}) =>
    <Svg className={className}
         width="20" height="20" viewBox="0 0 20 20">
        <Path
            d="M10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7362 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0ZM11 5H9V9H5V11H9V15H11V11H15V9H11V5Z"
        />
    </Svg>;

export const BtnEdit = ({className}) =>
    <Svg className={className}
         width="15" height="15" viewBox="0 0 15 15"
    >
        <Path
            d="M14.7563 3.36828C15.0812 3.04333 15.0812 2.50174 14.7563 2.19345L12.8066 0.243716C12.4983 -0.0812387 11.9567 -0.0812387 11.6317 0.243716L10.0986 1.7685L13.2232 4.89307L14.7563 3.36828ZM0 11.8754V15H3.12457L12.34 5.77628L9.21539 2.65171L0 11.8754Z"
        />
    </Svg>;

export const BtnSend = ({className}) =>
    <Svg
        className={className}
        width="15" height="13" viewBox="0 0 15 13">
        <Path d="M0 12.8571L15 6.42857L0 0V5L10.7143 6.42857L0 7.85714V12.8571Z"/>
    </Svg>;

export const BtnWatch = ({className}) =>
    <Svg
        className={className}
        width="16" height="11" viewBox="0 0 16 11">
        <Path
            d="M8 3.27273C7.42135 3.27273 6.86639 3.5026 6.45722 3.91177C6.04805 4.32094 5.81818 4.87589 5.81818 5.45455C5.81818 6.0332 6.04805 6.58815 6.45722 6.99732C6.86639 7.4065 7.42135 7.63636 8 7.63636C8.57865 7.63636 9.13361 7.4065 9.54278 6.99732C9.95195 6.58815 10.1818 6.0332 10.1818 5.45455C10.1818 4.87589 9.95195 4.32094 9.54278 3.91177C9.13361 3.5026 8.57865 3.27273 8 3.27273ZM8 9.09091C7.03558 9.09091 6.11065 8.70779 5.4287 8.02584C4.74675 7.34389 4.36364 6.41897 4.36364 5.45455C4.36364 4.49012 4.74675 3.5652 5.4287 2.88325C6.11065 2.2013 7.03558 1.81818 8 1.81818C8.96442 1.81818 9.88935 2.2013 10.5713 2.88325C11.2532 3.5652 11.6364 4.49012 11.6364 5.45455C11.6364 6.41897 11.2532 7.34389 10.5713 8.02584C9.88935 8.70779 8.96442 9.09091 8 9.09091V9.09091ZM8 0C4.36364 0 1.25818 2.26182 0 5.45455C1.25818 8.64727 4.36364 10.9091 8 10.9091C11.6364 10.9091 14.7418 8.64727 16 5.45455C14.7418 2.26182 11.6364 0 8 0Z"
        />
    </Svg>;


export const BtnDelete = ({className}) =>
    <Svg
        className={className}
        width="11.6" height="15" viewBox="0 0 14 18">
        <Path
            d="M14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1ZM1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16Z"
        />
    </Svg>;


