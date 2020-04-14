import React from "react";
import { FormField } from "components/Form";
import Button from "components/Button";
import HideIf from "components/HideIf";

const PuppyItem = ({puppy, i, j, activePuppy, activateClick, deleteClick, sexTypes, error, cantEdit, litterStatuses, puppyCount}) => {
    let sex = sexTypes && sexTypes.find(f => f.value === puppy.dog_sex_type_id);
    sex = sex ? sex.label : '';
    return <>
<tr className={`DocItem ${error ? 'error' : ''}`}>
    <td>{puppy.dog_name}</td>
    <td>{puppy.dog_color}</td>
    <td>{sex}</td>
    <td>{puppy.stamp_number}</td>
    <td>
        <img className={`DocItem__chevron ${activePuppy === j ? 'active' : ''}`} src="/static/icons/chevron_left.svg" onClick={activateClick} alt=""/>
    </td>
</tr>
<tr className={`DocItem collapse ${activePuppy === j ? 'active' : ''}`}>
    <td colSpan="5">
        <FormField disabled={cantEdit} name={`declarants[${i}].litters[${j}].dog_name`} label='Кличка'/>
        <FormField disabled={cantEdit} name={`declarants[${i}].litters[${j}].dog_name_lat`} label='Кличка латиницей'/>
        <FormField disabled={cantEdit} name={`declarants[${i}].litters[${j}].dog_color`} label='Окрас'/>
        <FormField disabled={cantEdit} name={`declarants[${i}].litters[${j}].dog_sex_type_id`} label='Пол' options={sexTypes} fieldType="reactSelect" placeholder="Выберите..."/>
        <FormField disabled={cantEdit} name={`declarants[${i}].litters[${j}].stamp_number`} label='Код клейма'/>
        <FormField disabled={cantEdit} name={`declarants[${i}].litters[${j}].chip_number`} label='Номер чипа (опционально)'/>
        <FormField disabled={cantEdit} name={`declarants[${i}].litters[${j}].litter_dog_status_id`} label='Статус щенка' fieldType="reactSelect" options={litterStatuses} placeholder="Выберите..." />
        <HideIf cond={![2,4].includes(puppy.litter_dog_status_id)}>
            <FormField disabled={cantEdit} name={`declarants[${i}].litters[${j}].status_comment`} label='Комментарий'/>
        </HideIf>
        <HideIf cond={cantEdit || (puppyCount < 2)}>
            <Button className="btn-red" onClick={deleteClick} title="Удалить">Удалить</Button>
        </HideIf>
    </td>
</tr></>;}

export default React.memo(PuppyItem);
