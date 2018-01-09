export default {
    name: 'position',
    directive: {
        componentUpdated(el) {
            const totalWidth = window.innerWidth; // eslint-disable-line no-undef
            const totalHeight = window.innerHeight; // eslint-disable-line no-undef
            const elWidth = el.getBoundingClientRect().width;
            const elHeight = el.getBoundingClientRect().height;
            /* eslint-disable no-mixed-operators */
            const newLeft = totalWidth / 2 - elWidth / 2;
            const newTop = totalHeight / 2 - elHeight / 2;
            el.style.left = `${newLeft}px`; // eslint-disable-line no-param-reassign
            el.style.top = `${newTop}px`; // eslint-disable-line no-param-reassign
        },
    },
};
