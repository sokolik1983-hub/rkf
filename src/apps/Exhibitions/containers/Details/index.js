import React, {PureComponent} from 'react'

import DetailsLayout from 'apps/Exhibitions/components/DetailsLayout'
import {exhibitionDetails} from './data'
export default class ExhibitionDetails extends PureComponent {
    render() {
        return <DetailsLayout exhibitionDetails={exhibitionDetails}/>
    }
}