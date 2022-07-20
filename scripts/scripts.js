function switchScene(sceneName, options=null) {
    const tmp = document.querySelector(`template[scene=${sceneName}]`);
    const scene = document.querySelector("#scene");

    if (scene.getAttribute("scene") == "test") return false;

    scene.setAttribute("scene", sceneName);

    scene.innerHTML = tmp.innerHTML;
    const components = scene.querySelectorAll("component");

    for (let oldNode of components) {
        let name = oldNode.getAttribute("name");
        let component = document.querySelector(`template[component=${name}]`);

        let buffer = document.createElement("div");
        buffer.innerHTML = component.innerHTML;

        let newNode = buffer.firstElementChild;
        
        scene.replaceChild(newNode, oldNode);

        let activate = oldNode.getAttribute("activate");
        let options = oldNode.getAttribute("options");
        
        if (activate != null) eval(`${activate}("${options}")`);
    }

    var activate = tmp.getAttribute("activate");

    if (activate != null) eval(`${activate}(${options})`);
}

function loadImage(imageObj) {
    return new Promise(resolve => {
        const dir  = "./images/";
        const image = new Image();

        image.addEventListener("load", (ev)=>{
            resolve(image)
        });

        image.src = dir + imageObj.file;
        image.setAttribute("tag", imageObj.tag);
        image.setAttribute("scale", imageObj.scale);
    })
}

function clearCanvas() {
    ctx.beginPath();
        ctx.fillStyle = "rgba(0,0,0,0)";
        ctx.clearRect(0,0,800,600);
    ctx.closePath();
}

function drawImage(tag, x, y) {
    let img = imageList.filter(elem => elem.tag==tag)[0];
    ctx.drawImage(img.node, x, y, img.width, img.height);
}

function drawImagePart(tag, partIndex, x, y) {
    let img = imageList.filter(elem => elem.tag==tag)[0];
    let parts = imagesParts.filter(elem => elem.tag==tag)[0].parts;

    let realWidth = img.node.width;
    let scale = parseFloat(img.node.getAttribute("scale"));

    ctx.drawImage(img.node, 
        0, parts[partIndex].sy, 
        realWidth, parts[partIndex].sHeight, 
        x, y, 
        realWidth * scale, parts[partIndex].sHeight * scale);
}

function imageInfo(tag) {
    return imageList.filter(elem => elem.tag==tag)[0];
}

function imageParts(tag) {
    return imagesParts.filter(elem => elem.tag==tag)[0].parts;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
  