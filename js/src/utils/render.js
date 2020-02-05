'use strict';

export function renderMoreButton(title = 'More...') {
    let button = document.createElement('button');
    button.className = 'collapsible';
    button.innerText = title;
    button.addEventListener("click", function () {
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        if (content)
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
    });
    return button;
}

export function createElement(domType, className) {
    let elem = document.createElement(domType);
    if (className) elem.className = className;
    return elem;
}