import React from 'react'

import './index.scss'

const PriceTableRow = ({category}) =>
    <tr id={category.id}>
        <td>{category.class}</td>
        <td>{category.month1}</td>
        <td>{category.month2}</td>
        <td>{category.month3}</td>
    </tr>;

const PriceTable = ({categories}) =>
    <table className="price-table">
        <thead>
        <tr>
            <td>Выставочные классы</td>
            <td>До 15 марта</td>
            <td>До 15 апреля</td>
            <td>До 15 мая</td>
        </tr>
        </thead>
        <tbody>
        {
            categories.map(category => <PriceTableRow key={category.id} category={category}/>)
        }
        </tbody>
    </table>;

export default PriceTable;