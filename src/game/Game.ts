import * as PIXI from 'pixi.js';
import { Board } from './Board';

export class Game {
    private app: PIXI.Application;
    private board: Board;
    private currentPlayer: boolean = true; // true = X, false = O
    private gameOver: boolean = false;
    private moveCount: number = 0;

    constructor() {
        this.app = new PIXI.Application({
            width: 600,
            height: 600,
            backgroundColor: 0xE0E0E0,
            antialias: true,
            resolution: 1
        });

        this.board = new Board(600);
        this.app.stage.addChild(this.board);
        this.setupCellListeners();
    }

    private setupCellListeners(): void {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const cell = this.board.getCell(row, col);
                cell.on('pointerdown', () => this.onCellClick(row, col));
            }
        }
    }

    private onCellClick(row: number, col: number): void {
        if (this.gameOver) return;

        const cell = this.board.getCell(row, col);
        if (cell.getValue() !== '') return;

        cell.drawMark(this.currentPlayer);
        this.moveCount++;
        
        const winner = this.board.checkWinner();
        if (winner) {
            this.gameOver = true;
            setTimeout(() => {
                alert(`Player ${winner} wins!`);
                this.reset();
            }, 100);
        } else if (this.moveCount === 9) {
            this.gameOver = true;
            setTimeout(() => {
                alert("It's a draw!");
                this.reset();
            }, 100);
        }

        this.currentPlayer = !this.currentPlayer;
    }

    public getView(): HTMLCanvasElement {
        return this.app.view as HTMLCanvasElement;
    }

    private reset(): void {
        this.board.reset();
        this.currentPlayer = true;
        this.gameOver = false;
        this.moveCount = 0;
    }
} 