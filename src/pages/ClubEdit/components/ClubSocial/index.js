import React, {useEffect, useRef, useState} from 'react';
import {compose} from 'redux';
import reducer from './reducer';
import {defaultReduxKey} from './config';
import ClubSocialForm from './components/Form';
import ClientSocialList from './components/List';
import Button from '../../../../components/Button';
import {useVisibility} from '../../../../shared/hooks';
import injectReducer from '../../../../utils/injectReducer';


const ClientClubSocialProxy = ({bindSubmitForm}) => {
    const {visibility, toggleVisibility, setInvisible} = useVisibility(false);
    const [triggerButton, setTriggerButton] = useState(false);
    const [triggerLoad, setTriggerLoad] = useState(false);
    const [triggerDell, setTriggerDell] = useState(false);
    const triggerRef = useRef();

    const checkForDelete = () => {
        setTriggerDell(!triggerDell);
    };

    if (!visibility) {
        bindSubmitForm.submit(null, {});
    }

    useEffect(()=> {
        visibility && triggerLoad &&
            triggerRef.current.innerHTML.length <= 70 && setTriggerButton(true);
    },[visibility]);

    useEffect(()=> {
        triggerDell && triggerLoad &&
            triggerRef.current.innerHTML.length < 1400 && setTriggerButton(true);
    },[triggerDell]);


    return (
        <div className="contacts__social">
            <ClientSocialList
                triggerRef={triggerRef}
                setTriggerLoad={setTriggerLoad}
                checkForDelete={checkForDelete}
            />
            {visibility &&
                <ClubSocialForm
                    hideForm={setInvisible}
                    bindSubmitForm={bindSubmitForm}
                />
            }
            {triggerLoad &&
                <Button
                    className={visibility
                        ? "delete-mini"
                        : triggerButton
                            ? "add-max"
                            : "add-mini"}
                    onClick={toggleVisibility}
                >
                    {visibility
                        ? ""
                        : "Добавить ссылку"}
                </Button>
            }
        </div>
    )
};

const withReducer = injectReducer({key: defaultReduxKey, reducer: reducer});

export default compose(withReducer)(React.memo(ClientClubSocialProxy));