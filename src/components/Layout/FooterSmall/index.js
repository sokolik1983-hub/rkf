import React from 'react'
import './styles.scss'

function Footer({ text = '© 2019 Портал Российской кинологической федерации ®', links = [], className }) {
    return (
        <div className={`Footer${className ? ' ' + className : ''}`}>
            <div className="Footer__inner">
                <span>{text}</span>
                <nav>
                    {
                        links.map((l) => <a href={l.url} alt="">{l.name}</a>)
                    }
                </nav>
            </div>

        </div>
    )
};

export default Footer;