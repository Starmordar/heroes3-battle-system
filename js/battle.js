let hexes = [...document.querySelectorAll('g')]

hexes = hexes.filter((element) => element.getAttribute('transform') !== null);

hexes.shift();

let coordinates = hexes.map((element) => {
    let parameters = element.getBoundingClientRect()

    let centerX = parameters.top + parameters.width / 2;
    let centerY = parameters.left + parameters.height / 2;

    return [centerX, centerY];
})

globalPotion = [0, 1];

let gameUnitsStack = [{
    pos1: 9,
    pos2: 0,
    container: null,
    img: document.querySelector('.img-1')
}, {
    pos1: 7,
    pos2: 0,
    container: null,
    img: document.querySelector('.img-2')
}, {
    pos1: 5,
    pos2: 0,
    container: null,
    img: document.querySelector('.img-3')
}, {
    pos1: 3,
    pos2: 0,
    container: null,
    img: document.querySelector('.img-4')
}, {
    pos1: 1,
    pos2: 0,
    container: null,
    img: document.querySelector('.img-5')
}];

let global = [];

function findOrigin(hexes, coordinates) {
    const currentPolygon = document.querySelector('.active');

    let parameters = currentPolygon.getBoundingClientRect()

    let centerX = parameters.top + parameters.width / 2;
    let centerY = parameters.left + parameters.height / 2

    let distances = [];
    for (let i = 0; i < coordinates.length; i++) {
        let dist = Math.sqrt((centerX - coordinates[i][0]) * (centerX - coordinates[i][0]) + (centerY - coordinates[i][1]) * (centerY - coordinates[i][1]));

        distances.push([i, dist])
    }

    distances.sort((a, b) => Number(a[1]) - Number(b[1]));

    for (let i = 0; i < 69; i++) {
        if (i == 0) continue;

        hexes[distances[i][0]].firstElementChild.classList.add('origin')
    }
}

function initImagePosition(element) {
    let parameters = element.container.getBoundingClientRect()

    let centerX = parameters.top + parameters.width / 2;
    let centerY = parameters.left + parameters.height / 2;

    element.img.style.left = centerY - 50 + 'px';
    element.img.style.top = centerX - 100 + 'px';

    setTimeout(() => {
        element.img.style.transition = 'top 1s linear, left 1s linear';
    }, 10)
}

gameUnitsStack.forEach(element => {
    let container = findByPosition(element.pos1, element.pos2, hexes);
    element['container'] = container;

    container.classList.add('unit-position');

    initImagePosition(element);
});

gameUnitsStack[gameUnitsStack.length - 1].container.classList.add('wall');
gameUnitsStack[gameUnitsStack.length - 1].img.classList.add('active');
findOrigin(hexes, coordinates);

hexes.forEach(element => {
    element.addEventListener("mouseenter", function (e) {
        e.target.firstElementChild.classList.add('active-hex');
    });

    element.addEventListener("mouseleave", function (e) {
        e.target.firstElementChild.classList.remove('active-hex');
    });

    element.addEventListener("click", function (e) {
        const hex = e.target.parentElement;

        if (hex.classList.contains('origin') && !hex.classList.contains('unit-wait')) {
            let parameters = element.getBoundingClientRect()

            let centerX = parameters.top + parameters.width / 2;
            let centerY = parameters.left + parameters.height / 2;

            document.querySelector('.active').style.left = centerY - 50 + 'px';
            document.querySelector('.active').style.top = centerX - 100 + 'px';

            animateScript();

            let gridNumber = Array.from(hex.parentElement.querySelectorAll('text'));

            gridNumber = gridNumber.map((elem) => {
                return elem.textContent;
            })

            gridNumber.push(hex);

            global = gridNumber;

        }
    })
});

function findByPosition(pos1, pos2, hexes) {
    let gridCoordinates = hexes.map((element) => {
        let gridNumber = Array.from(element.querySelectorAll('text'));

        gridNumber = gridNumber.map((elem) => {
            return elem.textContent;
        })

        return gridNumber;
    })
    for (let i = 0; i < gridCoordinates.length; i++) {
        if (gridCoordinates[i][0] == pos1 && pos2 == gridCoordinates[i][1]) {
            return hexes[i].firstElementChild
        }
    }
}

let images1 = document.querySelectorAll('#image');
images1.forEach(element => {
    element.addEventListener('transitionend', (e) => {
        if (e.propertyName == 'top') {
            e.target.classList.remove('active');

            let first = gameUnitsStack.pop()

            first.container.classList.remove('unit-position');
            first.container.classList.remove('wall');

            first = updatePosition(global[1], global[0], global[2], first)

            gameUnitsStack.unshift(first);

            let neight = document.querySelectorAll('.origin');
            neight.forEach(element => {
                element.classList.remove('origin')
            });

            gameUnitsStack[gameUnitsStack.length - 1].img.classList.add('active');
            gameUnitsStack[gameUnitsStack.length - 1].img.classList.add('wall');
            gameUnitsStack[gameUnitsStack.length - 1].img.classList.add('unit-point');

            findOrigin(hexes, coordinates);

        }

    }, false)
});

function updatePosition(newPos1, newPos2, newContainer, unit) {
    unit.pos1 = newPos1;
    unit.pos2 = newPos2

    unit.container = newContainer

    return unit
}