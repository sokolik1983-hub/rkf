import React, {useEffect} from 'react';
import Loading from '../../../../../../components/Loading';
import ListSocial from './ListItem';
import {useResourceAndStoreToRedux} from '../../../../../../shared/hooks';
import {getlistUrl} from '../../config';
import {connectListSocial} from '../../connectors';

import './styles.scss';


const ClientSocialList = ({
        listIds,
        club_id,
        editable,
        triggerRef,
        checkForDelete,
        setTriggerLoad,
        getClubSocialListSuccess,
}) => {
    const url = getlistUrl + String(club_id);
    const {loading} = useResourceAndStoreToRedux(url, getClubSocialListSuccess);

    useEffect(()=>{
        !loading && setTriggerLoad(true)
    },[loading])

    
    return (
        <div className="ClientClubList" ref={triggerRef}>
            {loading ?
                <Loading/> :
                listIds.map(id => <ListSocial
                    checkForDelete={checkForDelete}
                    editable={editable}
                    key={id}
                    id={id} />)}
        </div>
    )
};

export default connectListSocial(ClientSocialList)