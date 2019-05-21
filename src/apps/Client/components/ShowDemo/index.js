import React, {PureComponent} from 'react'
import {slidesData} from './data'

import Slide from './Slide'
import Dot, {Dots} from 'components/Dot'
import ButtonArrow, {DIRECTIONS} from 'components/ButtonArrow'
import './styles.scss'


export default class RegistrationSuccessScreen extends PureComponent {
    state = {
        slideIndex: 0,
    };

    next = () => {
        this.setState(prevState => ({slideIndex: prevState.slideIndex + 1}))
    };

    canNext = () => {
        return this.state.slideIndex < slidesData.length - 1
    };
    canPrev = () => {
        return this.state.slideIndex > 0
    };

    prev = () => {
        this.setState(prevState => ({slideIndex: prevState.slideIndex - 1}))
    };
    onDotClick = (index) => {
        this.setState({slideIndex: index})
    };

    render() {
        return (
            <div className="registration-success__holder">
                <div className="registration-success">
                    {this.canPrev() ? <ButtonArrow direction={DIRECTIONS.left} onClick={this.prev}/> : null}
                    {this.canNext() ? <ButtonArrow direction={DIRECTIONS.right} onClick={this.next}/> : null}

                    <div className="registration-success__slide">
                        <Slide {...slidesData[this.state.slideIndex]}/>
                    </div>
                    <Dots>
                        {
                            slidesData.map((slide, index) =>
                                <Dot
                                    key={index}
                                    index={index}
                                    onClick={this.onDotClick}
                                    current={this.state.slideIndex}
                                />
                            )
                        }
                    </Dots>
                </div>
            </div>
        )
    }
}