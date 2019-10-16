import React from 'react';
import Card from "../../../../../components/Card";
import {ExhibitionAvatar, ExhibitionMap} from '../components/Images';
import ClientExhibitionSchedule from 'apps/ClientExhibitionSchedule';
import ClientExhibitionContests from 'apps/ClientExhibitionContest';
import ClientExhibitionDocument from 'apps/ClientExhibitionDocuments';
import './index.scss';

const EditExhibitionSchedule = ({match}) => {

    return (
        <div className="exhibition-schedule">
            <div className="exhibition-schedule__imgs">
                <Card className="exhibition-schedule__avatar">
                    <h3 className="text-upper">Аватар</h3>
                    <ExhibitionAvatar match={match}/>
                </Card>
                <Card className="exhibition-schedule__map">
                    <h3 className="text-upper">Карта</h3>
                    <ExhibitionMap match={match}/>
                </Card>
            </div>
            <ClientExhibitionSchedule match={match}/>
            <ClientExhibitionContests match={match}/>
            <ClientExhibitionDocument match={match}/>
        </div>
    )
};

export default EditExhibitionSchedule;