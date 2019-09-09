var tID;
function animateScript() {
    document.querySelector('.active').classList.add('top');
    var position = 100;
    const interval = 110;
    tID = setInterval(() => {
        document.querySelector('.active').style.backgroundPosition =
            `-${position}px -192px`;

        if (position < 1100) { position = position + 100; }

        else { position = 100; }

    }, interval);
}

let images = document.querySelectorAll('#image');
images.forEach((element) => {
    element.addEventListener('transitionend', animate, false)
})

function animate(e) {
    clearInterval(tID);
    document.querySelector('.active').style.backgroundPosition =
        `0px -192px`;
}

