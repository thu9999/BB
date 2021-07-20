import { defer } from 'rxjs';
import { delay } from 'rxjs/operators';

const DELAY_IN_MILLISECONDS = 1000;

export class DataHelper {
    static asyncData<T>( data: T ) {
        return defer( () => Promise.resolve( data ) ).pipe(
            delay( DELAY_IN_MILLISECONDS )
        );
    }
}