import Tool from "./Tool";

export default class Circle extends Tool {
    mouseDown: boolean = false;
    startX: number = 0;
    startY: number = 0;
    r: number = 0;
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
                type: 'circle',
                x1: this.startX,
                y1: this.startY,
                r: this.r,
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
            this.r = Math.sqrt((endX - this.startX)**2+(endY - this.startY)**2);
            this.draw(this.startX, this.startY, this.r);
        }
    };

    draw(x: number, y: number, r: number) {
        const img = new Image();
        img.src = this.saved;
        img.onload = () => {
            this.context!.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context!.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.context?.beginPath();
            this.context?.arc(x, y, r, 0, 2*Math.PI);
            this.context?.fill();
            this.context?.stroke();
        };
    };

    static staticDraw(x: number, y: number, r: number, context: CanvasRenderingContext2D, color: string | CanvasGradient | CanvasPattern, lineWidth: number = 1) {
        context.fillStyle = color;
        context!.lineWidth = lineWidth;
        context.beginPath();
        context?.arc(x, y, r, 0, 2*Math.PI);
        context.fill();
        context.stroke();
    };
};
