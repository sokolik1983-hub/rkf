import React, { memo } from "react";
import {allbreedJudgeIcon, judgeIcon} from "../../components/Layouts/UserLayout/config";
import {Link} from "react-router-dom";

const JudgeCard = ({
    authAndReject,
    city,
    disabled,
    email,
    id,
    is_all_breeder,
    judge_alias,
    judge_cert_number,
    judge_en_full_name,
    judge_id,
    judge_last_name,
    judge_name,
    judge_second_name,
    nbc_invite_status,
    phone_number,
}) => {
    const fullName = `${judge_last_name ? judge_last_name : ''} 
        ${judge_name ? judge_name : ''} 
        ${judge_second_name ? judge_second_name : ''}`

    return (
        <div className="judges-list__item">
            <div className="judges-list__wrap">
                <div className="judges-list__link">
                    <Link to={`/user/${judge_alias}`}>
                        <p>{`${judge_last_name} `}</p><br />
                        <p>{`${judge_name} `}</p>
                        <p className="judges-list__second-name">{`${judge_second_name} `}{judgeIcon}{is_all_breeder && allbreedJudgeIcon}</p>
                    </Link>
                </div>
                <div className="judges-list__inner">
                    <p>{judge_en_full_name}</p>
                </div>
                <div className="judges-list__inner">
                    <p>Лист судьи №:&nbsp;</p>
                    <p>{judge_cert_number}</p>
                </div>
            </div>
            <div className="judges-list__wrap">
                <div className="judges-list__inner">
                    <p>Город:&nbsp;</p>
                    <p>{city}</p>
                </div>
                <div className="judges-list__inner">
                    <p>Телефон:&nbsp;</p>
                    <p>{phone_number}</p>
                </div>
                <div className="judges-list__inner">
                    <p>E-mail:&nbsp;</p>
                    <p>{email}</p>
                </div>
            </div>
            <div className="judges-list__wrap checkbox-wrap">
                <form>
                    <div className="checkbox-wrap__inner">
                        <label htmlFor={`authJudgeId=${id}`}>Авторизовать</label>
                        <input
                            type="radio"
                            name="status"
                            id={`authJudgeId=${id}`}
                            value={2}
                            onChange={(event) => authAndReject(fullName, event, judge_id)}
                            checked={nbc_invite_status === 2}
                            disabled={disabled?.[0]?.[1] > 1}
                        />
                    </div>
                    <div className="checkbox-wrap__inner">
                        <label htmlFor={`rejectJudgeId=${id}`}>Отклонить</label>
                        <input
                            type="radio"
                            name="status"
                            id={`rejectJudgeId=${id}`}
                            value={3}
                            onChange={(event) => authAndReject(fullName, event, judge_id)}
                            checked={nbc_invite_status === 3}
                            disabled={disabled?.[0]?.[1] > 1}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default memo(JudgeCard);
