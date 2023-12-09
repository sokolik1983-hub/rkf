import React from "react";
import LightTooltip from "components/LightTooltip";
import "./styles.scss";

const CopyCell = ({ dataItem }, callback) => {

    const handleCopyBarcode = (barcode) => {
        if (barcode) {
            navigator.clipboard.writeText(barcode)
                .then(() => {
                    callback
                            ? callback('Трек-номер скопирован')
                            : alert('Трек-номер скопирован');
                })
                .catch(err => {
                    callback
                        ? callback('Произошла ошибка. Код не был скопирован.')
                        : alert('Произошла ошибка. Код не был скопирован.');
                });
        }
    };

    return <td style={{ padding: '0.75rem 5px', textAlign: 'center' }}>
        {dataItem.request_barcode ? <div className="CopyCell">
            <LightTooltip title="Копировать трек-номер" enterDelay={200} leaveDelay={200}>
                <button
                    style={{ display: 'block' }}
                    className="CopyCell__btn"
                    type="button"
                    onClick={() => handleCopyBarcode(dataItem.request_barcode)}
                >
                    {dataItem.request_barcode}
                </button>
            </LightTooltip>
        </div>

        :

        <div className="CopyCell">
            <LightTooltip title="Копировать трек-номер" enterDelay={200} leaveDelay={200}>
                <button
                    style={{ display: 'block' }}
                    className="CopyCell__btn"
                    type="button"
                    onClick={() => handleCopyBarcode(dataItem.barcode)}
                >
                    {dataItem.barcode}
                </button>
            </LightTooltip>
        </div>
        }
    </td>
};

export default CopyCell;