let colorsID = 1;
let number = 1;
let cellCount = 0;
let isCPressed = false;
let penColor = 'black';
let manyColorsDiv = document.getElementById('colors')
let colorsCount = 0;
let selectedColorID = penColor;
let lastSelectedColorID;
lastSelectedColorID = selectedColorID;
let savedData = [];
let startCellCountOfWidth;
let startCellCountOfHeight;
let isMousePressed = false;
start();

function start() {

    let widthOfCell = localStorage.getItem('width');
    let heightOfCell = localStorage.getItem('height');
    if (widthOfCell != null) {
        startCellCountOfWidth = parseInt(widthOfCell);
        // cellCount = startCellCountOfWidth;
    }
    if (heightOfCell != null) {
        startCellCountOfHeight = parseInt(heightOfCell);
        // cellCount = startCellCountOfHeight;
    } else {
        startCellCountOfHeight = 5;
        startCellCountOfWidth = 5;
    }
    document.getElementById("width").value = startCellCountOfWidth;
    document.getElementById("height").value = startCellCountOfHeight;




    let newHexColors = localStorage.getItem("newHexColor");
    if (newHexColors != null) {
        newHexColors = JSON.parse(newHexColors);
        console.log(newHexColors);
        for (let i = 0; i < newHexColors.length; i++) {
            const element = newHexColors[i];
            ColorCreator(element);

        }
    }


    let localStorageIsEmpty = localStorage.getItem('saveData');
    if (localStorageIsEmpty != null) {
        // console.log(localStorageIsEmpty)
        savedData = JSON.parse(localStorageIsEmpty)
    }
    //stexum enq cell-ery
    const pixelsDivEl = document.getElementById('pixels')
    for (let i = 0; i < startCellCountOfHeight; i++) {
        let rowEl = document.createElement('div');
        pixelsDivEl.appendChild(rowEl);
        rowEl.classList.add('raw');
        for (let j = 0; j < startCellCountOfWidth; j++) {
            let cellEl = document.createElement('div');
            rowEl.appendChild(cellEl);
            cellEl.classList.add('cell')
            cellEl.id = "cell" + number;
            number++;
            cellEl.addEventListener('click', onCellClick);
            cellEl.addEventListener("mousemove", onCellMouseEnter);
        }
    }



    //Hetevi guyn Skzbnakan spitak
    let isLocalStorageEmpty = localStorage.getItem("cellBackGroundColor");
    if (isLocalStorageEmpty != null) {
        document.getElementById("pixels").style.backgroundColor = isLocalStorageEmpty;
        let backGroundColor = document.getElementById("backColor");
        backGroundColor.value = isLocalStorageEmpty;
    }


    // nerkel cell-ery save aracic
    for (let x = 0; x < savedData.length; x++) {
        const element = savedData[x];
        let cellElementID = document.getElementById(element[0]);
        if (cellElementID) {
            cellElementID.style.backgroundColor = element[1];
        }
    }

}


window.addEventListener("keypress", function (event) {
    if (event.key == "s") { //save data

        clickForSave();
    }
    if (event.key == "c") {
        console.log("you press c")
        if (isCPressed) {
            let retin = document.getElementById('transparent');
            isCPressed = false
            retin.style.border = "solid 1px";

            document.getElementById(lastSelectedColorID).style.border = "solid 3px #149FF2"
            selectedColorID = lastSelectedColorID;


        } else {
            selectRetin();

        }
    }
}
)

function onCellClick(event) {
    if (isCPressed) {
        event.target.style.backgroundColor = ''
    } else {
        event.target.style.backgroundColor = penColor;
    }

}
function onCellMouseEnter(event) {
    if (isMousePressed == true) {
        onCellClick(event);
        console.log(event.target.id);

    }
}

function selectColor(colorsEl) {
    isCPressed = false;
    document.getElementById(selectedColorID).style.border = "solid 1px"
    penColor = colorsEl.id;
    colorsEl.style.border = "solid 3px #149FF2"
    selectedColorID = colorsEl.id;
    lastSelectedColorID = selectedColorID;
}
function selectRetin() {
    let retin = document.getElementById('transparent');

    document.getElementById(selectedColorID).style.border = "solid 1px"

    penColor = lastSelectedColorID;

    retin.style.border = "solid 3px #149FF2"
    isCPressed = true;
    selectedColorID = 'transparent';
}

function buttonWhatMakeColor() {
    let newColorInputEl = document.getElementById('colorHex');
    let hexColor = newColorInputEl.value;

    ColorCreator(hexColor);
    newColorsSaver();

}
function newCellCount() {
    let cellCount1 = document.getElementById('width');
    let widthForCell = cellCount1.value;
    let cellCount2 = document.getElementById('height');
    let heightForCell = cellCount2.value;
    //console.log(heightForCell, widthForCell)
    if (widthForCell != null && heightForCell != null) {

        localStorage.setItem('width', widthForCell);
        localStorage.setItem('height', heightForCell);

        // stexcum enq nor Cellery
        const pixelsDivEl = document.getElementById('pixels')
        pixelsDivEl.innerHTML = ''
        number = 1;
        for (let i = 0; i < heightForCell; i++) {
            let rowEl = document.createElement('div');
            pixelsDivEl.appendChild(rowEl);
            rowEl.classList.add('raw');
            for (let j = 0; j < widthForCell; j++) {
                let cellEl = document.createElement('div');
                rowEl.appendChild(cellEl);
                cellEl.classList.add('cell')
                cellEl.id = "cell" + number;
                number++;
                cellEl.addEventListener('click', onCellClick)
            }
        }
    }
    localStorage.removeItem("saveData");
}
function ColorCreator(color) {
    // let newColorInputEl = document.getElementById('colorHex');
    let hexColor = color;   //newColorInputEl.value;
    if (hexColor == '') {

        return console.error("Empty");
    }
    if (hexColor != null) {
        let colorsInputDiv = document.createElement('div');
        colorsInputDiv.id = hexColor;
        colorsInputDiv.classList.add('colorsDiv')
        colorsInputDiv.style.backgroundColor = hexColor;
        colorsInputDiv.addEventListener('click', function () {
            selectColor(colorsInputDiv)
        })




        if (colorsCount == 0) {
            let row = document.createElement('div');
            row.classList.add('colorsRow');
            let divLocation = document.getElementById('last');
            divLocation.appendChild(row);
            row.appendChild(colorsInputDiv);


        } else {
            let colorRowElements = document.getElementsByClassName('colorsRow');
            let lastColorRow = colorRowElements[colorRowElements.length - 1];
            lastColorRow.appendChild(colorsInputDiv);


            if (colorsCount == 3) {
                colorsCount = -1
            }
        }

        colorsCount++;

    }

}
function newColorsSaver() {
    //nor HEX guyner
    let newColor = document.getElementById('colorHex');
    newColor = newColor.value;

    let newHexColor = localStorage.getItem("newHexColor");
    if (newHexColor != null) {
        newHexColor = JSON.parse(newHexColor);
        newHexColor.push(newColor);


    } else {
        newHexColor = [newColor]


    }
    localStorage.setItem("newHexColor", JSON.stringify(newHexColor));
}
function backGroundColor() {
    //Hetevi guyn Skzbnakan spitak
    let backgroundColor = document.getElementById("backColor");
    backgroundColor = backgroundColor.value;
    let localBack = document.getElementById("pixels").style.backgroundColor = backgroundColor;
    localStorage.setItem("cellBackGroundColor", localBack);
    return localBack;

}

window.addEventListener("mousedown", (event) => {
    // console.log("mouseDown");

    if (isMousePressed == false) {
        isMousePressed = true;

    }

})
window.addEventListener("mouseup", (event) => {
    if (isMousePressed == true) {
        isMousePressed = false;
    }
})
// setInterval(() => {
//     console.log(isMousePressed);
// }, 200)


function canvasPainter() {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d")
    const pixelMultiplier = 20;


    canvas.style.height = startCellCountOfHeight * 10 + "px";
    canvas.style.width = startCellCountOfWidth * 10 + "px";

    canvas.width = startCellCountOfWidth * pixelMultiplier;
    canvas.height = startCellCountOfHeight * pixelMultiplier;
    context.scale(pixelMultiplier, pixelMultiplier);

    // context.fillStyle = "green";
    // context.fillRect(0, 0, 1, 1);
    // context.fillRect(2, 0, 1, 1);
    // context.fillRect(4, 0, 1, 1);

    // context.fillStyle = "black";
    // context.fillRect(1, 2, 1, 1);

    let allCellInfo = [];
    let allCellsColors = document.getElementsByClassName('cell');
    for (let k = 0; k < allCellsColors.length; k++) {
        const element = allCellsColors[k];
        let colorsCellBackGroundColor = element.style.backgroundColor;
        let colorsCellID = element.id;

        if (colorsCellBackGroundColor != '') {
            let cellInfo = [colorsCellID, colorsCellBackGroundColor];
            // let cellInfo = [];
            // cellInfo.push(colorsCellID);
            // cellInfo.push(colorsCellBackGroundColor);
            allCellInfo.push(cellInfo)
        }

    }
    let backGroundColorInComingLeftSide = backGroundColor();

    context.fillStyle = backGroundColorInComingLeftSide;
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (let j = 0; j < allCellInfo.length; j++) {
        const element = allCellInfo[j];
        context.fillStyle = element[1]
        if (element[0] != null) {
            let elementID = element[0].split("cell")
            elementID = parseInt(elementID[1])
            //Nerkuma Canvasi mej 0,0
            let workOfFunctionCoordinate = coordinate(startCellCountOfWidth, startCellCountOfHeight, elementID)
            context.fillRect(workOfFunctionCoordinate[0], workOfFunctionCoordinate[1], 1, 1)



        }

    }


}


function coordinate(x, y, id) {
    let count = 1;
    while (x < id) {
        count++;

        id = id - x;

    }


    return [id - 1, count - 1];
}

function canvasDownload() {
    canvasPainter();
    const canvas = document.getElementById("canvas");
    const src = canvas.toDataURL("image/png");
    // const pngDataUrl = canvas.toDataURl("image/png");
    // console.log(src);

    const link = document.createElement('a');
    link.download = "canvas.png"
    link.href = src
    link.click();
};
function clickForSave() {
    let allCellInfo = [];
    let allCellsColors = document.getElementsByClassName('cell');
    for (let k = 0; k < allCellsColors.length; k++) {
        const element = allCellsColors[k];
        let colorsCellBackGroundColor = element.style.backgroundColor;
        let colorsCellID = element.id;

        if (colorsCellBackGroundColor != '') {
            let cellInfo = [colorsCellID, colorsCellBackGroundColor];
            // let cellInfo = [];
            // cellInfo.push(colorsCellID);
            // cellInfo.push(colorsCellBackGroundColor);
            allCellInfo.push(cellInfo)
        }

    }

    this.alert("Your Picture Saved!")

    // Nerkery save linum
    let browserSaveInfo = (JSON.stringify(allCellInfo));
    localStorage.setItem('saveData', browserSaveInfo);
}
