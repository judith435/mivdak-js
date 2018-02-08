"use strict";

function pageInit() {
        
    var c = document.getElementById("drawingCanvas");
    c.addEventListener("mousedown", getPosition, false);
    initCanvas();//pain 5 recatngles

} 
    
function draw(x, y, width, height) { //context.rect(x,y,width,height);
    var c = document.getElementById("drawingCanvas");
    var ctx = c.getContext("2d");
    ctx.rect(x, y, width, height);
    ctx.stroke();
}

function initCanvas () {
    drawRandom (function () {
        var width = Math.floor(Math.random() * 300);
        var height = Math.floor(Math.random() * 300);
        draw(0, 0, width, height);
    }, 750, 5);
        
}

function drawRandom(callback, delay, repetitions) {
    var x = 0;
    var intervalID = setInterval(function () {

        callback();

        if (++x === repetitions) {
            clearInterval(intervalID);
        }
    }, delay);
}


function getPosition(event)
{
    var x = event.x;
    var y = event.y;

    var canvas = document.getElementById("drawingCanvas");

    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    document.getElementById("x").value = x;
    document.getElementById("y").value = y;
    
}

function calculateArea() {

    document.getElementById("result").innerHTML = "";
    
    var inputs= [];
    var ribA = document.getElementById("ribA").value;
    var ribB = document.getElementById("ribB").value; 
    var x = document.getElementById("x").value;
    var y = document.getElementById("y").value;
    processInput(inputs, ribA, ribB, x, y);
    
    if(inputValid(inputs)) {
        document.getElementById("result").innerHTML = 
                    "Square area: " + inputs[0].value * inputs[1].value;

        draw(x, y, ribA, ribB);    
    }

    return false;
}

function processInput (inputs, ribA, ribB, x, y) {

    var input =  new Input("ribA", ribA, "Rib A", false);
    inputs.push(input);

    var input =  new Input("ribB", ribB, "Rib B", false);
    inputs.push(input);

    var input =  new Input("x", x, "X", false);
    inputs.push(input);

    var input =  new Input("y", y, "X", false);
    inputs.push(input);

}

function Input (name, value, description, errorFound) {
    this.name = name;
    this.value = value === '' ? 0 : value;
    this.description = description;
    this.errorFound = errorFound;
}

function inputValid(inputs) {
    
    let errorsFound = false;
    var pattern = new RegExp("^[0-9]*$");

    for (let i=0; i < inputs.length; i++) {
        document.getElementById(inputs[i].name + "_error").innerHTML =  ""; //clear any previous error
        if(!pattern.test(inputs[i].value)) {
            document.getElementById(inputs[i].name + "_error").innerHTML = inputs[i].description + " is not numeric";
            errorsFound = true;
        }
    }

    if (!errorsFound) { //check dimensions don't excede canvas
        if (parseInt(inputs[0].value) + parseInt(inputs[2].value)  > 300 ||
        parseInt(inputs[1].value) + parseInt(inputs[3].value)  > 300) {
                errorsFound = true;
                alert ('dimensions given go beyond canvas size');
            }
    }    

    return !errorsFound; 
}

function clearCanvas() {
    
    var c = document.getElementById("drawingCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.stroke();
}


