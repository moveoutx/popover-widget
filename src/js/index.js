import '../styles/main.css';
import Popover from './popover.js';

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('popover-btn');
    new Popover(button);
});
