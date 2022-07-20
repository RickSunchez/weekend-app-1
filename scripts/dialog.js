function sayPromise(text, person, emotionIndex, resolve) {
    const emotion = {
        Arina: ["arinaCommon", "arinaPlayful", "arinaStrong"],
        Artem: ["artemCommon", "artemOwl", "artemPokerface"],
        Inver: ["master"],
        Nikita: ["problem"]
    }[person][emotionIndex];

    const coords = {
        Arina: [650, 460],
        Artem: [10, 460],
        Inver: [680, 6],
        Nikita: [10, 10]
    }[person];

    const dialogPosition = {
        Arina: "bottom",
        Artem: "bottom",
        Inver: "top",
        Nikita: "top",
    } [person];

    const textField = document.querySelector("#dialog");
    textField.className = dialogPosition;

    var timer;
    var i = 0;
    textField.textContent = "";

    clearCanvas();
    drawImage(emotion, ...coords);

    function textTyping(speed) {
        timer = setInterval(()=>{
            textField.textContent += text[i]
            i++;
    
            if (i >= text.length) {
                window.removeEventListener("click", skip);
                window.addEventListener("click", forward);

                window.removeEventListener("keyup", skip);
                window.addEventListener("keyup", forward);

                clearInterval(timer)
            };
    
            while (i < text.length && text[i] == " ") {
                textField.textContent += text[i];
                i++;
            } 
        }, speed)
    }

    function skip(ev) {
        if (ev.type == "keyup" && ev.code != "Space") 
            return false;

        clearInterval(timer);
        textTyping(10);
    }

    function forward(ev) {
        if (ev.type == "keyup" && ev.code != "Space") 
            return false;

        window.removeEventListener("click", forward);
        window.removeEventListener("keyup", forward);
        
        resolve(true);
    }

    textTyping(100);

    window.addEventListener("click", skip)
    window.addEventListener("keyup", skip);
}

function say(text, person, emotionIndex=0) {
    return new Promise(resolve => {
        sayPromise(text, person, emotionIndex, resolve)
    })
}

function dialog(...args) {
    var dialogNode = document.querySelector("#dialog");
    var onRemove = false;

    if (dialogNode == null) {
        dialogNode = document.createElement("div");
        dialogNode.id = "dialog";

        document.querySelector("#scene").appendChild(dialogNode)
        onRemove = true;
    }

    canvas.classList.add("zindex999");
    dialogNode.classList.add("zindex998");

    return args.reduce((current, next) => {
            return current.then(()=>{
                    return say(next[2], next[0], next[1])
                }
            )
        }, Promise.resolve())
            .then(()=>{
                // canvas.classList.remove("zindex999");
                // dialogNode.classList.remove("zindex998");
                // if (onRemove)
                //     document
                //         .querySelector("#scene")
                //         .removeChild(dialogNode);
                return zeroPoint;
            })

    function zeroPoint() {
        clearCanvas();
        canvas.classList.remove("zindex999");
        dialogNode.classList.remove("zindex998");
        if (onRemove)
            document
                .querySelector("#scene")
                .removeChild(dialogNode);
    }
}