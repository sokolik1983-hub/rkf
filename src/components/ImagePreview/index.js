import React from 'react'
import {useVisibility} from 'shared/hooks'
import './styles.scss'

export default function ImagePreview({src}) {
    const {visibility, setVisible, setInvisible} = useVisibility(false);
    return (
        <>
            <div onClick={setVisible} className="ImagePreview"><img src={src} alt=""/></div>
            {
                visibility ?
                    <div onClick={setInvisible} className="ImagePreview__full">
                        <img  src={src} alt=""/>
                    </div>
                    : null
            }
        </>
    )
}