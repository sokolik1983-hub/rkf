import React, {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../../../components/Loading";
import CardOrganization from "../../../../components/CardOrganization";
import {DEFAULT_IMG} from "../../../../appConfig";
import {connectFilters} from "../../connectors";
import {Request} from "../../../../utils/request";
import {endpointGetOrganizations} from "../../config";
import "./index.scss";


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

    const getOrganizations = async () => {
        await Request({
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
            if(start_element === 1) {
                window.scrollTo(0,0);
            }

            if (data.length) {
                if (data.length < 10) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }

                setOrg(start_element === 1 ? data : [...org, ...data]);
            } else {
                if(start_element === 1) setOrg([]);
                setHasMore(false);
            }
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
        });
    };

    useEffect(() => {
        (() => getOrganizations())();
    }, [organization_type, string_filter, federation_ids, city_ids, breed_ids, activated, active_member, start_element]);

    const getNextOrganizations = () => {
        setFilters({start_element: org.length ? start_element + 10 : 1})
    };

    return (
        <InfiniteScroll
            dataLength={org.length}
            next={getNextOrganizations}
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
                        <CardOrganization setFilters={setFilters} {...item}/>
                    </li>
                ))}
            </ul>
        </InfiniteScroll>
    )
};

export default connectFilters(React.memo(OrganizationsList));