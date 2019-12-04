import React from 'react'

import { connectClubWorkingHours } from 'apps/HomePage/connectors'
import { timeSecondsCutter } from 'utils/datetime'
import './styles.scss'

function ClubWorkingHours({ workTimeFrom, workTimeTo }) {
    return (
        workTimeFrom
            ? (
                <div className="ClubWorkingHours">
                    Часы работы:
                    <div>Будние дни с {timeSecondsCutter(workTimeFrom)} до {timeSecondsCutter(workTimeTo)}</div>
                </div>
            )
            : null
    )
}

export default connectClubWorkingHours(ClubWorkingHours)