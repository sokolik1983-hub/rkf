import React from "react";
import Card from "../Card";
import "./index.scss";


const BreedsList = ({breeds}) => {

    return (
        <Card className="breeds__wrap">
            <h4>Породы</h4>
            <ul className="breeds__list">
                {breeds.map(item =>
                    <li key={item.id}><span className="breeds__list-item">{item.name}</span></li>
                )}
            </ul>
        </Card>
    );
};

export default React.memo(BreedsList);