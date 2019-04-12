import React from 'react'
import Card from './Card'


const Cards = ({cards = []}) =>
    <div className="cards__list">{
        cards.map((card, index) => <Card key={index} {...card}/>)
    }
    </div>;

export default Cards;