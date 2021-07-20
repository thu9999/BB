import { defer } from 'rxjs';
import { delay } from 'rxjs/operators';

import { DELAY_IN_MILLISECONDS } from '../constants';

export class DataHelper {
    static asyncData<T>( data: T ) {
        return defer( () => Promise.resolve( data ) ).pipe(
            delay( DELAY_IN_MILLISECONDS )
        );
    }
}