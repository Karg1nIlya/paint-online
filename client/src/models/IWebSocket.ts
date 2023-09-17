export interface IWSMassage {
    id: string;
    username: string;
    method: string;
    figure: IFigure;
};

interface IFigure {
    color: string | CanvasGradient | CanvasPattern;
    type: string;
    lineWidth: number;
    x1?: number;
    y1?: number;
    x2?: number;
    y2?: number;
    r?: number;
};
