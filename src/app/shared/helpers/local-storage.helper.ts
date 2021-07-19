export class LocalStorageHelper {
    
    static getItem( key: string ): string | null {
        return localStorage.getItem( key );
    }

    static setItem( key: string, value: string ): void {
        localStorage.setItem( key, value );
    }

    static removeItem( key: string ): void {
        localStorage.removeItem( key );
    }

    static key( index: number ): string {
        return localStorage.key( index );
    }

    static size(): number {
        return localStorage.length;
    }

    static clear(): void {
        localStorage.clear();
    }
}