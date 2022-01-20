import React, {useEffect, useRef, useState} from 'react';
import {compose} from 'redux';
import Button from '../../../../components/Button';
import ClientDocumentList from './components/List';
import ClubDocumentsForm from './components/Form';
import {useVisibility} from '../../../../shared/hooks';
import {defaultReduxKey} from './config';
import injectReducer from '../../../../utils/injectReducer';
import reducer from './reducer';


const ClientClubDocumentsProxy = ({bindSubmitForm}) => {
    const {visibility, toggleVisibility, setInvisible} = useVisibility(false);
    const [triggerButton, setTriggerButton] = useState(false);
    const [triggerLoad, setTriggerLoad] = useState(false);
    const [triggerDell, setTriggerDell] = useState(false);
    const triggerRef = useRef();

    const checkForDelete = () => {
        setTriggerDell(!triggerDell)
    }

    if (!visibility && bindSubmitForm) {
        bindSubmitForm.submit(null, {});
    }

    useEffect(()=> {
        triggerLoad &&
        triggerRef.current.innerHTML.length <= 70 && setTriggerButton(true);
    })

    useEffect(()=> {
        triggerLoad &&
        triggerRef.current.innerHTML.length < 1400 && setTriggerButton(true);
    },[triggerDell])

    return (
        <>
            <ClientDocumentList triggerRef={triggerRef} setTriggerLoad={setTriggerLoad} checkForDelete={checkForDelete} />
            {visibility &&
                <ClubDocumentsForm hideForm={setInvisible} bindSubmitForm={bindSubmitForm} />
            }
            <Button
                className={visibility ? "delete-mini" : triggerButton ? "add-max" : "add-mini"}
                onClick={toggleVisibility}
            >
                {visibility ? "" : "Добавить документ"}
            </Button>
        </>
    )
};

const withReducer = injectReducer({ key: defaultReduxKey, reducer: reducer });

export default compose(withReducer)(React.memo(ClientClubDocumentsProxy));