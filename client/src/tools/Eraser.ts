import Brush from "./Brush";

export default class Eraser extends Brush {
    mouseDown: boolean = false;
    startX: number = 0;
    startY: number = 0;
    saved: string = '';
    
    constructor(canvas: HTMLCanvasElement, socket: WebSocket, userId: string) {
        super(canvas, socket, userId);
    };

    mouseMoveHandler(e: MouseEvent) {
        if(this.mouseDown) {
            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.userId,
                figure: {
                    type: 'eraser',
                    x1: e.pageX - (e.currentTarget as HTMLElement).offsetLeft,
                    y1: e.pageY - (e.currentTarget as HTMLElement).offsetTop,
                    color: 'white',
                    lineWidth: this.context?.lineWidth
                }
            }));
        }
    };

    draw(x: number, y: number) {
        this.context!.strokeStyle = "white"
        this.context!.lineTo(x, y)
        this.context!.stroke()
    };
};
