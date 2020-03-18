import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();

export const parse = x => phoneUtil.parseAndKeepRawInput(x, 'RU');
export const format = x => phoneUtil.format(x, PhoneNumberFormat.NATIONAL).replace(/^8/gm, '+7');
export const beautify = x => format(parse(x));
