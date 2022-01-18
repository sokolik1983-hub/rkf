import React from "react";
import Button from "../../../../../../components/Button";
import ListContact from "./ListItem";
import ClubContactsForm from "../Form";
import {useVisibility} from "../../../../../../shared/hooks";
import {connectContactsList} from "../../connectors";
import {ContactTypeContext} from "../../context";
import "./styles.scss";


const {Provider} = ContactTypeContext;

const ClientContactList = props => {
    const { contactType, bindSubmitForm } = props;
    const { visibility, toggleVisibility, setInvisible } = useVisibility(false);
    const listIds = props[contactType.storeListIds];
    
    if (!visibility && bindSubmitForm) {
        bindSubmitForm.submit(null, {});
    }

    return (
        <Provider value={{ contactType }}>
            <div className="ClientClubList">
                {listIds.map(id => (
                    <ListContact key={id} id={id} type={contactType.type} />
                ))}
                {visibility &&
                    <ClubContactsForm hideForm={setInvisible} bindSubmitForm={bindSubmitForm} />
                }
                {!visibility &&
                    <Button className="add-mini" onClick={toggleVisibility}>
                        {`+ Добавить ${contactType.label}`}
                    </Button>
                }
            </div>
        </Provider>
    )
};

export default connectContactsList(React.memo(ClientContactList));