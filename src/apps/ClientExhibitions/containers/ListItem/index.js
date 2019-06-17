import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {defaultReduxKey} from 'apps/ClientExhibitions/config'
import {ClientExhibitionsPathContext} from "apps/ClientExhibitions/context";
import {Link} from "react-router-dom";
import {BtnEdit} from 'components/Svg'
import {formatDateWithLocaleStringFull, timeSecondsCutter, transformDate} from "utils/datetime";
import './styles.scss'
import {ActButton} from "components/Button";

const Date = ({day, month, year, time_start, time_end}) => {
    const date = transformDate({day, month, year})
    console.log(day, month, year, date)
    return (
        <div
            className="exhibition-list-item__datetime">
            {formatDateWithLocaleStringFull(date)} {time_start ? `${timeSecondsCutter(time_start)} - ${timeSecondsCutter(time_end)}` : null}
        </div>
    )
}

class ClientExhibitionListItem extends PureComponent {

    render() {
        const {
            id,
            exhibition_name,
            city,
            dates,
        } = this.props;
        return (
            <ClientExhibitionsPathContext.Consumer>
                {
                    ({path}) =>
                        <div id={'exhibitionsListItem_' + id} className="exhibition-list-item">
                            <div className="exhibition-list-item__city">
                                {city}
                            </div>
                            <div className="exhibition-list-item__title">{exhibition_name}</div>
                            <div className="exhibition-list-item__dates">
                                {
                                    dates ?
                                        dates.map((date, index) => <Date key={index}{...date}/>)
                                        :
                                        <div className="exhibition-list-item__datetime">
                                            добавьте расписние
                                        </div>
                                }
                            </div>

                            <div className="exhibition-list-item__controls">
                                <ActButton
                                    action={`${path}/${id}/details/common`}
                                    rightIcon={<BtnEdit/>}
                                >Редактировать </ActButton>
                                <Link to={`${path}/${id}/details/common`} className="btn">Опубликовать</Link>
                                <Link to={`${path}/${id}/details/common`} className="btn">Предпросмотр</Link>
                            </div>
                        </div>
                }
            </ClientExhibitionsPathContext.Consumer>

        )
    }
}

const mapStateToProps = (state, props) => {
    return {...state[defaultReduxKey].exhibitions[props.exhibitionId.toString()]}
};

export default connect(
    mapStateToProps,
)(ClientExhibitionListItem)