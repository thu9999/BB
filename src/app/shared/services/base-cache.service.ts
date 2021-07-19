import { BehaviorSubject, Observable } from 'rxjs';

export abstract class BaseCacheService {
    private stateValues: Map<string, BehaviorSubject<any>> = new Map();

    updateSetting( key: string, value: any ): void {
        if ( !this.stateValues.has( key ) ) {
            this.stateValues.set( key, new BehaviorSubject( value ) );
        } else {
            this.stateValues.get( key ).next( value );
        }
    }

    getSettingAsObservable( key: string ): Observable<any> {
        if ( !this.stateValues.has( key ) ) {
            this.stateValues.set( key, new BehaviorSubject( this.getInitialValue( key ) ) );
        }
        return this.stateValues.get( key ).asObservable();
    }

    protected abstract getInitialValue( key: string ): any;
}