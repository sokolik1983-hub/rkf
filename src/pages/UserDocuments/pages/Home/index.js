import React, {useEffect, useState} from "react";
import Loading from "../../../../components/Loading";
import "./index.scss";


const Home = ({userAlias}) => {
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        setLoading(false);
    }, []);

    return loading ?
        <Loading centered={false}/> :
        <div className="user-documents__info">

        </div>
};

export default React.memo(Home);