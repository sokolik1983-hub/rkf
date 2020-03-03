import React from 'react'
import classnames from 'classnames'
//import ActivityIndicator from 'components/ActivityIndicator'
import {generateSize} from 'utils/index'
import './styles.scss'
import {DEFAULT_IMG} from "../../appConfig";

export default function ClientAvatar({
                                         size = 110,
                                         avatar = DEFAULT_IMG.clubAvatar,
                                         activity,
                                         className,
                                         ...rest
                                     }) {
    const styles = {
        backgroundImage: `url(${avatar})`,
        ...generateSize(size),
    };
    return (
        <div

            className={classnames(
                "ClientAvatar",
                {[className]: className}
            )}
            style={styles}
            {...rest}
        >
            {/* <ActivityIndicator size={size/5} active={activity}/> */}
        </div>
    )
}