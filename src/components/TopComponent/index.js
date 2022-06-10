import React, {useState} from "react";
import Card from "../Card";
import Alert from "../Alert";
import Share from "../Share";
import UserActionControls from "../UserActionControls";
import Avatar from "../Layouts/Avatar";

import "./index.scss";


const TopComponent = ({
                          logo,
                          name,
                          withSubscribe,
                          isAuthenticated,
                          canEdit,
                          bank_details,
                          banner_link,
                          subscribed,
                          subscribed_id,
                          member,
                          onSubscriptionUpdate,
                          userType
}) => {
    const [shareAlert, setShareAlert] = useState(false);

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

    return (
        <Card className={`top-component ${bank_details ? `_bank_details` : ``}`}>
            {banner_link &&
                <div className="top-component__banner" style={{ backgroundImage: `url(${banner_link})` }} />
            }
            <div className="top-component__content">
                <div className="top-component__info">
                    <Avatar
                        card="nursery-docs"
                        data="nursery-docs"
                        logo={logo}
                        name={name}
                        userType={userType}
                    />
                    <div className="top-component__title">
                        <h2>{name}</h2>
                    </div>
                </div>
                <div className="top-component__content-buttons">
                    {
                        withSubscribe && isAuthenticated && !canEdit &&
                        <UserActionControls
                            userType={3}
                            subscribed_id={subscribed_id}
                            subscribed={subscribed}
                            member={member}
                            onSubscriptionUpdate={onSubscriptionUpdate}
                            isTopComponent
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
