import React from 'react'
import ListDocument from './ListItem'
import {connectListDocument} from '../../connectors'
import {useResourceAndStoreToRedux} from "shared/hooks";
import {getlistUrl} from '../../config'
// import {Request} from 'utils/request'
import './styles.scss'

function ClientDocumentList(props) {
    const {listIds, getClubDocumentsListSuccess, club_id, editable} = props;
    const url = getlistUrl + String(club_id);
    const {loading} = useResourceAndStoreToRedux(url, getClubDocumentsListSuccess);
    // const [loading, setLoading] = useState(true);
    // useEffect( () => {
    //     const url = getlistUrl + String(club_id);
    //     (async () => {
    //         await Request({url}, getClubDocumentsListSuccess);
    //         setLoading(false);
    //     })();
    // }, []);

    return (
        <div className="ClientDocumentList">
            {loading ?
                "Загрузка..."
                : listIds.map(id => <ListDocument editable={editable} key={id} id={id}/>)}
        </div>
    )

}

export default connectListDocument(ClientDocumentList)