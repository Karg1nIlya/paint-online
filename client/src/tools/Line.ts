import Tool from "./Tool";

export default class Line extends Tool {
    mouseDown: boolean = false;
    startX: number = 0;
    startY: number = 0;
    // endX: number = 0;
    // endY: number = 0;
    saved: string = '';
    
    constructor(canvas: HTMLCanvasElement, socket: WebSocket, userId: string) {
        super(canvas, socket, userId);
        this.listen();
    };

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    };

    mouseUpHandler(e: MouseEvent) {
        this.mouseDown = false;
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.userId,
            figure: {
                type: 'line',
                x1: this.startX,
                y1: this.startY,
                x2: e.pageX - (e.currentTarget as HTMLElement).offsetLeft,
                y2: e.pageY - (e.currentTarget as HTMLElement).offsetTop,
                color: this.context?.strokeStyle,
                lineWidth: this.context?.lineWidth
            }
        }));
    };

    mouseDownHandler(e: MouseEvent) {
        this.mouseDown = true;
        this.context?.beginPath();
        this.startX = e.pageX - (e.currentTarget as HTMLElement).offsetLeft;
        this.startY = e.pageY - (e.currentTarget as HTMLElement).offsetTop;
        const endX = e.pageX - (e.currentTarget as HTMLElement).offsetLeft;
        const endY = e.pageY - (e.currentTarget as HTMLElement).offsetTop;
        this.context!.moveTo(this.startX, this.startY);
        this.context!.lineTo(endX, endY);
    };

    mouseMoveHandler(e: MouseEvent) {
        if(this.mouseDown) {
            let endX = e.pageX - (e.currentTarget as HTMLElement).offsetLeft;
            let endY = e.pageY - (e.currentTarget as HTMLElement).offsetTop;
            this.draw(this.startX, this.startY, endX, endY);
        }
    };

    draw(x1: number, y1: number, x2: number, y2: number) {
        const img = new Image();
        img.src = this.saved;
        img.onload = () => {
            this.context!.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context!.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.context?.beginPath();
            this.context?.lineTo(x1, y1);
            this.context?.lineTo(x2, y2);
            this.context?.fill();
            this.context?.stroke();
        };
    };

    static staticDraw(x1: number, y1: number, x2: number, y2: number, context: CanvasRenderingContext2D, color: string | CanvasGradient | CanvasPattern, lineWidth: number = 1) {
        context.strokeStyle = color;
        context!.lineWidth = lineWidth;
        context.beginPath();
        context?.lineTo(x1, y1);
        context?.lineTo(x2, y2);
        context.stroke();
    };
};
