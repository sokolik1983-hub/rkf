import React, {useEffect, useRef, useState} from 'react';
import {compose} from 'redux';
import reducer from './reducer';
import {defaultReduxKey} from './config';
import ClubDocumentsForm from './components/Form';
import ClientDocumentList from './components/List';
import Button from '../../../../components/Button';
import {useVisibility} from '../../../../shared/hooks';
import injectReducer from '../../../../utils/injectReducer';


const ClientClubDocumentsProxy = ({bindSubmitForm}) => {
    const {visibility, toggleVisibility, setInvisible} = useVisibility(false);
    const [triggerButton, setTriggerButton] = useState(false);
    const [triggerLoad, setTriggerLoad] = useState(false);
    const [triggerDell, setTriggerDell] = useState(false);
    const triggerRef = useRef();

    const checkForDelete = () => {
        setTriggerDell(!triggerDell);
    };

    if (!visibility && bindSubmitForm) {
        bindSubmitForm.submit(null, {});
    }

    useEffect(()=> {
        setTriggerButton((triggerRef?.current.innerHTML.length <= 70) || !triggerLoad);
    },[visibility, triggerLoad]);

    useEffect(()=> {
        triggerDell && triggerLoad &&
        triggerRef.current.innerHTML.length < 1400 && setTriggerButton(true);
    },[triggerDell]);


    return (
        <div className="MainInfo__documents">
            <ClientDocumentList
                triggerRef={triggerRef}
                setTriggerLoad={setTriggerLoad}
                checkForDelete={checkForDelete}
            />
            {visibility &&
                <ClubDocumentsForm
                    hideForm={setInvisible}
                    bindSubmitForm={bindSubmitForm}
                />
            }
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
                    : "Добавить документ"}
            </Button>
        </div>
    )
};

const withReducer = injectReducer({ key: defaultReduxKey, reducer: reducer });

export default compose(withReducer)(React.memo(ClientClubDocumentsProxy));