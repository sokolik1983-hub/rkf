import React from "react";
import * as search from "searchtabular";
import * as edit from "react-edit";
import * as sort from 'sortabular';
import calendar from "./Calendar";
import multiSelect from "./MultiSelect";
import {endpointCertificatesList} from '../../../config';
import {Request} from "../../../../../utils/request";

export const finalReportColumns = async (onRemove, sortingColumns, sortable, editable, breeds, castes, grades, rankType) => {
    let cols = null;
    const options = {url: `${endpointCertificatesList}?id=${rankType}`};

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
            if(!col.property && col.children) {
                col.children.forEach(child => {
                    child.header.formatters = [
                        sort.header({
                            sortable,
                            getSortingColumns: () => sortingColumns,
                            strategy: sort.strategies.byProperty
                        })
                    ];
                    child.cell = {
                        formatters: [search.highlightCell],
                        transforms: [
                            (value, extra) => editable(edit.input())(value, extra, {
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

                if(col.property === 'birthday') {
                    col.cell = {
                        formatters: [search.highlightCell],
                        transforms: [
                            (value, extra) => editable(calendar())(value, extra, {
                                className: extra.rowData.edited && 'edited'
                            })
                        ],
                        resolve: date => date && date.toLocaleDateString()
                    }
                } else if(col.property === 'breed' || col.property === 'class' || col.property === 'score') {
                    col.cell = {
                        transforms: [
                            editable(
                                edit.dropdown({
                                    options: col.property === 'breed' ? breeds :
                                             col.property === 'class' ? castes :
                                             grades
                                })
                            )
                        ],
                        formatters: [
                            search.highlightCell
                        ],
                    }
                } else {
                    col.cell = {
                        formatters: [search.highlightCell],
                        transforms: [
                            (value, extra) => editable(edit.input())(value, extra, {
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
                formatters: [
                    sort.header({
                        sortable,
                        getSortingColumns: () => sortingColumns,
                        strategy: sort.strategies.byProperty
                    })
                ]
            },
            cell: {
                formatters: [
                    active => active && <span>&#10003;</span>
                ],
                transforms: [
                    (value, extra) => editable(edit.boolean())(value, extra, {
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
                label: 'Дата проведения выставки',
            }
        });

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
    };

    await Request(options, buildColumns);

    return cols;
};

export const judgeLoadReportColumns = (onRemove, sortingColumns, sortable, editable, breeds, groups, countries) => {
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
                    footer: () => <b>ОБЩЕЕ КОЛИЧЕСТВО ОТСУЖЕННЫХ СОБАК:</b>,
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
                    }
                },
                {
                    property: 'dogs-judged',
                    header: {
                        label: 'Отсужено'
                    },
                    footer: rows => <b>{rows.reduce((a, b) => a + (b['dogs-judged'] ? +b['dogs-judged'] : 0), 0)}</b>
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
        },
        {
            cell: {
                formatters: [
                    (value, { rowData }) => (
                        <span
                            className="remove"
                            onClick={() => onRemove(rowData.id)} style={{cursor: 'pointer'}}
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
        }
    ];

    cols.map(col => {
        if(!col.property && col.children) {
            col.children.forEach(child => {
                child.header.formatters = [
                    sort.header({
                        sortable,
                        getSortingColumns: () => sortingColumns,
                        strategy: sort.strategies.byProperty
                    })
                ];

                if(child.property === 'judge-country') {
                    child.cell = {
                        transforms: [
                            editable(
                                edit.dropdown({
                                    options: countries
                                })
                            )
                        ],
                        formatters: [
                            search.highlightCell
                        ],
                    }
                } else {
                    child.cell = {
                        formatters: [search.highlightCell],
                        transforms: [
                            (value, extra) => editable(edit.input())(value, extra, {
                                className: extra.rowData.edited && 'edited'
                            })
                        ]
                    };
                }
            });
        } else if(col.property) {
            if(col.property === 'breed' || col.property === 'group') {
                col.cell = {
                    formatters: [search.highlightCell],
                    transforms: [
                        (value, extra) => editable(multiSelect({
                            options: col.property === 'breed' ? breeds : groups
                        }))(value, extra, {
                            className: extra.rowData.edited && 'edited'
                        })
                    ],
                    resolve: opts => opts && opts.map(item => item.label).join(', ')
                };
                col.props = {
                    style: {
                        minWidth: '200px'
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
                        (value, extra) => editable(edit.input())(value, extra, {
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

export const mainRingStatementColumns = (onRemove, editable, breeds) => {
    let cols = [
        {
            property: 'position'
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
            property: 'pedigree_number'
        }
    ];

    cols.map(col => {
        if(col.property === 'breed') {
            col.cell = {
                transforms: [
                    editable(
                        edit.dropdown({
                            options: breeds
                        })
                    )
                ]
            }
        } else {
            col.cell = {
                transforms: [
                    (value, extra) => editable(edit.input())(value, extra, {
                        className: extra.rowData.edited && 'edited'
                    })
                ]
            };
        }

        return col;
    });

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

    return cols;
};