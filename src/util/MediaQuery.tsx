export const sizes  : { [key: string]: string } = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
};

export default function isMatch(media:string) {
    const query = `(min-width: ${sizes[media]})`;
    return window.matchMedia(query).matches;
}

export function findClosest(queries:string[]) {
    for (let i = queries.length - 1; i >= 0; i--) {
        if (isMatch(queries[i])) {
            return queries[i];
        }
    }
    return 'sm';
}