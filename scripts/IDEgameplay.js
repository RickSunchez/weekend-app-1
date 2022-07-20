var row = 0, char = 0, activeP;

function IDEgame(text, n=100) {
    return new Promise(resolve => {
        IDEgameplay(text, n, resolve)
    })
}

function IDEgameplay(text, n=100, resolve) {
    const editor = document.querySelector("#IDE .editor");

    text = safeTagsReplace(text.trim());
    var lines = text.split("\n");

    activeP = document.createElement("p");
    editor.appendChild(activeP)

    editor.addEventListener("keydown", keyCapture);

    function keyCapture(ev) {
        ev.preventDefault();

        if (row+1 >= lines.length) {
            editor.removeEventListener("keydown", keyCapture);
            editor.addEventListener("keydown", (ev)=>{
                ev.preventDefault();
            })
            resolve();
            return false;
        }

        if (char >= lines[row].length) {
            row++;
            char = 0;
            activeP = document.createElement("p");
            editor.appendChild(activeP)

            if (lines[row] == "") {
                return false;
            }
        };

        let sub = "";
        if (char + n > lines[row].length) {
            sub = lines[row].substring(char)
        } else {
            sub = lines[row].substring(char, char + n)
        }

        activeP.textContent += sub;
        editor.scrollTop = editor.scrollHeight;

        char += n;
    }
}

// https://stackoverflow.com/questions/5499078/fastest-method-to-escape-html-tags-as-html-entities
var tagsToReplace = {
    "&": "\&",
    "?": "\?",
    "<": "\<",
    ">": "\>",
    "/": "\/",
};

function safeTagsReplace(str) {
    return str.replace(/[&<>]/g, (tag)=>{
        return tagsToReplace[tag] || tag
    });
}