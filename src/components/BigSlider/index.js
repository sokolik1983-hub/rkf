import React, {PureComponent} from 'react'
import Slide from './Slide'
import DotBtn from './DotBtn'
import Arrow from './ArrowBtn'
import './styles.scss'


export default class BigSlider extends PureComponent {
    static defaultProps = {
        slides: []
    };
    state = {
        current: 0,
    };

    onDotClick = (index) => {
        this.setState({current: index})
    };

    nextSlide = () => {
        const {slides} = this.props;
        const {current} = this.state;
        if (current < slides.length - 1) {
            this.setState({current: current + 1})
        } else if (current === slides.length - 1) {
            this.setState({current: 0})
        }
    };

    prevSlide = () => {
        const {slides} = this.props;
        const {current} = this.state;
        if (current === 0) {
            this.setState({current: slides.length - 1})
        } else if (current >= 1) {
            this.setState({current: current - 1})
        }
    };


    render() {
        const {slides, style} = this.props;
        return (
            <div style={style} className="BigSlider">
                <div className="BigSlider__content">
                    {
                        slides.map((slide, index) => index === this.state.current ?
                            <Slide key={slide.id} {...slide}/> : undefined)
                    }
                </div>
                <div className="BigSlider__controls">
                    <div className="BigSlider__dots">
                        {
                            slides.map((slide, index) =>
                                <DotBtn
                                    active={index === this.state.current}
                                    onClick={this.onDotClick}
                                    index={index}
                                />)
                        }
                    </div>
                    <div className="BigSlider__arrows">
                        <Arrow onClick={this.prevSlide}/>
                        <Arrow onClick={this.nextSlide} right/>
                    </div>
                </div>
            </div>
        )
    }
}