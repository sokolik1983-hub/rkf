import React from "react"
import {formatDateWithLocaleStringFull, timeSecondsCutter, transformDate} from "utils/datetime";
import {ActButton} from "components/Button"
import {BtnEdit, BtnSend, BtnWatch} from "components/Svg"
import {ClientExhibitionsPathContext} from "apps/ClientExhibitions/context"
import {connectClientExhibitionListItem} from "apps/ClientExhibitions/connectors"


import {baseClassName} from "./styles.scss"
import "./styles.scss"


function Date ({day, month, year, time_start, time_end}) {
    const date = transformDate({day, month, year});

    return (
        <div
            className={`${baseClassName}__datetime`}>
            {formatDateWithLocaleStringFull(date)}&nbsp;
            {time_start ? `${timeSecondsCutter(time_start)} - ${timeSecondsCutter(time_end)}` : null}
        </div>
    )
}

function Controls({exhibitionId}) {
    return (
        <ClientExhibitionsPathContext.Consumer>
            {
                ({path}) =>
                    <div className={`${baseClassName}__controls`}>
                        <ActButton
                            className="btn-z"
                            action={`${path}/${exhibitionId}/details/common`}
                            leftIcon={<BtnEdit/>}
                        >Редактировать </ActButton>
                        <ActButton
                            className="btn-z"
                            action={`${path}/${exhibitionId}/details/common`}
                            rightIcon={<BtnSend/>}>Опубликовать</ActButton>
                        <ActButton
                            disabled
                            className="btn-z"
                            action={`${path}/${exhibitionId}/details/common`}
                            rightIcon={<BtnWatch/>}
                        >Предпросмотр</ActButton>
                    </div>
            }
        </ClientExhibitionsPathContext.Consumer>
    )
}


function ClientExhibitionListItem({
                                      id,
                                      exhibition_name,
                                      city,
                                      dates,
                                  }) {


    return (
        <div className={`${baseClassName}`}>
            <div className={`${baseClassName}__city`}> {city} </div>
            <div className={`${baseClassName}__title`}> {exhibition_name} </div>
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

            <Controls exhibitionId={id}/>
        </div>

    )

}


export default connectClientExhibitionListItem(ClientExhibitionListItem)