import React from "react";
import {formatDateWithLocaleString, transformDate, capitalizeFirstLetter} from "utils/datetime";
import ListItem from "../ListItem";
import './RenderDate.scss'

function RenderDateExhibitions({exhibitions}) {
    return exhibitions.map(exhibition => <ListItem key={exhibition.id} {...exhibition}/>)
}

export default function RenderDate(props) {
    const {items, ...restDate} = props;
    return (
        <React.Fragment>
            <div className="ExhibitionsList__date"> {capitalizeFirstLetter(formatDateWithLocaleString(transformDate(restDate)))}</div>
            <RenderDateExhibitions exhibitions={items}/>
        </React.Fragment>
    )
}