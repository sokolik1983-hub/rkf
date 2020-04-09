import React from "react";
import { FormField } from "components/Form";
import Button from "components/Button";
import HideIf from "components/HideIf";

const PuppyItem = ({puppy, i, j, activePuppy, activateClick, deleteClick, sexTypes, error, update, view, statusAllowsUpdate, litterStatuses}) => <>
<tr className={`DocItem ${error ? 'error' : ''}`}>
    <td>{puppy.dog_name}</td>
    <td>{puppy.dog_color}</td>
    <td>{sexTypes && sexTypes.find(f => f.id === puppy.dog_sex_type_id)}</td>
    <td>{puppy.stamp_number}</td>
    <td>
        <img className={`DocItem__chevron ${activePuppy === j ? 'active' : ''}`} src="/static/icons/chevron_left.svg" onClick={activateClick} alt=""/>
    </td>
</tr>
<tr className={`DocItem collapse ${activePuppy === j ? 'active' : ''}`}>
    <td colSpan="5">
        <FormField disabled={update} name={`declarants[${i}].litters[${j}].dog_name`} label='Кличка'/>
        <FormField disabled={update} name={`declarants[${i}].litters[${j}].dog_color`} label='Окрас'/>
        <FormField disabled={update} name={`declarants[${i}].litters[${j}].dog_sex_type_id`} label='Пол' options={sexTypes} fieldType="reactSelect" placeholder="Выберите..."/>
        <FormField disabled={update} name={`declarants[${i}].litters[${j}].stamp_number`} label='Номер клейма'/>
        <FormField disabled={update} name={`declarants[${i}].litters[${j}].chip_number`} label='Номер чипа'/>
        <FormField disabled={update} name={`declarants[${i}].litters[${j}].litter_dog_status`} label='Статус щенка' fieldType="reactSelect" options={litterStatuses} placeholder="Выберите..."/>
        <HideIf cond={![2,4].includes(puppy.litter_dog_status)}>
            <FormField disabled={update} name={`declarants[${i}].litters[${j}].status_comment`} label='Комментарий'/>
        </HideIf>
        <HideIf cond={update}>
            <Button className="btn-red" onClick={deleteClick} title="Удалить">Удалить</Button>
        </HideIf>
    </td>
</tr></>;

export default React.memo(PuppyItem);
