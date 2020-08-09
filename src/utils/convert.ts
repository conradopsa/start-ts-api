export function toBoolean (str: string | undefined): boolean{
    return str?.toLowerCase() === 'true';
} 