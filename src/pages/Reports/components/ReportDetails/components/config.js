import React from "react";
import * as search from "searchtabular";
import * as sort from 'sortabular';
import calendar from "./Calendar";
import multiSelect from "./MultiSelect";
import boolButtons from "./BoolButtons";
import { endpointCertificatesList } from '../../../config';
import { Request } from "utils/request";

const inputFF = ({ props } = {}) => { // Firefox onBlur fix
    const Input = ({ value, onValue }) => {
        const onKeyUp = ({ key, target: { value } }) => {
            if (key === 'Enter') {
                onValue(parseValue(value));
            }
        };
        const onBlur = (event) => {
            const { target: { value } } = event;

            onValue(parseValue(value));
        };
        const parseValue = v => (v === parseFloat(v) ? parseFloat(v) : v);

        return (
            <input
                defaultValue={value}
                onKeyUp={onKeyUp}
                onBlur={onBlur}
                autoFocus
                {...props}
            />
        );
    };
    return Input;
};

export const finalReportColumns = async (onRemove, sortingColumns, sortable, editable, breeds, castes, grades, rankType, isSend) => {
    let cols = null;
    const options = { url: `${endpointCertificatesList}?id=${rankType}` };

    const buildColumns = (data) => {
        cols = [
            {
                property: 'breed',
                header: {
                    label: 'Порода'
                }
            },
            {
                header: {
                    label: 'Судья'
                },
                children: [
                    {
                        property: 'judge-surname',
                        header: {
                            label: 'Фамилия'
                        }
                    },
                    {
                        property: 'judge-name',
                        header: {
                            label: 'Имя'
                        }
                    },
                    {
                        property: 'judge-patronymic',
                        header: {
                            label: 'Отчество'
                        }
                    }
                ],
                props: {
                    style: {
                        textAlign: 'center'
                    }
                }
            },
            {
                property: 'catalog-number',
                header: {
                    label: '№ по каталогу',
                }
            },
            {
                property: 'dog-name',
                header: {
                    label: 'Кличка собаки'
                }
            },
            {
                property: 'birthday',
                header: {
                    label: 'Дата рождения'
                }
            },
            {
                property: 'pedigree-number',
                header: {
                    label: 'Номер родословной'
                }
            },
            {
                property: 'class',
                header: {
                    label: 'Класс'
                }
            },
            {
                property: 'score',
                header: {
                    label: 'Оценка'
                }
            }
        ];

        cols.map(col => {
            if (!col.property && col.children) {
                col.children.forEach(child => {
                    child.header.formatters = [
                        sort.header({
                            sortable,
                            getSortingColumns: () => sortingColumns,
                            strategy: sort.strategies.byProperty
                        })
                    ];

                    child.cell = {
                        formatters: [value => value ? <span>{value}</span> : <input value="" readOnly />],
                        transforms: [
                            (value, extra) => editable(inputFF())(value, extra, {
                                className: extra.rowData.edited && 'edited'
                            })
                        ]
                    }
                })
            } else {
                col.header.formatters = [
                    sort.header({
                        sortable,
                        getSortingColumns: () => sortingColumns,
                        strategy: sort.strategies.byProperty
                    })
                ];

                if (col.property === 'birthday') {
                    col.cell = {
                        formatters: [value => value ? <span>{value}</span> : <input value="" readOnly />],
                        transforms: [
                            (value, extra) => editable(calendar())(new Date(value ? value : null), extra, {
                                className: extra.rowData.edited && 'edited'
                            })
                        ],
                        props: {
                            style: {
                                textAlign: 'center'
                            }
                        },
                        resolve: date => date && new Date(date).toLocaleDateString()
                    }
                } else if (col.property === 'breed' || col.property === 'class' || col.property === 'score') {
                    col.cell = {
                        transforms: [
                            (value, extra) => editable(multiSelect({
                                options: col.property === 'breed' ? breeds :
                                    col.property === 'class' ? castes :
                                        grades,
                                property: col.property,
                            }))(value, extra, {
                                className: extra.rowData.edited && 'edited'
                            })
                        ],
                        formatters: [
                            search.highlightCell
                        ],
                        props: {
                            style: {
                                minWidth: '190px'
                            }
                        },
                        resolve: item => item && item.label
                    }
                } else if (col.property === 'pedigree-number') {
                    col.cell = {
                        formatters: [value => value ? <span>{value}</span> : <input value="" readOnly />],
                        transforms: [
                            (value, extra) => editable(inputFF())((value || ''), extra, {
                                className: extra.rowData.edited && 'edited'
                            })
                        ],
                        props: {
                            style: {
                                textAlign: 'center'
                            }
                        }
                    }
                } else if (col.property === 'catalog-number') {
                    col.cell = {
                        formatters: [value => value ? <span>{parseInt(value) || ''}</span> : <input value="" readOnly />],
                        transforms: [
                            (value, extra) => editable(inputFF({ props: { maxLength: 10 } }))((parseInt(value) || ''), extra, {
                                className: extra.rowData.edited && 'edited'
                            })
                        ],
                        props: {
                            style: {
                                textAlign: 'center'
                            }
                        }
                    }
                } else {
                    col.cell = {
                        formatters: [value => value ? <span>{value}</span> : <input value="" readOnly />],
                        transforms: [
                            (value, extra) => editable(inputFF())(value, extra, {
                                className: extra.rowData.edited && 'edited'
                            })
                        ]
                    }
                }
            }

            return col;
        });

        cols.push(...data.map(col => ({
            property: col.id,
            header: {
                label: col.name,
                // formatters: [
                //     sort.header({
                //         sortable,
                //         getSortingColumns: () => sortingColumns,
                //         strategy: sort.strategies.byProperty
                //     })
                // ]
            },
            cell: {
                formatters: [
                    active => active && <span>&#10003;</span>
                ],
                transforms: [
                    (value, extra) => editable(boolButtons())(value, extra, {
                        className: extra.rowData.edited && 'edited',
                        style: {
                            textAlign: 'center'
                        }
                    })
                ]
            }
        })));

        cols.push({
            property: 'date',
            header: {
                label: 'Дата проведения мероприятия',
            },
            cell: {
                props: {
                    style: {
                        textAlign: 'center'
                    }
                }
            }
        });
        if(!isSend){
            cols.push({
                props: {
                    style: {
                        width: 50
                    }
                },
                cell: {
                    formatters: [
                        (value, { rowData }) => (
                            <span
                                className="remove"
                                onClick={() => onRemove(rowData.id)} style={{ cursor: 'pointer' }}
                            >
                                &#10007;
                        </span>
                        )
                    ]
                }
            });
        }
    };

    await Request(options, buildColumns);

    return cols;
};

export const judgeLoadReportColumns = (onRemove, sortingColumns, sortable, editable, breeds, groups, countries, isSend) => {
    let cols = [
        {
            header: {
                label: 'Судья'
            },
            children: [
                {
                    property: 'judge-surname',
                    header: {
                        label: 'Фамилия'
                    },
                    footer: () => <b>ОБЩЕЕ КОЛИЧЕСТВО:</b>,
                },
                {
                    property: 'judge-name',
                    header: {
                        label: 'Имя'
                    }
                },
                {
                    property: 'judge-patronymic',
                    header: {
                        label: 'Отчество'
                    }
                },
                {
                    property: 'judge-country',
                    header: {
                        label: 'Страна'
                    }
                }
            ],
            props: {
                style: {
                    textAlign: 'center'
                }
            }
        },
        {
            header: {
                label: 'Количество собак'
            },
            children: [
                {
                    property: 'dogs-distributed',
                    header: {
                        label: 'Распределено'
                    },
                    props: {
                        style: {
                            textAlign: 'center'
                        }
                    },
                    footer: rows => <b style={{ display: 'block', textAlign: 'center' }}>{rows.reduce((a, b) => a + (b['dogs-distributed'] ? +b['dogs-distributed'] : 0), 0)}</b>
                },
                {
                    property: 'dogs-judged',
                    header: {
                        label: 'Отсужено'
                    },
                    props: {
                        style: {
                            textAlign: 'center'
                        }
                    },
                    footer: rows => <b style={{ display: 'block', textAlign: 'center' }}>{rows.reduce((a, b) => a + (b['dogs-judged'] ? +b['dogs-judged'] : 0), 0)}</b>
                }
            ],
            props: {
                style: {
                    textAlign: 'center'
                }
            }
        },
        {
            property: 'breed',
            header: {
                label: 'Порода'
            }
        },
        {
            property: 'group',
            header: {
                label: 'Группа FCI'
            }
        }];
    if(!isSend){
        cols.push({
            cell: {
                formatters: [
                    (value, { rowData }) => (
                        <span
                            className="remove"
                            onClick={() => onRemove(rowData.id)} style={{ cursor: 'pointer' }}
                        >
                            &#10007;
                    </span>
                    )
                ]
            },
            props: {
                    style: {
                    width: 50
                }
            }
        })
    };
    cols.map(col => {
        if (!col.property && col.children) {
            col.children.forEach(child => {
                child.header.formatters = [
                    sort.header({
                        sortable,
                        getSortingColumns: () => sortingColumns,
                        strategy: sort.strategies.byProperty
                    })
                ];

                if (child.property === 'judge-country') {
                    child.cell = {
                        transforms: [
                            (value, extra) => editable(multiSelect({
                                options: countries,
                                property: child.property,
                            }))(value, extra, {
                                className: extra.rowData.edited && 'edited'
                            })
                        ],
                        formatters: [
                            search.highlightCell
                        ],
                        props: {
                            style: {
                                minWidth: '200px'
                            }
                        },
                        resolve: item => item && item.label
                    }
                } else if (child.property === 'dogs-distributed' || child.property === 'dogs-judged') {
                    child.cell = {
                        formatters: [value => value ? <span>{value}</span> : <input value="" readOnly />],
                        transforms: [
                            (value, extra) => editable(inputFF())((value || 0), extra, {
                                className: extra.rowData.edited && 'edited'
                            })
                        ]
                    };
                } else {
                    child.cell = {
                        formatters: [value => value ? <span>{value}</span> : <input value="" readOnly />],
                        transforms: [
                            (value, extra) => editable(inputFF())(value, extra, {
                                className: extra.rowData.edited && 'edited'
                            })
                        ]
                    };
                }
            });
        } else if (col.property) {
            if (col.property === 'breed' || col.property === 'group') {
                col.cell = {
                    formatters: [search.highlightCell],
                    transforms: [
                        (value, extra) => editable(multiSelect({
                            options: col.property === 'breed' ? breeds : groups,
                            property: col.property,
                            isMulti: true
                        }))(value, extra, {
                            className: extra.rowData.edited && 'edited'
                        })
                    ],
                    resolve: opts => opts && opts.map(item => item.label).join(', ')
                };
                col.props = {
                    style: {
                        minWidth: '210px'
                    }
                };
            } else {
                col.header.formatters = [
                    sort.header({
                        sortable,
                        getSortingColumns: () => sortingColumns,
                        strategy: sort.strategies.byProperty
                    })
                ];
                col.cell = {
                    formatters: [search.highlightCell],
                    transforms: [
                        (value, extra) => editable(inputFF())(value, extra, {
                            className: extra.rowData.edited && 'edited'
                        })
                    ]
                };
            }
        }

        return col;
    });

    return cols;
};

export const mainRingStatementColumns = (editable, breeds) => {
    let cols = [
        {
            property: 'position',
            props: {
                style: {
                    textAlign: 'center'
                }
            }
        },
        {
            property: 'breed'
        },
        {
            property: 'catalog_number'
        },
        {
            property: 'dog_name'
        },
        {
            property: 'pedigree_number',
            props: {
                style: {
                    textAlign: 'center'
                }
            }
        }
    ];

    cols.map(col => {
        if (col.property === 'breed') {
            col.cell = {
                transforms: [
                    (value, extra) => editable(multiSelect({
                        options: breeds,
                        property: col.property,
                    }))(value, extra, {
                        className: extra.rowData.edited && 'edited'
                    })
                ],
                resolve: item => item && item.label
            }
        } else if (col.property === 'catalog_number') {
            col.cell = {
                formatters: [value => value ? <span>{parseInt(value) || ''}</span> : <input value="" readOnly maxLength="10" />],
                transforms: [
                    (value, extra) => editable(inputFF({ props: { maxLength: 10 } }))((parseInt(value) || ''), extra, {
                        className: extra.rowData.edited && 'edited'
                    })
                ]
            }
        } else if (col.property !== 'position') {
            col.cell = {
                formatters: [value => value ? <span>{value}</span> : <input value="" readOnly />],
                transforms: [
                    (value, extra) => editable(inputFF())(value, extra, {
                        className: extra.rowData.edited && 'edited'
                    })
                ]
            };
        }

        return col;
    });

    return cols;
};