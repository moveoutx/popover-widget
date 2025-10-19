export default class Popover {
    constructor(buttonElement) {
        this.button = buttonElement;
        this.popover = null;
        this.isVisible = false;

        this.init();
    }

    init() {
        this.createPopover();
        this.bindEvents();
    }

    createPopover() {
        this.popover = document.createElement('div');
        this.popover.className = 'popover';
        this.popover.innerHTML = `
      <div class="popover-title">Popover title</div>
      <div class="popover-content">
        And here's some amazing content. It's very engaging. Right?
      </div>
      <div class="popover-arrow"></div>
    `;
        this.popover.style.display = 'none';
        document.body.appendChild(this.popover);
    }

    bindEvents() {
        this.button.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });

        document.addEventListener('click', (e) => {
            if (this.isVisible && !this.popover.contains(e.target) && e.target !== this.button) {
                this.hide();
            }
        });
    }

    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }

    show() {
        const buttonRect = this.button.getBoundingClientRect();
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        this.popover.style.display = 'block';

        const popoverWidth = this.popover.offsetWidth;
        const popoverHeight = this.popover.offsetHeight;

        const left = buttonRect.left + scrollLeft + (buttonRect.width / 2) - (popoverWidth / 2);

        const top = buttonRect.top + scrollTop - popoverHeight - 10;

        this.popover.style.left = `${left}px`;
        this.popover.style.top = `${top}px`;

        this.isVisible = true;
    }

    hide() {
        this.popover.style.display = 'none';
        this.isVisible = false;
    }

    destroy() {
        if (this.popover && this.popover.parentNode) {
            this.popover.parentNode.removeChild(this.popover);
        }
        this.button.removeEventListener('click', this.toggle);
    }
}
