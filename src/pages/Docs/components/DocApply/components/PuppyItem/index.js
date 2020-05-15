import React from "react";
import { FormField, FormGroup } from "components/Form";
import Transliteratable from "../../components/Transliteratable";
import DeleteButton from "../../components/DeleteButton";
import Button from "components/Button";
import Modal from "components/Modal";
import HideIf from "components/HideIf";
import "./index.scss";

const PuppyItem = ({puppy, i, j, activePuppy, activateClick, deleteClick, sexTypes, error, cantEdit, litterStatuses, puppyCount}) => {
    let sex = sexTypes && sexTypes.find(f => f.value === puppy.dog_sex_type_id);
    sex = sex ? sex.label : '';
    return <>
<tr className={`DocItem caps ${error ? 'error' : ''}`}>
    <td onClick={activateClick}>{puppy.dog_name}</td>
    <td onClick={activateClick}>{puppy.dog_color}</td>
    <td onClick={activateClick} className="no-caps">{sex}</td>
    <td onClick={activateClick}>{puppy.stamp_number}</td>
    <td onClick={activateClick}>
        <img className={`DocItem__chevron`} src="/static/icons/pen-gray.svg" alt=""/>
    </td>
    <td>
        <DeleteButton onClick={e => deleteClick()} />
    </td>
</tr>
<Modal showModal={activePuppy === j} handleClose={() => activePuppy === j && activateClick()}>
    <div className="puppy-modal-content">
        <Transliteratable disabled={cantEdit} name={`litters[${j}].dog_name`} label='Кличка'/>
        <FormField disabled={cantEdit} name={`litters[${j}].dog_name_lat`} label='Кличка латиницей (опционально)'/>
        <FormGroup inline>
            <FormField disabled={cantEdit} name={`litters[${j}].dog_color`} label='Окрас'/>
            <FormField disabled={cantEdit} name={`litters[${j}].dog_sex_type_id`} label='Пол' options={sexTypes} fieldType="reactSelect" placeholder="Выберите..."/>
        </FormGroup>
        <FormField disabled={cantEdit} name={`litters[${j}].stamp_number`} label='Номер клейма'/>
        <FormGroup inline>
            <FormField disabled={cantEdit} name={`litters[${j}].chip_number`} label='Номер чипа (опционально)'/>
            <FormField disabled={cantEdit} name={`litters[${j}].litter_dog_status_id`} label='Статус щенка' fieldType="reactSelect" options={litterStatuses} placeholder="Выберите..." />
        </FormGroup>
        <HideIf cond={![2,4].includes(puppy.litter_dog_status_id)}>
            <FormField disabled={cantEdit} name={`litters[${j}].status_comment`} label='Комментарий'/>
        </HideIf>
        <div className="flex-row">
            <Button className="btn-primary" onClick={activateClick}>Сохранить</Button>
        </div>
    </div>
</Modal></>;}

export default React.memo(PuppyItem);
