import React from 'react';
import {useVisibility} from 'shared/hooks';
import Button from 'components/Button';
import ListContact from './ListItem';
import {connectContactsList} from 'apps/ClubContacts/connectors';
import ClubContactsForm from '../Form';
import {ContactTypeContext} from 'apps/ClubContacts/context';

import './styles.scss';

const { Provider } = ContactTypeContext;

const btnStyle = {
    display: 'flex',
    padding: '6px 0',
    color: '#3366FF',
    flex: '1 0'
};

function ClientContactList(props) {
    const { contactType } = props;
    const { visibility, toggleVisibility, setInvisible } = useVisibility(false);
    const listIds = props[contactType.storeListIds];
    return (
        <Provider value={{ contactType }}>
            <div className="ClientContactList">
                {listIds.map(id => (
                    <ListContact key={id} id={id} />
                ))}

                {visibility ? (
                    <ClubContactsForm hideForm={setInvisible} />
                ) : null}

                {!visibility ? (
                    <Button
                        style={btnStyle}
                        className="btn-transparent"
                        onClick={toggleVisibility}
                    >
                        {`+ Добавить ${contactType.label}`}
                    </Button>
                ) : null}
            </div>
        </Provider>
    );
}

export default connectContactsList(ClientContactList);
