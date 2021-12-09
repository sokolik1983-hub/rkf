import React, { memo } from 'react';

import './index.scss';

const ControlMenu = ({
                         isControlCheckedAll,
                         handleCheckAll,
                     }) => {


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

                <div className="control-menu__item">
                    <span className="control-menu__item-icon control-menu__item-icon_select-all-reed"> </span>
                    <span className="control-menu__item-text">
                        <span>
                            Отметить все
                        </span>
                        <span>
                            прочитанным
                        </span>
                    </span>
                </div>

                <div className="control-menu__item control-menu__item_move-to-archive">
                    <span className="control-menu__item-icon control-menu__item-icon_move-to-archive"> </span>

                    <span className="control-menu__item-text">
                        <span>
                            Переместить
                        </span>
                        <span>
                            в архив
                        </span>
                    </span>
                </div>

                <div className="control-menu__item">
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