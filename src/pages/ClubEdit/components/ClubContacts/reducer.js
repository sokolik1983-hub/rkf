import * as actiontypes from './actiontypes';
import createReducer from 'utils/createReducer';
import { normalizeList } from 'shared/normilizers';
import { CONTACT_TYPES } from './config';
const clubClubContactsInitialState = {
    contactsEmailIds: [],
    contactsPhoneIds: [],
    listCollection: {},
    listIds: []
};

const clubClubContactsReducer = createReducer(clubClubContactsInitialState, {
    [actiontypes.GET_LIST_SUCCESS](state, action) {
        const { entities, result: listIds } = normalizeList(action.data);
        const contactsEmailIds = action.data
            .filter(
                contact =>
                    String(contact.contact_type_id) ===
                    CONTACT_TYPES.email.value
            )
            .map(contact => contact.id);
        const contactsPhoneIds = action.data
            .filter(
                contact =>
                    String(contact.contact_type_id) ===
                    CONTACT_TYPES.phone.value
            )
            .map(contact => contact.id);
        return {
            ...state,
            listCollection: entities.listCollection,
            listIds,
            contactsPhoneIds,
            contactsEmailIds
        };
    },
    [actiontypes.ADD_CONTACT_SUCCESS](state, action) {
        const { data } = action;
        const listIds = [...state.listIds, data.id];
        const listCollection = { ...state.listCollection };
        listCollection[String(data.id)] = data;
        if (String(data.contact_type_id) === CONTACT_TYPES.phone.value) {
            return {
                ...state,
                listCollection,
                listIds,
                contactsPhoneIds: [...state.contactsPhoneIds, data.id]
            };
        }
        if (String(data.contact_type_id) === CONTACT_TYPES.email.value) {
            return {
                ...state,
                listCollection,
                listIds,
                contactsEmailIds: [...state.contactsEmailIds, data.id]
            };
        }
        return {
            ...state,
            listCollection,
            listIds
        };
    },
    [actiontypes.UPDATE_CONTACT_SUCCESS](state, action) {
        const { data } = action;
        const listCollection = { ...state.listCollection };
        listCollection[String(data.id)] = data;
        return {
            ...state,
            listCollection
        };
    },

    [actiontypes.DELETE_CONTACT_SUCCESS](state, action) {
        const { data } = action;
        const listIds = state.listIds.filter(
            listId => String(listId) !== String(data.id)
        );
        const listCollection = { ...state.listCollection };
        delete listCollection[String(data.id)];
        if (String(data.contact_type_id) === CONTACT_TYPES.phone.value) {
            const contactsPhoneIds = state.contactsPhoneIds.filter(
                listId => String(listId) !== String(data.id)
            );
            return {
                ...state,
                listCollection,
                listIds,
                contactsPhoneIds
            };
        }
        if (String(data.contact_type_id) === CONTACT_TYPES.email.value) {
            const contactsEmailIds = state.contactsEmailIds.filter(
                listId => String(listId) !== String(data.id)
            );
            return {
                ...state,
                listCollection,
                listIds,
                contactsEmailIds
            };
        }
        return {
            ...state,
            listCollection,
            listIds
        };
    }
});

export default clubClubContactsReducer;
