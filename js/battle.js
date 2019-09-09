let hexes = [...document.querySelectorAll('g')]

hexes = hexes.filter((element) => element.getAttribute('transform') !== null);

hexes.shift();

let coordinates = hexes.map((element) => {
    let parameters = element.getBoundingClientRect()

    let centerX = parameters.top + parameters.width / 2;
    let centerY = parameters.left + parameters.height / 2;

    return [centerX, centerY];
})

function findOrigin(hexes, coordinates) {
    const currentPolygon = document.querySelector('.wall');

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


hexes.forEach(element => {
    element.addEventListener("mouseenter", function (e) {
        e.target.classList.add('wall');
        findOrigin(hexes, coordinates);
    });

    element.addEventListener("mouseleave", function (e) {
        e.target.classList.remove('wall');

        let neight = document.querySelectorAll('.origin');
        neight.forEach(element => {
            element.classList.remove('origin')
        });
    });
});

gameUnits = [{
    pos: 1
}, {
    pos: 2
}, {
    pos: 3
}, {
    pos: 4
},{
    pos: 5
}]
