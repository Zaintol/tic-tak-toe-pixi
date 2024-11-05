import * as PIXI from 'pixi.js';

export class Cell extends PIXI.Container {
    private background: PIXI.Graphics;
    private mark: PIXI.Graphics | null = null;
    private value: string = '';
    private size: number;

    constructor(size: number) {
        super();
        this.size = size;
        this.eventMode = 'static';
        this.cursor = 'pointer';
        this.background = new PIXI.Graphics();
        this.drawBackground();
    }

    private drawBackground(): void {
        this.background.lineStyle(2, 0x000000);
        this.background.beginFill(0xFFFFFF);
        this.background.drawRect(0, 0, this.size, this.size);
        this.background.endFill();
        this.addChild(this.background);
    }

    public drawMark(isX: boolean): void {
        if (this.value !== '') return;
        
        this.value = isX ? 'X' : 'O';
        this.mark = new PIXI.Graphics();
        
        if (isX) {
            this.drawX();
        } else {
            this.drawO();
        }
        
        if (this.mark) {
            this.addChild(this.mark);
        }
    }

    private drawX(): void {
        if (!this.mark) return;
        const padding = this.size * 0.2;
        this.mark.lineStyle(3, 0xFF0000);
        this.mark.moveTo(padding, padding);
        this.mark.lineTo(this.size - padding, this.size - padding);
        this.mark.moveTo(this.size - padding, padding);
        this.mark.lineTo(padding, this.size - padding);
    }

    private drawO(): void {
        if (!this.mark) return;
        const padding = this.size * 0.2;
        const radius = (this.size - padding * 2) / 2;
        this.mark.lineStyle(3, 0x0000FF);
        this.mark.drawCircle(this.size / 2, this.size / 2, radius);
    }

    public getValue(): string {
        return this.value;
    }

    public reset(): void {
        this.value = '';
        if (this.mark) {
            this.removeChild(this.mark);
            this.mark = null;
        }
    }
} 