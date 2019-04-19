import React from 'react'

const Item = ({image, title}) => <div className="partners-item"><img src={image} alt={title}/></div>

const PartnersSponsors = ({items = []}) => items.map(item => <Item key={item.id} {...item}/>)

export default PartnersSponsors;