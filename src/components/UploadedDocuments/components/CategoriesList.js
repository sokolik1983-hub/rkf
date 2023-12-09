import React, {useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import { SvgIcon } from "@progress/kendo-react-common";
import { pencil, trash } from "@progress/kendo-svg-icons";
import { blockContent } from "../../../utils/blockContent";


const CategoriesList = ({ canEdit, categories, setModal, activeCategoryId, homePage, setShowFilters, isOpenFilters }) => {
    const isActive = (value) => activeCategoryId === value ? "UploadedDocuments__category-item active" : "UploadedDocuments__category-item";
    const pagePath = useRef(homePage);

    const addUrl = !!pagePath.current.match(/uploaded-documents/) ? '' : 'uploaded-documents/';

    const handleClick = () => {
        setShowFilters({ isOpenFilters: false });
    }

    useEffect(() => {
        blockContent(isOpenFilters)
    }, [isOpenFilters])

    return <>
        <ul className="UploadedDocuments__inner-list">
            <h3>Категории</h3>
            <li className={isActive(null)}>
                <Link to={homePage} onClick={handleClick}>Все категории</Link>
            </li>
            <li className={isActive(0)}>
                <Link to={`${pagePath.current}${addUrl}0`} onClick={handleClick}>Документы</Link>
            </li>
            {categories.map(({ id, name, editable }, key) => <li
                className={isActive(id)}
                key={key} >
                <Link to={`${pagePath.current}${addUrl}${id}`} onClick={handleClick}>{name}</Link>
                {
                    canEdit && id > 0 && <div className="UploadedDocuments__category-controls">
                        {editable && <button
                            className="UploadedDocuments__edit-btn"
                            type="button"
                            onClick={() => setModal({ type: 'editCategory', categoryId: id, categoryName: name })}
                        >
                            <SvgIcon icon={pencil} size="default" />
                        </button>}
                        {editable && <button
                            className="UploadedDocuments__delete-btn"
                            type="button"
                            onClick={() => setModal({ type: 'deleteCategory', categoryId: id })}
                        >
                            <SvgIcon icon={trash} size="default" />
                        </button>}
                    </div>
                }
            </li>
            )}
        </ul>

    </>
};

export default React.memo(CategoriesList);