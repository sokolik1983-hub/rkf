import React from "react";
import LightTooltip from "components/LightTooltip";
import "./styles.scss";

const CopyCell = ({ dataItem }, callback) => {

    const { userAgent, clipboard } = navigator;
    const isSafari = userAgent.match(/safari|ipad|iphone/i) && !userAgent.match(/chrome/i);

    window.Clipboard = ((window, document) => { // Safari fix
        let textArea, copy;
        const createTextArea = text => {
            textArea = document.createElement('textArea');
            textArea.value = text;
            document.body.appendChild(textArea);
        };

        const selectText = () => {
            let range, selection;
            range = document.createRange();
            range.selectNodeContents(textArea);
            selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            textArea.setSelectionRange(0, 999999);
        };

        const copyToClipboard = () => {
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }

        copy = text => {
            createTextArea(text);
            selectText();
            copyToClipboard();
        };

        return { copy: copy };
    })(window, document);

    const copyLink = (link) => {
        isSafari
            ? window.Clipboard.copy(link)
            : clipboard.writeText(link);
        callback
            ? callback('Трек-номер скопирован')
            : alert('Трек-номер скопирован');
    };

    return <td style={{ padding: '0.75rem 5px', textAlign: 'center' }}>
        {dataItem.barcode && <div className="CopyCell">
            <LightTooltip title="Копировать трек-номер" enterDelay={200} leaveDelay={200}>
                <button
                    style={{ display: 'block' }}
                    className="CopyCell__btn"
                    type="button"
                    onClick={() => copyLink(dataItem.barcode)}
                >
                    {dataItem.barcode}
                </button>
            </LightTooltip>
        </div>}
    </td>
};

export default CopyCell;