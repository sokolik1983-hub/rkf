import React, {PureComponent} from 'react'
import {fakeExhibitions} from './data'
import Container from 'components/Layout/Container'
import './styles.scss'


const Exhibition = ({exhibition}) =>
    <div className="exhibition">
        <div style={{backgroundImage: `url(${exhibition.image})`}} className="exhibition__image"/>
        <div className="exhibition__title">{exhibition.title}</div>
        <div className="exhibition__preview-text">{exhibition.preview_text}</div>
    </div>


export default class Exhibitions extends PureComponent {
    render() {
        return (<Container className="exhibitions">
                {
                    fakeExhibitions.map(exhibition => <Exhibition key={exhibition.id} exhibition={exhibition}/>)
                }
            </Container>
        )
    }
}