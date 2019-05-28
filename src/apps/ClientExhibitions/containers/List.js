import React from 'react'
import {ClientExhibitionsPathContext} from "../context";
import {Link} from "react-router-dom";

const List = () =>
    <ClientExhibitionsPathContext.Consumer>
        {
            ({path}) =>
                <div>
                    <div style={{textAlign: 'right'}}>
                        <Link className="btn btn-primary" to={`${path}/add`}>Создать
                            выставку</Link></div>
                    exhibitions list
                </div>
        }
    </ClientExhibitionsPathContext.Consumer>

export default List