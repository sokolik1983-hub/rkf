import React, {useEffect} from 'react'
import Head from "./Head";
import Content from './Content'
import DetailsLayout from '../DetailsLayout'
import {connectExhibitionDetails} from 'apps/Exhibitions/connectors'


function ExhibitionDetails(props) {
    const {getDetails, exhibitionId, details}=props;
    useEffect(() => {
        getDetails(exhibitionId)
    }, [exhibitionId]);
    return (
        <div className="ExhibitionDetails">
        <Head {...details}/>
        <Content {...details}/>
        <div>{JSON.stringify(details)}</div>
        </div>
    )

}

export default connectExhibitionDetails(ExhibitionDetails)