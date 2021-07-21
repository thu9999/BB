export class LocalStorageHelper {
    
    static getItem( key: string ): string | null {
        return localStorage.getItem( key );
    }

    static setItem( key: string, value: string ): void {
        localStorage.setItem( key, value );
    }
}