import Tool from "./Tool";

export default class Rect extends Tool {
    mouseDown: boolean = false;
    startX: number = 0;
    startY: number = 0;
    width: number = 0;
    height: number = 0;
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

    mouseUpHandler() {
        this.mouseDown = false;
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.userId,
            figure: {
                type: 'rect',
                x1: this.startX,
                y1: this.startY,
                x2: this.width,
                y2: this.height,
                color: this.context?.fillStyle,
                lineWidth: this.context?.lineWidth
            }
        }));
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
        this.startX = e.pageX - (e.currentTarget as HTMLElement).offsetLeft;
        this.startY = e.pageY - (e.currentTarget as HTMLElement).offsetTop;
        this.saved = this.canvas.toDataURL();
    };

    mouseMoveHandler(e: MouseEvent) {
        if(this.mouseDown) {
            let endX = e.pageX - (e.currentTarget as HTMLElement).offsetLeft;
            let endY = e.pageY - (e.currentTarget as HTMLElement).offsetTop;
            this.width = endX - this.startX;
            this.height = endY - this.startY;
            this.draw(this.startX, this.startY, this.width, this.height);
        }
    };

    draw(x: number, y: number, w: number, h: number) {
        const img = new Image();
        img.src = this.saved;
        img.onload = () => {
            this.context!.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context!.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.context?.beginPath();
            this.context?.rect(x, y, w, h);
            this.context?.fill();
            this.context?.stroke();
        };
    };

    static staticDraw(x: number, y: number, w: number, h: number, context: CanvasRenderingContext2D, color: string | CanvasGradient | CanvasPattern, lineWidth: number = 1) {
        context.fillStyle = color;
        context!.lineWidth = lineWidth;
        context.beginPath();
        context.rect(x, y, w, h);
        context.fill();
        context.stroke();
    };
};
