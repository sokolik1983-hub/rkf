import React from "react";
import { FormField, FormGroup } from "components/Form";
import DeleteButton from "../../components/DeleteButton";
import Button from "components/Button";
import Modal from "components/Modal";
import HideIf from "components/HideIf";
import { connect, getIn } from "formik";
import transliterate from "utils/transliterate";
import "./index.scss";

const PuppyItem = ({ formik, puppy, i, j, activePuppy, activateClick, deleteClick, sexTypes, error, cantEdit, litterStatuses, puppyCount }) => {
    let sex = sexTypes && sexTypes.find(f => f.value === puppy.dog_sex_type_id);
    sex = sex ? sex.label : '';
    const allFielsEmpty = p => p && typeof p === 'object' && Object.values(p).filter(f => f).length === 0;
    const handleTransliterate = (field) => formik.setFieldValue(`${field}_lat`, transliterate(getIn(formik.values, field)));
    return <>
        <tr className={`DocItem caps ${error ? 'error' : ''}`}>
            <td onClick={activateClick}>{puppy.dog_name}</td>
            <td onClick={activateClick}>{puppy.dog_color}</td>
            <td onClick={activateClick} className="no-caps">{sex}</td>
            <td onClick={activateClick}>{puppy.stamp_number}</td>
            <td onClick={activateClick}>
                <img className={`DocItem__chevron`} src="/static/icons/pen-gray.svg" alt="" />
            </td>
            <td>
                <DeleteButton onClick={e => deleteClick()} />
            </td>
        </tr>
        <Modal
            iconName={'puppy-white'}
            showModal={activePuppy === j}
            handleClose={() => activePuppy === j && activateClick()}
            handleX={() => activePuppy === j && (activateClick() || (allFielsEmpty(puppy) && deleteClick(true)))}
            headerName = {"Добавление щенка"}
        >
            <div className="puppy-modal-content">
                <FormGroup inline>
                    <FormField disabled={cantEdit} name={`litters[${j}].dog_name`} label='Кличка' />
                    <Button
                        className="btn-primary"
                        onClick={() => handleTransliterate(`litters[${j}].dog_name`)}
                        style={{ alignSelf: 'flex-end', padding: '12px' }}
                    >Транслитерировать</Button>
                </FormGroup>
                <FormField disabled={cantEdit} name={`litters[${j}].dog_name_lat`} label='Кличка латиницей (опционально)' />
                <span className="DocItem__warning">Если данное поле не заполнено, транслитерация клички остается на усмотрение кинолога</span>
                <FormGroup inline>
                    <FormField disabled={cantEdit} name={`litters[${j}].dog_color`} label='Окрас' />
                    <FormField disabled={cantEdit} name={`litters[${j}].dog_sex_type_id`} label='Пол' options={sexTypes} fieldType="reactSelect" placeholder="Выберите..." />
                </FormGroup>
                <FormField disabled={cantEdit} name={`litters[${j}].stamp_number`} label='Номер клейма' />
                <FormGroup inline>
                    <FormField disabled={cantEdit} name={`litters[${j}].chip_number`} label='Номер чипа (опционально)' />
                    <FormField disabled={cantEdit} name={`litters[${j}].litter_dog_status_id`} label='Статус щенка' fieldType="reactSelect" options={litterStatuses} placeholder="Выберите..." />
                </FormGroup>
                <HideIf cond={![2, 4].includes(puppy.litter_dog_status_id)}>
                    <FormField disabled={cantEdit} name={`litters[${j}].status_comment`} label='Комментарий' />
                </HideIf>
                <div className="flex-row">
                    <Button className="btn-primary" onClick={activateClick}>Сохранить</Button>
                </div>
            </div>
        </Modal></>;
}

export default React.memo(connect(PuppyItem));
