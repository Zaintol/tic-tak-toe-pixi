import { Game } from './game/Game';
import './styles.css';

window.onload = () => {
    const game = new Game();
    document.body.appendChild(game.getView());
}; 