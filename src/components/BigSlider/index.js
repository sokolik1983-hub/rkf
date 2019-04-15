import React, {PureComponent} from 'react'
import {Link} from 'react-router-dom'
import Container from 'components/Layout/Container'
import './styles.scss'

const Dot = ({active, onClick}) =>
    <button onClick={onClick} className={active ? 'active' : ''}/>;

const Arrow = ({onClick, right}) => <button onClick={onClick} className={`arrow ${right ? 'arrow--right' : 'arrow--left'}`}/>

const Slide = ({slideIndex, content}) => <div className="big-slider__slide"
                                              dangerouslySetInnerHTML={{__html: content}}/>;

export default class BigSlider extends PureComponent {
    state = {
        current: 0,
    };

    onDotClick = () => {
        console.log('onDotClick')
    };

    render() {
        return (
            <div className="big-slider">

                <div className="big-slider__content">
                    <div className="big-slider__slide">

                        <div style={{backgroundImage: `url(${'/static/images/noimg/home.svg'})`}}
                             className="big-slider__slide-image"/>
                        <Link to={'/'} className="big-slider__slide-link">Читать<br/>далее</Link>
                        <div className="big-slider__slide-text">
                            <div className="big-slider__slide-title">Хорошая жизнь <br/><span>с собаками</span></div>
                            <div className="big-slider__slide-preview">Ежедневно РКФ работает над улучшением качества
                                разведения собак в России с главной целью — благополучие собаки.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="big-slider__controls">
                    <div className="big-slider__dots">
                        <Dot onClick={this.onDotClick} active index="0"/>
                        <Dot onClick={this.onDotClick} index="1"/>
                        <Dot onClick={this.onDotClick} index="2"/>
                        <Dot onClick={this.onDotClick} index="3"/>
                    </div>
                    <div className="big-slider__arrows">
                        <Arrow />
                        <Arrow right/>
                    </div>
                </div>

            </div>
        )
    }
}