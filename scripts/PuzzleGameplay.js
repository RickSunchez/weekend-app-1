function puzzleGameplay(puzzleTag, resolve) {
    const info = imageInfo(puzzleTag);
    const parts = imageParts(puzzleTag);

    const stillCanvas = document.createElement("canvas");

    stillCanvas.id = "stillCanvas";
    stillCanvas.width = canvas.width;
    stillCanvas.height = canvas.height;

    const sctx = stillCanvas.getContext("2d");

    document
        .querySelector("#scene")
        .appendChild(stillCanvas);

    canvas.classList.add("zindex999");
    stillCanvas.classList.add("zindex998");

    var scale = parseFloat(info.node.getAttribute("scale"));
    var x = (canvas.width - info.width) / 2;
    var y = (canvas.height - info.height) / 2;

    var stillAreas = [];
    var hoverAreas = [];
    var score = [];
    
    for (let i in parts) {
        score.push(false);

        let p = parts[i];
        let scaledH = parseInt(p.sHeight * scale);

        sctx.beginPath();
            sctx.strokeStyle = "#2D5400";
            sctx.lineWidth = 2;
            sctx.fillStyle = "rgba(181, 243, 109, 0.5)";
            sctx.rect(x, y, info.width, scaledH)
            sctx.stroke();
            sctx.fill();
        sctx.closePath();

        stillAreas.push([x, y, x+info.width, y+scaledH])

        let partX = getRandomInt(0, canvas.width - info.width);
        let partY = getRandomInt(0, canvas.height - info.height);

        setTimeout(()=>{
            drawImagePart(puzzleTag, i, partX, partY);
        }, 1)
        
        hoverAreas.push([partX, partY, partX+info.width, partY+scaledH])

        y += scaledH;
    }

    drawAreas()

    var cSX, cSY;
    var cDX, cDY;
    var aai; // active area index
    var onMove = false;

    canvas.addEventListener("mousedown", mousedown);
    canvas.addEventListener("mousemove", mousemove);
    canvas.addEventListener("mouseup", mouseup);

    function mousedown(ev) {
        cSX = ev.clientX - canvas.getBoundingClientRect().x;
        cSY = ev.clientY - canvas.getBoundingClientRect().y;
        
        for (let i in hoverAreas) {
            let area = hoverAreas[i];

            let onX = cSX > area[0] && cSX < area[2];
            let onY = cSY > area[1] && cSY < area[3];

            if (onX && onY) {
                score[i] = false;

                aai = i;
                cDX = area[0] - cSX;
                cDY = area[1] - cSY;

                onMove = true;
            }
        }
    }

    function mousemove(ev) {
        if (!onMove) return false;

        let mx = ev.clientX - canvas.getBoundingClientRect().x;
        let my = ev.clientY - canvas.getBoundingClientRect().y;

        let area = hoverAreas[aai];

        area[2] = mx + cDX + (area[2] - area[0])
        area[3] = my + cDY + (area[3] - area[1])
        area[0] = mx + cDX;
        area[1] = my + cDY;

        hoverAreas[aai] = area;

        drawAreas();
    }

    function mouseup(ev) {
        onMove = false;

        let r = 30;
        
        let ha = hoverAreas[aai];
        let sa = stillAreas[aai];

        let x2 = (ha[0] - sa[0]) * (ha[0] - sa[0]);
        let y2 = (ha[1] - sa[1]) * (ha[1] - sa[1]);
        let r2 = r * r;

        if (x2 + y2 < r2) {
            // deep copy
            for (let i in hoverAreas[aai])
                hoverAreas[aai][i] = stillAreas[aai][i];
            drawAreas();

            score[aai] = true;
            let trueScore = score.reduce((total, x) => {return x ? total+1 : total}, 0)

            if (trueScore == parts.length) {
                document
                    .querySelector("#scene")
                    .removeChild(stillCanvas);
                
                canvas.removeEventListener("mousedown", mousedown);
                canvas.removeEventListener("mousemove", mousemove);
                canvas.removeEventListener("mouseup", mouseup);

                canvas.classList.add("zindex999");

                resolve();
            }
        }
    }

    function drawAreas() {
        clearCanvas();

        for (let i in parts) {
            drawImagePart(puzzleTag, i, hoverAreas[i][0], hoverAreas[i][1]);
        }
    }
}

function puzzleGame(puzzleTag) {
    return new Promise(resolve => {
        puzzleGameplay(puzzleTag, resolve)
    })
}