import React from 'react'
import classnames from 'classnames'
import './styles.scss'
import {generateSize} from "utils/index";

export default function ActivityIndicator({active, size = 22}) {
    return <div style={generateSize(size)}
                className={classnames(
                    "ActivityIndicator",
                    {"ActivityIndicator--active": active}
                )}/>
}