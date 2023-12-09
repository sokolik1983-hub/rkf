//получаю список из 7 годов из -6 к текущему
export const years = [
{ text: `${new Date().getFullYear() - 6}`, value: new Date().getFullYear() - 6},
{ text: `${new Date().getFullYear() - 5}`, value: new Date().getFullYear() - 5},
{ text: `${new Date().getFullYear() - 4}`, value: new Date().getFullYear() - 4},
{ text: `${new Date().getFullYear() - 3}`, value: new Date().getFullYear() - 3},
{ text: `${new Date().getFullYear() - 2}`, value: new Date().getFullYear() - 2},
{ text: `${new Date().getFullYear() - 1}`, value: new Date().getFullYear() - 1},
{ text: `${new Date().getFullYear()}`, value: new Date().getFullYear()}
];