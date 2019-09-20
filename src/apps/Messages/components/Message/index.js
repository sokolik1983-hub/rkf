import React from 'react'
import classnames from 'classnames'
import Button from 'components/Button'
import {connectMessage} from 'apps/Messages/connectors'
import {useTimeOut} from 'shared/hooks'
import './styles.scss'

function Message({id, text, removeMessage, timeOut}) {
    const remove = () => removeMessage(id);
    if(timeOut){
        useTimeOut(remove, timeOut)
    }
    return (
        <div className={classnames('Message')}>
            <div className="Message__text">{text}</div>
            <Button onClick={remove} className="Message__close"/>
        </div>
    )
}

export default connectMessage(Message)