export default class Tool {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D | null;
    socket: WebSocket;
    userId: string;

    constructor(canvas: HTMLCanvasElement, socket: WebSocket, userId: string) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.destroyEvents();
        this.socket = socket;
        this.userId = userId;
    };

    set fillColor(color: string) {
        if(this.context) {
            this.context.fillStyle = color;
        }
    };

    set strokeColor(color: string) {
        if(this.context) {
            this.context.strokeStyle = color;
        }
    };

    set lineWidth(width: number) {
        if(this.context) {
            this.context.lineWidth = width;
        }
    };

    destroyEvents() {
        this.canvas.onmousemove = null;
        this.canvas.onmousedown = null;
        this.canvas.onmouseup = null;
    };
};
