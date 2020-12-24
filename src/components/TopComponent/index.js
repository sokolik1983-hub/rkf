import React, { useState } from "react";
import Card from "../Card";
import Alert from "../Alert";
import { DEFAULT_IMG } from "../../appConfig";
import Share from "components/Share";
import UserActions from "components/UserActions";
import "./index.scss";

const TopComponent = ({ logo, name, withShare = true, withSubscribe, isAuthenticated, canEdit, bank_details, banner_link, subscribed, subscribed_id, member, onSubscriptionUpdate }) => {
    const [shareAlert, setShareAlert] = useState(false);
    // const { userAgent, clipboard } = navigator;
    // const isSafari = userAgent.match(/safari|ipad|iphone/i) && !userAgent.match(/chrome/i);

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

    // const share = () => {
    //     isSafari
    //         ? window.Clipboard.copy(window.location.href)
    //         : clipboard.writeText(window.location.href);
    //     setShareAlert(true);
    // };

    return (
        <Card className={`top-component ${bank_details ? `_bank_details` : ``}`}>
            {banner_link &&
                <div className="top-component__banner" style={{ backgroundImage: `url(${banner_link})` }} />
            }
            <div className="top-component__content">
                <div className="top-component__info">
                    <div style={{ backgroundImage: `url(${logo || DEFAULT_IMG.clubAvatar})` }} className="top-component__logo" />
                    <div className="top-component__title">
                        <h2>{name}</h2>
                    </div>
                </div>
                <div className="top-component__content-buttons">
                    {
                        withSubscribe && isAuthenticated && !canEdit &&
                        < UserActions
                            userType={3}
                            subscribed_id={subscribed_id}
                            subscribed={subscribed}
                            member={member}
                            onSubscriptionUpdate={onSubscriptionUpdate}
                        // onSuccess={onSuccess}
                        // onError={onError}
                        />
                    }
                    <Share />
                </div>
            </div>
            {shareAlert &&
                <Alert
                    title="Поделиться"
                    text="Ссылка скопирована в буфер обмена"
                    autoclose={1.5}
                    onOk={() => setShareAlert(false)}
                />
            }
        </Card>
    )
};

export default React.memo(TopComponent);
