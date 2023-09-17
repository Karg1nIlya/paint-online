import Tool from "./Tool";

export default class Brush extends Tool {
    mouseDown: boolean = false;
    
    constructor(canvas: HTMLCanvasElement, socket: WebSocket, userId: string) {
        super(canvas, socket, userId);
        this.listen();
    };

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    };

    mouseUpHandler() {
        this.mouseDown = false;
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.userId,
            figure: {
                type: 'finish',
            }
        }))
    };

    mouseDownHandler(e: MouseEvent) {
        this.mouseDown = true;
        this.context?.beginPath();
        this.context?.moveTo(e.pageX - (e.currentTarget as HTMLElement).offsetLeft, e.pageY - (e.currentTarget as HTMLElement).offsetTop);
    };

    mouseMoveHandler(e: MouseEvent) {
        if(this.mouseDown) {
            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.userId,
                figure: {
                    type: 'brush',
                    x1: e.pageX - (e.currentTarget as HTMLElement).offsetLeft,
                    y1: e.pageY - (e.currentTarget as HTMLElement).offsetTop,
                    color: this.context?.strokeStyle,
                    lineWidth: this.context?.lineWidth
                }
            }));
        }
    };

    static draw(x: number, y: number, context?: CanvasRenderingContext2D, color?: string | CanvasGradient | CanvasPattern, lineWidth: number = 1) {
        if(color) {
            context!.strokeStyle = color;
        }
        context!.lineWidth = lineWidth;
        context?.lineTo(x, y);
        context?.stroke();
    };
};
