import Popover from '../src/js/popover.js';

describe('Popover', () => {
    let button;
    let popover;

    beforeEach(() => {
        document.body.innerHTML = `
      <button id="test-btn">Test Button</button>
    `;
        button = document.getElementById('test-btn');
        popover = new Popover(button);
    });

    afterEach(() => {
        popover.destroy();
        document.body.innerHTML = '';
    });

    test('should create popover element', () => {
        const popoverElement = document.querySelector('.popover');
        expect(popoverElement).not.toBeNull();
        expect(popoverElement.querySelector('.popover-title')).not.toBeNull();
        expect(popoverElement.querySelector('.popover-content')).not.toBeNull();
    });

    test('should show popover on button click', () => {
        button.click();
        expect(popover.isVisible).toBe(true);
        expect(popover.popover.style.display).toBe('block');
    });

    test('should hide popover on second button click', () => {
        button.click(); // show
        button.click(); // hide
        expect(popover.isVisible).toBe(false);
        expect(popover.popover.style.display).toBe('none');
    });

    test('should hide popover when clicking outside', () => {
        button.click(); // show
        document.body.click(); // click outside
        expect(popover.isVisible).toBe(false);
    });
});
