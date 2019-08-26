import React from 'react'
import Container from 'components/Layout/Container'
import './styles.scss'


const Partners = ({ title, items = [] }) =>
    <Container pad className="Partners">
        <div className="Partners__row">
            <h3>{title}</h3>
            {
                items.map((i) => {
                    return (i.link
                        ? <a class="Partners__row-item" href={i.link} alt={i.title}><img src={i.image} alt={i.title} /></a>
                        : <div class="Partners__row-item"><img src={i.image} alt={i.title} /></div>
                    );
                })
            }
        </div>
    </Container>

export default Partners;