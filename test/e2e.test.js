describe('Popover E2E', () => {
    beforeEach(() => {
        document.body.innerHTML = `
      <button id="popover-btn">Click to toggle popover</button>
    `;

        const Popover = require('../src/js/popover.js').default;
        new Popover(document.getElementById('popover-btn'));
    });

    test('should toggle popover visibility', () => {
        const button = document.getElementById('popover-btn');
        const popover = document.querySelector('.popover');

        expect(popover.style.display).toBe('none');

        button.click();
        expect(popover.style.display).toBe('block');

        button.click();
        expect(popover.style.display).toBe('none');
    });

    test('should center popover above button', () => {
        const button = document.getElementById('popover-btn');
        const popover = document.querySelector('.popover');

        button.getBoundingClientRect = jest.fn(() => ({
            top: 100,
            left: 100,
            width: 150,
            height: 40,
            right: 250,
            bottom: 140,
            x: 100,
            y: 100
        }));

        Object.defineProperty(window, 'pageXOffset', { value: 0, writable: true });
        Object.defineProperty(window, 'pageYOffset', { value: 0, writable: true });

        Object.defineProperty(popover, 'offsetWidth', { value: 200, writable: true });
        Object.defineProperty(popover, 'offsetHeight', { value: 80, writable: true });

        button.click();

        const expectedLeft = 100 + (150 / 2) - (200 / 2);

        const expectedTop = 100 - 80 - 10;

        expect(popover.style.left).toBe(`${expectedLeft}px`);
        expect(popover.style.top).toBe(`${expectedTop}px`);
    });

    test('should handle scroll offset in positioning', () => {
        const button = document.getElementById('popover-btn');
        const popover = document.querySelector('.popover');

        button.getBoundingClientRect = jest.fn(() => ({
            top: 100,
            left: 100,
            width: 150,
            height: 40,
            right: 250,
            bottom: 140,
            x: 100,
            y: 100
        }));

        Object.defineProperty(window, 'pageXOffset', { value: 50, writable: true });
        Object.defineProperty(window, 'pageYOffset', { value: 100, writable: true });

        Object.defineProperty(popover, 'offsetWidth', { value: 200, writable: true });
        Object.defineProperty(popover, 'offsetHeight', { value: 80, writable: true });

        button.click();


        const expectedLeft = 100 + 50 + (150 / 2) - (200 / 2);


        const expectedTop = 100 + 100 - 80 - 10;

        expect(popover.style.left).toBe(`${expectedLeft}px`);
        expect(popover.style.top).toBe(`${expectedTop}px`);
    });

    test('should close popover when clicking outside', () => {
        const button = document.getElementById('popover-btn');
        const popover = document.querySelector('.popover');


        button.click();
        expect(popover.style.display).toBe('block');


        document.body.click();

        expect(popover.style.display).toBe('none');
    });

    test('should not close popover when clicking inside popover', () => {
        const button = document.getElementById('popover-btn');
        const popover = document.querySelector('.popover');

        button.click();
        expect(popover.style.display).toBe('block');

        const popoverContent = popover.querySelector('.popover-content');
        popoverContent.click();

        expect(popover.style.display).toBe('block');
    });
});
