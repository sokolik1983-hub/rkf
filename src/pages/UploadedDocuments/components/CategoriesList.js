import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SvgIcon } from "@progress/kendo-react-common";
import { pencil, trash } from "@progress/kendo-svg-icons";
import ModalDeleteCategory from './ModalDeleteCategory';
import ModalEditCategory from './ModalEditCategory';

const CategoriesList = ({ categories, handleError, handleSuccess, getCategories, activeCategoryId, startPage }) => {
    const [modal, setModal] = useState({});
    const isActive = (value) => activeCategoryId === value ? "UploadedDocuments__category-item active" : "UploadedDocuments__category-item";

    return <>
        <ul className="UploadedDocuments__inner-list">
            <li className={isActive(null)}>
                <Link to={startPage}>Все категории</Link>
            </li>
            <li className={isActive(0)}>
                <Link to="0">Неотсортированные</Link>
            </li>
            {categories.map(({ id, name }, key) => <li
                className={isActive(id)}
                key={key} >
                <Link to={`${id}`}>{name}</Link>
                {
                    id > 0 && <div className="UploadedDocuments__category-controls">
                        <button
                            className="UploadedDocuments__edit-btn"
                            type="button"
                            title="Редактировать"
                            onClick={() => setModal({ type: 'edit', categoryId: id, categoryName: name })}
                        >
                            <SvgIcon icon={pencil} size="default" />
                        </button>
                        <button
                            className="UploadedDocuments__delete-btn"
                            type="button"
                            title="Удалить"
                            onClick={() => setModal({ type: 'delete', categoryId: id })}
                        >
                            <SvgIcon icon={trash} size="default" />
                        </button>
                    </div>
                }
            </li>
            )}
        </ul>
        {modal.type === 'edit' &&
            <ModalEditCategory
                handleError={handleError}
                handleSuccess={handleSuccess}
                getCategories={getCategories}
                categoryId={modal.categoryId}
                categoryName={modal.categoryName}
                closeModal={() => setModal({})}
            />
        }
        {modal.type === 'delete' &&
            <ModalDeleteCategory handleError={handleError}
                handleSuccess={handleSuccess}
                getCategories={getCategories}
                categoryId={modal.categoryId}
                closeModal={() => setModal({})}
            />
        }
    </>
};

export default React.memo(CategoriesList);