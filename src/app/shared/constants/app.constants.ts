import { InjectionToken } from '@angular/core';
import { LocaleEnum } from '../enums';

export const APP_LANGUAGE = 'lang';
export const DEFAULT_APP_LANGUAGE = 'en';
export const LOCALE_TOKEN = new InjectionToken<any>( 'LOCALE_TOKEN' );
export const DEFAULT_LOCALE = LocaleEnum.EN;

export const APP_LOADING = 'App loading';
export const DEFAULT_APP_LOADING = false;

export const DEFAULT_CURRENCY_SYMBOL = '€';
export const DEFAULT_CURRENCY = 'EUR';

export const THOUSAND_SEPARATOR_SYMBOL = ',';
export const DECIMAL_SYMBOL = '.';
export const DEFAULT_DECIMAL_NUMBER = 2;
export const DEFAULT_MIN_FRACTION_DIGITS = 2;
export const DEFAULT_MAX_FRACTION_DIGITS = 2;

export const OVERLAY_DATA_TOKEN = new InjectionToken<any>( 'OVERLAY_DATA_TOKEN' );

export const ORIGIN_END = 'end';
export const ORIGIN_TOP = 'top';
export const OVERLAY_START = 'start';
export const OVERLAY_TOP = 'top';

export const SHORT_DATE_FORMAT = 'MMM. d';

export const DELAY_IN_MILLISECONDS = 1000;