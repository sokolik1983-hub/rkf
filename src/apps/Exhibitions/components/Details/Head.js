import React, {useContext} from 'react'
import Breadcrumbs from "components/Breadcrumbs";
import {Link} from "react-router-dom";
import {ExhibitionsPathContext} from "apps/Exhibitions/context"
export default function ExhibitionDetails__head({name, owner}) {
    const {path}=useContext(ExhibitionsPathContext)
    return (
        <div className="ExhibitionDetails__head">
            <Breadcrumbs>
                <Link className="breadcrumbs__link" to={path}>Выставки</Link>
                <div className="breadcrumbs__link">{name}</div>
            </Breadcrumbs>
            <h1>{name}</h1>
            <div className="exhibition-details__signature--top">
                {/*<div>Организатор: {owner.name}</div>*/}
                {/*{owner.site ?*/}
                {/*    <div><a href="//www.rkf.org.ru">{owner.site}</a></div> : null}*/}
            </div>
        </div>
    )
}