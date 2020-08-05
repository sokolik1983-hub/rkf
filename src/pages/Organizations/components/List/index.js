import React, {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../../../components/Loading";
import ListItem from "./ListItem";
import {DEFAULT_IMG} from "../../../../appConfig";
import {connectFilters} from "../../connectors";
import {Request} from "../../../../utils/request";
import {endpointGetOrganizations} from "../../config";
import "./index.scss";


const defaultData = [
    {
        "id": 6140,
        "alias": "1000006140",
        "logo": null,
        "name": "",
        "user_type": 3,
        "is_active": false,
        "is_active_member": true,
        "city_name": null,
        "city_id": null,
        "owner_name": "",
        "owner_position": "",
        "federation_name": null,
        "federation_alias": null,
        "content": null
    },
    {
        "id": 5827,
        "alias": "1000005827",
        "logo": null,
        "name": "АНО \"КЛАСС\"",
        "user_type": 3,
        "is_active": false,
        "is_active_member": true,
        "city_name": "Абинск",
        "city_id": 6,
        "owner_name": "Головкин Евгений Александрович",
        "owner_position": "ДИРЕКТОР",
        "federation_name": "РФСС",
        "federation_alias": "rfss",
        "content": null
    },
    {
        "id": 5204,
        "alias": "1000005204",
        "logo": null,
        "name": "АКОО \"КС \"ДРУГ\"",
        "user_type": 3,
        "is_active": false,
        "is_active_member": true,
        "city_name": "Абан",
        "city_id": 3,
        "owner_name": "Ашихмина Ирина Юрьевна",
        "owner_position": "ПРЕДСЕДАТЕЛЬ ПРЕЗИДИУМА",
        "federation_name": "РФСС",
        "federation_alias": "rfss",
        "content": null
    },
    {
        "id": 6115,
        "alias": "1000006115",
        "logo": null,
        "name": "АООО КС \"ТАКСА ПЛЮС\"",
        "user_type": 3,
        "is_active": false,
        "is_active_member": true,
        "city_name": "Воронеж",
        "city_id": 347,
        "owner_name": "Тризна Елена Анатольевна",
        "owner_position": "ПРЕДСЕДАТЕЛЬ",
        "federation_name": "РФОС",
        "federation_alias": "rfos",
        "content": null
    },
    {
        "id": 6114,
        "alias": "1000006114",
        "logo": null,
        "name": "АООО КС \"ТАКСА ПЛЮС\"",
        "user_type": 3,
        "is_active": false,
        "is_active_member": true,
        "city_name": "Благовещенск",
        "city_id": 185,
        "owner_name": "Тризна Елена Анатольевна",
        "owner_position": "ПРЕДСЕДАТЕЛЬ",
        "federation_name": "РФЛС",
        "federation_alias": "rfls",
        "content": null
    },
    {
        "id": 6131,
        "alias": "1000006131",
        "logo": null,
        "name": "БГОО КК СИМУРАН (КРЫЛАТЫЙ ВОЛК)",
        "user_type": 3,
        "is_active": false,
        "is_active_member": true,
        "city_name": "Старый Оскол",
        "city_id": 1688,
        "owner_name": "ЩЕКИНА НИНА ВАСИЛЬЕВНА",
        "owner_position": "Руководитель",
        "federation_name": "РФЛС",
        "federation_alias": "rfls",
        "content": null
    },
    {
        "id": 6116,
        "alias": "1000006116",
        "logo": null,
        "name": "ВРОО \"КЛУБ ОХОТНИЧЬЕГО И СЛУЖЕБНОГО СОБАКОВОДСТВА\"",
        "user_type": 3,
        "is_active": false,
        "is_active_member": true,
        "city_name": "Пермь",
        "city_id": 1372,
        "owner_name": "Никитина Любовь Викторовна",
        "owner_position": "ПРЕДСЕДАТЕЛЬ ПРАВЛЕНИЯ",
        "federation_name": "ОАНКОО/Фауна",
        "federation_alias": "oankoo",
        "content": null
    },
    {
        "id": 6119,
        "alias": "1000006119",
        "logo": null,
        "name": "ООО ИРООЛС «Собаки Компаньоны»",
        "user_type": 3,
        "is_active": false,
        "is_active_member": true,
        "city_name": "Ростов-на-Дону",
        "city_id": 3793,
        "owner_name": "ПЕТУХОВ АЛЕКСЕЙ НИКОЛАЕВИЧ",
        "owner_position": "Руководитель",
        "federation_name": "РФОС",
        "federation_alias": "rfos",
        "content": null
    },
    {
        "id": 6125,
        "alias": "1000006125",
        "logo": null,
        "name": "КГОО ЛЖ \"МИЛЫЙ ДРУГ\"",
        "user_type": 3,
        "is_active": false,
        "is_active_member": true,
        "city_name": "Электросталь",
        "city_id": 2062,
        "owner_name": "Орлова Елена Степановна",
        "owner_position": "Директор",
        "federation_name": "ОАНКОО/Фауна",
        "federation_alias": "oankoo",
        "content": null
    },
    {
        "id": 6130,
        "alias": "1000006130",
        "logo": null,
        "name": "КРОО \"КС \"ЖЕНЕВА-ДЕБЮТ\"",
        "user_type": 3,
        "is_active": false,
        "is_active_member": true,
        "city_name": "Бийск",
        "city_id": 178,
        "owner_name": "ВАРЧЕВ А.И.",
        "owner_position": "Руководитель",
        "federation_name": "РФСС",
        "federation_alias": "rfss",
        "content": null
    }
];


const OrganizationsList = ({organization_type,
                            string_filter,
                            federation_ids,
                            city_ids,
                            breed_ids,
                            activated,
                            active_member,
                            start_element,
                            setFilters}) => {
    const [org, setOrg] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        (() => Request({
            url: endpointGetOrganizations,
            method: 'POST',
            data: JSON.stringify({
                organization_type,
                string_filter,
                federation_ids,
                city_ids,
                breed_ids,
                activated,
                active_member,
                start_element
            })
        }, data => {
            if (data.length) {
                if (data.length < 10) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }

                setOrg(start_element === 1 ? data : [...org, ...data]);
            } else {
                setHasMore(false);
            }
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
        }))();
    }, [organization_type, string_filter, federation_ids, city_ids, breed_ids, activated, active_member, start_element]);

    return (
        <InfiniteScroll
            dataLength={org.length}
            next={() => setFilters({start_element: start_element + 10})}
            hasMore={hasMore}
            loader={<Loading centered={false} />}
            endMessage={
                <div className="organizations-page__list-content">
                    <h3>{!org.length ? 'Организаций не найдено' : 'Организаций больше нет'}</h3>
                    <img src={DEFAULT_IMG.noNews} alt={!org.length ? 'Организаций не найдено' : 'Организаций больше нет'} />
                </div>
            }
        >
            <ul className="organizations-page__list organization-list">
                {org.map(item => (
                    <li className="organization-list__item" key={item.id}>
                        <ListItem {...item}/>
                    </li>
                ))}
            </ul>
        </InfiniteScroll>
    )
};

export default connectFilters(React.memo(OrganizationsList));