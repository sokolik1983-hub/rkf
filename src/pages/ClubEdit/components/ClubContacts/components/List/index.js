import React, {useEffect, useRef, useState} from 'react';
import Button from '../../../../../../components/Button';
import ListContact from './ListItem';
import ClubContactsForm from '../Form';
import {ContactTypeContext} from '../../context';
import {connectContactsList} from '../../connectors';
import {useVisibility} from '../../../../../../shared/hooks';

import './styles.scss';

const {Provider} = ContactTypeContext;

const ClientContactList = props => {
    const { contactType, bindSubmitForm } = props;
    const { visibility, toggleVisibility, setInvisible } = useVisibility(false);
    const [triggerButton, setTriggerButton] = useState(false);
    const [triggerDell, setTriggerDell] = useState(false);
    const listIds = props[contactType.storeListIds];
    const triggerRef = useRef();

    const checkForDelete = () => {
        setTriggerDell(!triggerDell);
    };

    useEffect(()=> {
        triggerRef?.current.innerHTML.length <= 50 && setTriggerButton(true);
    },[visibility]);

    useEffect(()=> {
        triggerDell && triggerRef.current.innerHTML.length < 650 && setTriggerButton(true);
    },[triggerDell]);
    
    if (!visibility && bindSubmitForm) {
        bindSubmitForm.submit(null, {});
    }


    return (
        <Provider value={{ contactType }}>
            <div className="ClientClubList" ref={triggerRef}>
                {listIds.map(id => (
                    <ListContact
                        checkForDelete={checkForDelete}
                        key={id}
                        id={id}
                        type={contactType.type}
                        bindSubmitForm={bindSubmitForm}
                    />
                ))}
            </div>
            <>
                {visibility &&
                    <ClubContactsForm
                        hideForm={setInvisible}
                        bindSubmitForm={bindSubmitForm}
                    />
                }
                {!visibility &&
                    <Button
                        className={triggerButton
                            ? "add-max"
                            :"add-mini"}
                        onClick={toggleVisibility}
                    >
                        {`Добавить ${contactType.label}`}
                    </Button>
                }
            </>
        </Provider>
    )
};

export default connectContactsList(React.memo(ClientContactList));