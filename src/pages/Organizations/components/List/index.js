import React, {memo, useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../../../../components/Loading';
import CardOrganization from '../../../../components/CardOrganization';
import {DEFAULT_IMG} from '../../../../appConfig';
import {setFiltersToUrl, buildUrlParams} from '../../utils';
import {Request} from '../../../../utils/request';
import {endpointGetOrganizations} from '../../config';

import './index.scss';

const OrganizationsList = (filters) => {
    const [org, setOrg] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [startElement, setStartElement] = useState(1);

    const getOrganizations = async startElem => {
        await Request({
            url: `${endpointGetOrganizations}${buildUrlParams({ ...filters })}`
        }, data => {
            if (data.length) {
                if (data.length < 10) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }

                setOrg(startElem === 1 ? data : [...org, ...data]);
            } else {
                if(startElem === 1) setOrg([]);
                setHasMore(false);
            }
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
        });
    };

    useEffect(() => {
        (() => getOrganizations(1))();
        setStartElement(1);
    }, [filters]);

    const getNextOrganizations = () => {
        if(org.length) {
            (() => getOrganizations(startElement + 10))();
            setStartElement(startElement + 10);
        }
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
                        <CardOrganization setFilters={setFiltersToUrl} {...item}/>
                    </li>
                ))}
            </ul>
        </InfiniteScroll>
    )
};

export default memo(OrganizationsList);