import React, { memo, useState, useEffect } from 'react';
import { Request } from "../../../../utils/request";

import './index.scss';

const ControlMenu = ({
                         isControlCheckedAll,
                         isControlReadAllOn,
                         handleCheckAll,
                         selectedItemsIds,
                         categoryId,
                         updateNews,
                         unsetAllChecks,
                         startElement,
                     }) => {

    const [elementsCount, setElementsCount] = useState(startElement + 9);

    useEffect(() => {
        setElementsCount(startElement + 9);
    }, [startElement]);

    const moveNotifications = async (method) => {
        await Request({
            url: `/api/article/${method}?${selectedItemsIds.map(id => `articleIds=${id}&`).join('')}`,
            method: 'POST',
        }, data => {
            updateNews(1, true, elementsCount);
            unsetAllChecks();
        }, error => {
            console.log(error.response);
        });
    };


    return (
        <div className="control-menu">
            <div className="control-menu__items">
                <div className="control-menu__item control-menu__item_select-all">
                    <label className="control-menu__checkbox-label">
                        <input
                            type="checkbox"
                            checked={isControlCheckedAll}
                            onChange={() => handleCheckAll(true)}
                        />
                        <span className="control-menu__item-text">
                            Выделить все
                        </span>
                    </label>
                </div>

                <div
                    className={`control-menu__item ${(!selectedItemsIds.length || !isControlReadAllOn) && 'control-menu__item_disabled'}`}
                    onClick={() => moveNotifications('mark_articles_read')}
                >
                    <span className="control-menu__item-icon control-menu__item-icon_select-all-reed"> </span>
                    <span className="control-menu__item-text">
                        <span>
                            Отметить
                        </span>
                        <span>
                            прочитанным
                        </span>
                    </span>
                </div>

                <div
                    className={`control-menu__item ${!selectedItemsIds.length && 'control-menu__item_disabled'}`}
                    onClick={() => moveNotifications(categoryId !== 9 ? 'zip_notification' : 'unzip_notification')}
                >
                    <span className="control-menu__item-icon control-menu__item-icon_move-to-archive"> </span>

                    <span className="control-menu__item-text">
                         {categoryId !== 9
                             ?
                             <>
                                 <span>Переместить</span>
                                 <span>в архив</span>
                             </>
                             :
                             <>
                                 <span>Восстановить</span>
                                 <span>из архива</span>
                             </>
                         }
                    </span>
                </div>

                <div className="control-menu__item control-menu__item_disabled">
                    <span className="control-menu__item-icon control-menu__item-icon_delete"> </span>

                    <span className="control-menu__item-text">
                        Удалить
                    </span>
                </div>
            </div>
        </div>
    )
}

export default memo(ControlMenu);
