import React from 'react'
import {isDevEnv} from "../../utils";
import {SERVER} from 'appConfig'

const isDev = isDevEnv();

export default function Img(props) {
    const src = isDev ? SERVER + props.src : props.src;
    const calcProps = {...props, src};
    return <img {...calcProps}/>
}