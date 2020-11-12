import React from 'react';
import { SvgIcon } from "@progress/kendo-react-common";
import { file, copy } from "@progress/kendo-svg-icons";
import LightTooltip from "components/LightTooltip";
import './index.scss';

const ShareButtons = ({ link, callback }) => {

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
            ? callback('Ссылка скопирована')
            : alert('Ссылка скопирована');
    };

    return <div className="ShareButtons">
        <LightTooltip title="Перейти по ссылке" enterDelay={200} leaveDelay={200}>
            <a className="ShareButtons__link" href={link} target="_blank" rel="noopener noreferrer">
                <SvgIcon icon={file} size="default" />
            </a>
        </LightTooltip>
        <LightTooltip title="Копировать ссылку" enterDelay={200} leaveDelay={200}>
            <button className="ShareButtons__btn" type="button" onClick={() => copyLink(link)} >
                <SvgIcon icon={copy} size="default" />
            </button>
        </LightTooltip>
    </div>
};

export default ShareButtons;