import React, {useEffect, useState} from "react";
import StickyBox from "react-sticky-box";
import Loading from "../../../../components/Loading";
import Card from "../../../../components/Card";
import CopyrightInfo from "../../../../components/CopyrightInfo";
import UserBanner from "../../components/UserBanner";
import UserInfo from "../../components/UserInfo";
import {Request} from "../../../../utils/request";
import "./index.scss";


const Home = ({userAlias}) => {
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        (() => Request({
            url: `/api/owners/owner/public/${userAlias}`
        }, data => {
            setUserInfo(data);
            setLoading(false);
        }, error => {
            console.log(error.response);
            setLoading(false);
        }))();
    }, [userAlias]);

    return loading ?
        <Loading centered={false}/> :
        <div className="user-documents__info">
            <div className="user-documents__right">
                <UserBanner headliner_link={userInfo.headliner_link}/>
                
            </div>
            <aside className="user-documents__left">
                <StickyBox offsetTop={66}>
                    <Card>
                        <UserInfo {...userInfo}/>

                    </Card>
                    <CopyrightInfo/>
                </StickyBox>
            </aside>
        </div>
};

export default React.memo(Home);