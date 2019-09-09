var tID;
function animateScript() {
    document.getElementById("image").classList.add('top');
    var position = 100;
    const interval = 110;
    tID = setInterval(() => {
        document.getElementById("image").style.backgroundPosition =
            `-${position}px -192px`;

        if (position < 1100) { position = position + 100; }

        else { position = 100; }

    }, interval);
}

document.getElementById("image").addEventListener('transitionend', animate, false);


function animate(e) {
    clearInterval(tID);
    document.getElementById("image").style.backgroundPosition =
        `0px -192px`;
}

