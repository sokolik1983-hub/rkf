import React, {useEffect} from 'react';
import ListDocument from './ListItem';
import {getlistUrl} from '../../config';
import {connectListDocument} from '../../connectors';
import Loading from '../../../../../../components/Loading';
import {useResourceAndStoreToRedux} from '../../../../../../shared/hooks';

import './styles.scss';


const ClientDocumentList = ({
        club_id,
        listIds,
        editable,
        triggerRef,
        checkForDelete,
        setTriggerLoad,
        getClubDocumentsListSuccess,
}) => {
    const url = getlistUrl + String(club_id);
    const {loading} = useResourceAndStoreToRedux(url, getClubDocumentsListSuccess);

    useEffect(()=>{
        !loading && setTriggerLoad(true);
    },[loading]);


    return (
        <div className="ClientDocumentList" ref={triggerRef}>
            {loading ?
                <Loading/> :
                listIds.map(id => <ListDocument
                    checkForDelete={checkForDelete}
                    editable={editable}
                    key={id}
                    id={id} />)}
        </div>
    )
};

export default connectListDocument(React.memo(ClientDocumentList));