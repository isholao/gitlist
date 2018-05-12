module.exports = (options) => {

    const { menuList } = options;
    let { nav, navButton } = options

    if (nav === undefined) {
        nav = $('#p3x-gitlist-navigation')
    }

    if (navButton === undefined) {
        navButton = $('#p3x-gitlist-navigation-menu-button');
    }

    const debounce = require('lodash/debounce')

    const debounceResize = debounce(() => {
        if (navButton.is(':visible')) {
            menuList.css({
                'maxHeight': 'auto',
                'overflowX': 'visible',
            });

        } else {
            const allowedMaxHeight = window.innerHeight - nav.height() - 20;
            menuList.css({
                'maxHeight': allowedMaxHeight,
                'overflowX': 'auto'
            });
        }
    }, 250);
    window.addEventListener('resize', debounceResize);
    debounceResize();
    return debounceResize;
}