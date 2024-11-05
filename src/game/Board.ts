import * as PIXI from 'pixi.js';
import { Cell } from './Cell';

export class Board extends PIXI.Container {
    private cells: Cell[][] = [];
    private cellSize: number;
    private readonly GRID_SIZE = 3;

    constructor(width: number) {
        super();
        this.cellSize = width / this.GRID_SIZE;
        this.createGrid();
    }

    private createGrid(): void {
        for (let row = 0; row < this.GRID_SIZE; row++) {
            this.cells[row] = [];
            for (let col = 0; col < this.GRID_SIZE; col++) {
                const cell = new Cell(this.cellSize);
                cell.position.set(col * this.cellSize, row * this.cellSize);
                this.cells[row][col] = cell;
                this.addChild(cell);
            }
        }
    }

    public getCell(row: number, col: number): Cell {
        return this.cells[row][col];
    }

    public checkWinner(): string | null {
        // Check rows
        for (let row = 0; row < this.GRID_SIZE; row++) {
            if (this.checkLine(row, 0, 0, 1)) {
                return this.cells[row][0].getValue();
            }
        }

        // Check columns
        for (let col = 0; col < this.GRID_SIZE; col++) {
            if (this.checkLine(0, col, 1, 0)) {
                return this.cells[0][col].getValue();
            }
        }

        // Check diagonals
        if (this.checkLine(0, 0, 1, 1)) {
            return this.cells[0][0].getValue();
        }
        if (this.checkLine(0, 2, 1, -1)) {
            return this.cells[0][2].getValue();
        }

        return null;
    }

    private checkLine(startRow: number, startCol: number, rowDelta: number, colDelta: number): boolean {
        const startValue = this.cells[startRow][startCol].getValue();
        if (!startValue) return false;

        for (let i = 1; i < this.GRID_SIZE; i++) {
            const row = startRow + i * rowDelta;
            const col = startCol + i * colDelta;
            if (this.cells[row][col].getValue() !== startValue) {
                return false;
            }
        }
        return true;
    }

    public reset(): void {
        for (let row = 0; row < this.GRID_SIZE; row++) {
            for (let col = 0; col < this.GRID_SIZE; col++) {
                this.cells[row][col].reset();
            }
        }
    }
} 