import React from 'react';
import {
    formatDateWithLocaleStringFull,
    timeSecondsCutter,
    transformDateSafariFriendly
} from 'utils/datetime';

export default function Date({ day, month, year, time_start, time_end }) {
    const date = transformDateSafariFriendly({ day, month, year });
    return (
        <div className="ExhibitionListItem__datetime">
            {formatDateWithLocaleStringFull(date)}&nbsp;
            {time_start
                ? `${timeSecondsCutter(time_start)}${
                      time_end ? ` - ${timeSecondsCutter(time_end)}` : ''
                  }`
                : ''}
        </div>
    );
}
