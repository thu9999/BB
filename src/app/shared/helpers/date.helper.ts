export class DateHelper {
    
    static toNumberDate( date: number | string ): number {
        if ( typeof date === 'string'  ) {
            return new Date( date ).getTime()
        }
        return date;
    }
}