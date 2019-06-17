import React from "react";

import './index.scss'


class CustomButton extends React.PureComponent {
    onClick = () => {
        this.props.onClick(this.props.type)
    };
    getClassName = () => this.props.filter === this.props.type ? "exhibition-list__btn  exhibition-list__btn--active" : ' exhibition-list__btn'

    render() {
        return <button
            onClick={this.onClick}
            className={this.getClassName()}
        >{this.props.children}</button>
    }
}

export default class FilterDateRange extends React.PureComponent {
    state = {
        filter: 'week',
    };
    onClick = (filter) => {
        this.setState({filter: filter})
    };


    render() {
        return (
            <div className="exhibition-list__header">
                <div className="exhibition-list__date-range-filter">
                    <button className="exhibition-list__btn exhibition-list__btn--archive">Архив</button>
                    <CustomButton
                        type={'year'}
                        filter={this.state.filter}
                        onClick={this.onClick}
                    >Год
                    </CustomButton>
                    <CustomButton
                        type={'month'}
                        filter={this.state.filter}
                        onClick={this.onClick}>Месяц</CustomButton>
                    <CustomButton
                        type={'week'}
                        filter={this.state.filter}
                        onClick={this.onClick}>Неделя</CustomButton>
                    <CustomButton
                        type={'today'}
                        filter={this.state.filter}
                        onClick={this.onClick}>Сегодня</CustomButton>
                </div>
                {/*<Button className={'exhibition-list__btn-create btn-primary btn-lg'}>Создать выставку</Button>*/}
            </div>
        );
    }
}
