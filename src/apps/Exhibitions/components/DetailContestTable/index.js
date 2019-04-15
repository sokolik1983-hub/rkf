import React from 'react'

import './index.scss'

const ContestTableRow = ({category}) =>
    <tr id={category.id}>
        <td>{category.name}</td>
        <td>{category.price}</td>
    </tr>;

const ContestTable = ({categories}) =>
    <table className="contest-price-table">
        <thead>
        <tr>
            <td>Конкурсы</td>
            <td></td>
        </tr>
        </thead>
        <tbody>
        {
            categories.map(category => <ContestTableRow key={category.id} category={category}/>)
        }
        </tbody>
    </table>;

export default ContestTable;