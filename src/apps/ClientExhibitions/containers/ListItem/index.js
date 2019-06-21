import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {formatDateWithLocaleStringFull, timeSecondsCutter, transformDate} from "utils/datetime";
import {ActButton} from "components/Button";
import {BtnEdit, BtnSend, BtnWatch} from 'components/Svg'
import {ClientExhibitionsPathContext} from "apps/ClientExhibitions/context";
import {getExhibitionById} from 'apps/ClientExhibitions/selectors'



import {baseClassName} from './styles.scss'
import './styles.scss'


const Date = ({day, month, year, time_start, time_end}) => {
    const date = transformDate({day, month, year})
    return (
        <div
            className={`${baseClassName}__datetime`}>
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
                        <div className={`${baseClassName}`}>
                            <div className={`${baseClassName}__city`}>
                                {city}
                            </div>
                            <div className={`${baseClassName}__title`}>{exhibition_name}</div>
                            <div className={`${baseClassName}__dates`}>
                                {
                                    dates ?
                                        dates.map((date, index) => <Date key={index}{...date}/>)
                                        :
                                        <div className={`${baseClassName}__datetime`}>
                                            добавьте расписние
                                        </div>
                                }
                            </div>

                            <div className={`${baseClassName}__controls`}>
                                <ActButton
                                    className="btn-z"
                                    action={`${path}/${id}/details/common`}
                                    leftIcon={<BtnEdit/>}
                                >Редактировать </ActButton>
                                <ActButton
                                    className="btn-z"
                                    action={`${path}/${id}/details/common`}
                                    rightIcon={<BtnSend/>}>Опубликовать</ActButton>
                                <ActButton
                                    disabled
                                    className="btn-z"
                                    action={`${path}/${id}/details/common`}
                                    rightIcon={<BtnWatch/>}
                                >Предпросмотр</ActButton>
                            </div>
                        </div>
                }
            </ClientExhibitionsPathContext.Consumer>
        )
    }
}




export default connect(
    getExhibitionById,
)(ClientExhibitionListItem)