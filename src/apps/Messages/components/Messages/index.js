import React from "react";
import Message from "../Message";
import './styles.scss'
import Container from 'components/Layout/Container'

export default function Messages({messages}) {
    return (
        <div className="Messages">
            <Container pad>
                {
                    messages.map(message => <Message key={message.id} {...message}/>)
                }
            </Container>
        </div>
    )
}