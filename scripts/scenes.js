// START
function start() {
    document
        .querySelector("*[action=start]")
        .addEventListener("mouseup", (e) => {
            switchScene("dialog", 0);
        })
}

function runDialog(num) {
    switch (num) {
        case 0:
            dialog(
                ["Inver", 0, "Прежде чем начать, немного про управление. Чтобы перейти к следующему диалогу, нажми пробел, либо просто кликни 😉"],
                ["Nikita", 0, "Хей, всем привет"],
                ["Nikita", 0, "Тут собирается крупный хакатончик, можем побороться за главный приз!"],
                ["Inver", 0, "Салам! Я в армии 😄"],
                ["Inver", 0, "Но, могу поучаствовать онлайн!"],
                ["Artem", 0, "Всем привет! Сейчас мы обсудим..."],
                ["Artem", 0, "*что-то про много работы*"],
                ["Arina", 0, "*что-то про кучу дел*"],
                ["Artem", 1, "*звуки бурного обсуждения*"],
                ["Arina", 1, "*звуки активного протеста*"],
                ["Artem", 2, "*сказал свое мужицкое слово*"],
                ["Arina", 2, "Мы согласны..."],
            ).then((zeroPoint)=>{
                zeroPoint();
                switchScene("hack-1");
            })
            break;
        case 1:
            dialog(
                ["Artem", 0, "Отлично получилось!"],
                ["Arina", 2, "..."],
                ["Arina", 2, "........."],
                ["Arina", 2, "Нуууу..."],
                ["Arina", 2, "Пока далеко от идеала..."],
                ["Arina", 1, "Я сейчас все переделаю!"],
                ["Artem", 1, "..."],
            ).then((zeroPoint)=>{
                zeroPoint();
                switchScene("hack-2");
            })
            break;
        case 2:
            console.log("Firefox чудак и не дает доступ к буферу обмена");
            console.log("<surprise_name>");
            dialog(
                ["Artem", 0, "Да, так действительно лучше))"],
                ["Arina", 1, "Спасибо"],
                ["Artem", 0, "*Чмок*"],
                ["Arina", 1, "*Чмок*"],
                ["Nikita", 0, "На самом деле это все))"],
                ["Nikita", 0, "Спасибо что дощли до конца😅"],
                ["Nikita", 0, "Есть небольшой сюрприз напоследок"],
                ["Nikita", 0, "<surprise_name>"],
                ["Inver", 0, "Ну и чтобы заново это все не проходить"],
                ["Inver", 0, "Нажми на стартовом экране Ctrl+Shift+E😉"],
            ).then(()=>{
                
            })
            break;
        case 3:
            console.log("Firefox чудак и не дает доступ к буферу обмена");
            console.log("<surprise_name>");
            dialog(
                ["Nikita", 0, "<surprise_name>"],
            )
            break;
    }
}

function hack1() {
    dialog(
        ["Inver", 0, "..."],
        ["Nikita", 0, "..."],
        ["Nikita", 0, "Так, общая идея понятна"],
        ["Nikita", 0, "Пора приступать!"],
        ["Nikita", 0, "Артемка, пили фронт, на мне бэк, ближе к вечеру разберемся"],
        ["Artem", 2, "Okay"],
        ["Inver", 0, "Тут все просто. Просто тыкай кнопки 😄"],
    ).then((zeroPoint)=>{
        zeroPoint();
        IDEgame(hack1Code)
            .then(()=>{
                switchScene("dialog", 1);
            });
    })
}

function hack2() {
    dialog(
        ["Inver", 0, "Принцип как в пазлах"],
        ["Inver", 0, "Ставь элементы на место и можно двигаться дальше!"],
    )
    .then((zeroPoint)=>{
        zeroPoint();
        puzzleGame("puzzle1")
        .then(()=>{
            dialog(["Arina", 1, "Слишком просто!"])
            .then((zeroPoint)=>{
                zeroPoint();
                puzzleGame("puzzle2")
                .then(()=>{
                    puzzleGame("puzzle3")
                    .then(()=>{
                        switchScene("dialog", 2);
                    })
                })
            })
        })
    })
}

// cheat
window.addEventListener("keydown", (ev)=>{
    if ((ev.ctrlKey || ev.metaKey) && ev.shiftKey && ev.code == "KeyE") {
        switchScene("dialog", 3);
    }
})