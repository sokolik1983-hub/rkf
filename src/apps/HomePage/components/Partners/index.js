import React from 'react'
import Container from 'components/Layout/Container'
import './styles.scss'


const Partners = ({ title, items = [] }) =>
    <Container pad className="Partners">
        <div className="Partners__row">
            <h3>{title}</h3>
            {
                items.map((item, index) => {
                    return (
                        item.link
                            ? <a className="Partners__row-item" href={item.link} alt={item.title} key={index}>
                                <img src={item.image} alt={item.title} />
                            </a>
                            : <div className="Partners__row-item" key={index}>
                                <img src={item.image} alt={item.title} />
                            </div>
                    );
                })
            }
        </div>
    </Container>

export default Partners;