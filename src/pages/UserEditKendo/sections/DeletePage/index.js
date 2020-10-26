import React, {useState} from "react";
import {Button} from "@progress/kendo-react-buttons";
import ModalDeletePage from "../../components/ModalDeletePage";
import "./index.scss";


const DeletePage = ({updateInfo}) => {
    const [showModal, setShowModal] = useState(true);

    return (
        <div className="ue-delete-page k-form">
            <h2 className="k-form-legend">Удаление страницы</h2>
            <p className="ue-delete-page__describe">
                При нажатии на кнопку "Удалить" Ваша страница будет <br/>
                безвозвратно удалена в течение 30 календарных дней. <br/>
                Все размещенные Вами данные будут утеряны.
            </p>
            <div className="k-form-buttons">
                <Button primary={true} type="button" onClick={() => setShowModal(true)}>
                    Удалить
                </Button>
            </div>
            {showModal &&
                <ModalDeletePage closeModal={() => setShowModal(false)} updateInfo={updateInfo}/>
            }
        </div>
    )
};

export default React.memo(DeletePage);