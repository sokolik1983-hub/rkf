import ScheduleDayItem from "./index";
import Button from "components/Button";
import {BtnDelete, BtnEdit} from "components/Svg";
import React from "react";

const ItemRow = ({item, onEdit, onDelete}) => {
    const deleteItem = () => onDelete(item);
    const editItem = () => onEdit(item);
    return (
        <div key={item} className="flex-row">

            <ScheduleDayItem itemId={item}/>

            <Button
                style={{marginLeft: 'auto'}}
                className="btn-z"
                onClick={editItem}
                leftIcon={<BtnEdit/>}
            >
                Изменить
            </Button>
            <Button
                className="btn-z"
                onClick={deleteItem}
                leftIcon={<BtnDelete/>}
            >
                Удалить
            </Button>
        </div>
    )
};

export default ItemRow