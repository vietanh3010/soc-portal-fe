

export class ChartHelper {
    static palette: string[] = [
        '#2C1EAE',
        '#FBA429',
        '#1E86FC',
        '#d48265',
        '#91c7ae',
        '#749f83',
        '#ca8622',
        '#bda29a',
        '#6e7074',
        '#546570',
        '#c4ccd3',
        '#ff7875',
        '#516d41',
        '#538338',
        '#35631b',
        '#a5dc86',
        '#893f3f',
        '#f27474',
        '#852526',
        '#0052cc',
        '#833434',
    ];

    static hexToRgb(hex: string) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
}