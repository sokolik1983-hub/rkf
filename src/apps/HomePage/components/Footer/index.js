import React from 'react'
import './styles.scss'

function Footer({text, links = []}) {
    return (
        <div className="Footer">
            <span>{text}</span>
            <nav>
                {
                    links.map((l) => <a href={l.url} alt="">{l.name}</a>)
                }
            </nav>
        </div>
    )
};

export default Footer;