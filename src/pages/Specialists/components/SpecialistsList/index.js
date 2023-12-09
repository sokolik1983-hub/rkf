import React, {memo} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../../../components/Loading";
import CardSpecialist from "../../../../components/CardSpecialist";
import {DEFAULT_IMG} from "../../../../appConfig";
import "./index.scss";


const SpecialistsList = ({specialists, loading, getNextSpecialists, hasMore, searchTypeId}) => (
    <div className="SpecialistsList">
        <InfiniteScroll
            dataLength={specialists.length}
            next={getNextSpecialists}
            hasMore={hasMore}
            loader={loading && <Loading centered={false} />}
            endMessage={
                <div className="SpecialistsList__no-specialists">
                    <h4>{specialists.length ? 'Специалистов больше нет' : 'Специалисты не найдены'}</h4>
                    <img src={DEFAULT_IMG.noNews} alt={specialists.length ? 'Специалистов больше нет' : 'Специалисты не найдены'} />
                </div>
            }
        >
            <ul className="SpecialistsList__content">
                {specialists.map(item =>
                    <li className="SpecialistsList__item" key={item.id}>
                        <CardSpecialist {...item} searchTypeId={searchTypeId} />
                    </li>
                )}
            </ul>
        </InfiniteScroll>
    </div>
);

export default memo(SpecialistsList);