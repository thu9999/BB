import { InjectionToken } from '@angular/core';

export const APP_LANGUAGE = 'lang';
export const APP_LANGUAGE_DEFAULT = 'en';

export const CURRENCY_DEFAULT = '€';

export const THOUSAND_SEPARATOR_SYMBOL = ',';
export const DECIMAL_SYMBOL = '.';
export const DECIMAL_NUMBER_DEFAULT = 2;

export const OVERLAY_DATA_TOKEN = new InjectionToken<any>( 'OVERLAY_DATA_TOKEN' );

export const ORIGIN_END = 'end';
export const ORIGIN_TOP = 'top';
export const OVERLAY_START = 'start';
export const OVERLAY_TOP = 'top';