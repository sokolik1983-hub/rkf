import React, {useEffect, useState} from "react";
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Aside from "../../components/Layouts/Aside";
import UserHeader from "../../components/UserHeader";
import UserDescription from "../../components/UserDescription";
import AddArticle from "../../components/UserAddArticle";
import "./index.scss";
import UserNews from "../../components/UserNews";
// import ClubNews from "../Club/components/ClubNews";
// import MenuComponent from "../../components/MenuComponent";
// import shorten from "../../utils/shorten";
// import ClubInfo from "../Club/components/ClubInfo";


const defaultOwner = {
    id: 1,
    logo_link: '',
    headliner_link: '',
    name: 'Пупкин Василий Иванович',
    federation_name: 'ОАНКОО',
    federation_alias: 'oankoo',
    description: 'Кстати, акционеры крупнейших компаний неоднозначны и будут объективно рассмотрены соответствующими инстанциями. Являясь всего лишь частью общей картины, предприниматели в сети интернет освещают чрезвычайно интересные особенности картины в целом, однако конкретные выводы, разумеется, в равной степени предоставлены сами себе. Банальные, но неопровержимые выводы, а также сторонники тоталитаризма в науке, вне зависимости от их уровня, должны быть ограничены исключительно образом мышления.',

};

const OwnerPage = ({match}) => {
    const [owner, setOwner] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [needRequest, setNeedRequest] = useState(true);
    const alias = match.params.id;

    useEffect(() => {
        setOwner(defaultOwner);
        setCanEdit(true);
        setLoading(false);
    }, []);

    return loading ?
        <Loading/> :
        <Layout>
            <Container className="content owner-page">
                <UserHeader
                    logo={owner.logo_link}
                    banner={owner.headliner_link}
                    name={owner.name || 'Имя отсутствует'}
                    federationName={owner.federation_name}
                    federationAlias={owner.federation_alias}
                    canEdit={canEdit}
                    editLink={`/owner/${alias}/edit`}
                />
                <div className="owner-page__content-wrap">
                    <Aside className="owner-page__info">
                        {/*<MenuComponent*/}
                        {/*    alias={clubInfo.club_alias}*/}
                        {/*    name={shorten(clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует')}*/}
                        {/*/>*/}
                        {/*<ClubInfo {...clubInfo} />*/}
                    </Aside>
                    <div className="owner-page__content">
                        <UserDescription description={owner.description} />
                        {canEdit &&
                            <AddArticle
                                id={owner.id}
                                logo={owner.logo_link}
                                setPage={setPage}
                                setNeedRequest={setNeedRequest}
                            />
                        }
                        <UserNews
                            canEdit={canEdit}
                            alias={alias}
                            page={page}
                            setPage={setPage}
                            needRequest={needRequest}
                            setNeedRequest={setNeedRequest}
                        />
                    </div>
                </div>
            </Container>
        </Layout>
};

export default React.memo(OwnerPage);