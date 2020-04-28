import React from 'react';
import Card from 'components/Card';
import './styles.scss';

const Disclaimer = ({ children, style }) => {
    return <Card className="Disclaimer" style={style}>
        {children}
    </Card >
};

export default Disclaimer;