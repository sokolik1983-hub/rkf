import React, {useEffect, useState} from "react";
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Aside from "../../components/Layouts/Aside";
import UserHeader from "../../components/UserHeader";
import UserDescription from "../../components/UserDescription";
import AddArticle from "../../components/UserAddArticle";
import UserNews from "../../components/UserNews";
import UserMenu from "./components/UserMenu";
import "./index.scss";


const defaultKennel = {
    id: 1,
    logo_link: '',
    headliner_link: '',
    name: 'Питомник №1',
    federation_name: 'ОАНКОО',
    federation_alias: 'oankoo',
    description: 'Кстати, акционеры крупнейших компаний неоднозначны и будут объективно рассмотрены соответствующими инстанциями. Являясь всего лишь частью общей картины, предприниматели в сети интернет освещают чрезвычайно интересные особенности картины в целом, однако конкретные выводы, разумеется, в равной степени предоставлены сами себе. Банальные, но неопровержимые выводы, а также сторонники тоталитаризма в науке, вне зависимости от их уровня, должны быть ограничены исключительно образом мышления.',

};

const KennelPage = ({match}) => {
    const [kennel, setKennel] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [needRequest, setNeedRequest] = useState(true);
    const alias = match.params.id;

    useEffect(() => {
        setKennel(defaultKennel);
        setCanEdit(true);
        setLoading(false);
    }, []);

    return loading ?
        <Loading/> :
        <Layout>
            <Container className="content owner-page">
                <UserHeader
                    logo={kennel.logo_link}
                    banner={kennel.headliner_link}
                    name={kennel.name || 'Имя отсутствует'}
                    federationName={kennel.federation_name}
                    federationAlias={kennel.federation_alias}
                    canEdit={canEdit}
                    editLink={`/kennel/${alias}/edit`}
                />
                <div className="owner-page__content-wrap">
                    <div className="owner-page__content">
                        <UserDescription description={kennel.description} />
                        {canEdit &&
                            <AddArticle
                                id={kennel.id}
                                logo={kennel.logo_link}
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
                    <Aside className="owner-page__info">
                        <UserMenu
                            alias={alias}
                            name={kennel.name || 'Имя отсутствует'}
                        />
                    </Aside>
                </div>
            </Container>
        </Layout>
};

export default React.memo(KennelPage);