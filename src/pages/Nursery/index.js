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
import NurseryInfo from "./components/NurseryInfo";
import "./index.scss";


const defaultNursery = {
    id: 1,
    logo_link: '',
    headliner_link: '',
    name: 'Питомник №1',
    federation_name: 'ОАНКОО',
    federation_alias: 'oankoo',
    description: 'Кстати, акционеры крупнейших компаний неоднозначны и будут объективно рассмотрены соответствующими инстанциями. Являясь всего лишь частью общей картины, предприниматели в сети интернет освещают чрезвычайно интересные особенности картины в целом, однако конкретные выводы, разумеется, в равной степени предоставлены сами себе. Банальные, но неопровержимые выводы, а также сторонники тоталитаризма в науке, вне зависимости от их уровня, должны быть ограничены исключительно образом мышления.',
    info: {
        legal_city: {id: 1, name: 'Москва'},
        legal_address: '105264, город Москва, улица Парковая 5-я, дом 48',
        city: {id: 1, name: 'Москва'},
        address: 'Москва, улица Парковая 5-я, дом 48',
        owner_name: 'Пупкин Василий Иванович',
        owner_position: 'Учредитель',
        contacts: [
            {
                id: 1,
                contact_type_id: 1,
                description: 'Телефон',
                value: '+7(777)777-77-77'
            },
            {
                id: 2,
                contact_type_id: 2,
                description: 'Email',
                value: 'pupkin@mail.ru'
            }
        ],
        site: 'https://pupkin.ru',
        socials: [
            {
                id: 1,
                site: 'https://vk.com/pupkin',
                description: 'VK'
            },
            {
                id: 2,
                site: 'https://facebook.com/pupkin',
                description: 'FB'
            }
        ],
        work_time: [
            {
                id: 1,
                week_day_id: 1,
                time_from: '10:00:00',
                time_to: '19:00:00'
            },
            {
                id: 2,
                week_day_id: 2,
                time_from: '10:00:00',
                time_to: '19:00:00'
            }
        ],
        documents: [
            {
                id: 1,
                name: 'Документ №1',
                url: 'https://yandex.ru/'
            },
            {
                id: 2,
                name: 'Документ №2',
                url: 'https://yandex.ru/'
            }
        ]
    }
};

const NurseryPage = ({match}) => {
    const [nursery, setNursery] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [needRequest, setNeedRequest] = useState(true);
    const alias = match.params.id;

    useEffect(() => {
        setNursery(defaultNursery);
        setCanEdit(true);
        setLoading(false);
    }, []);

    return loading ?
        <Loading/> :
        <Layout>
            <Container className="content nursery-page">
                <UserHeader
                    logo={nursery.logo_link}
                    banner={nursery.headliner_link}
                    name={nursery.name || 'Имя отсутствует'}
                    federationName={nursery.federation_name}
                    federationAlias={nursery.federation_alias}
                    canEdit={canEdit}
                    editLink={`/nursery/${alias}/edit`}
                />
                <div className="nursery-page__content-wrap">
                    <div className="nursery-page__content">
                        <UserDescription description={nursery.description} />
                        {canEdit &&
                            <AddArticle
                                id={nursery.id}
                                logo={nursery.logo_link}
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
                    <Aside className="nursery-page__info">
                        <UserMenu
                            alias={alias}
                            name={nursery.name || 'Имя отсутствует'}
                        />
                        <NurseryInfo
                            name={nursery.name}
                            {...nursery.info}
                        />
                    </Aside>
                </div>
            </Container>
        </Layout>
};

export default React.memo(NurseryPage);