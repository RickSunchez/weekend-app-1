function IDE(titleText) {
    const parent = document.querySelector("#IDE");
    const title = parent.querySelector(".title");
    const menu = parent.querySelector(".toolbar ul.level1");
    const level1 = menu.querySelectorAll(".toolbar ul.level1 li.lvl1-li")

    title.textContent = titleText;

    for (let li of level1) {
        li.addEventListener("click", (ev)=>{
            window.addEventListener("click", removeLiActive);
            setTimeout(()=>{
                menu.classList.add("active");
                li.classList.add("active");
            }, 1)
        });
        li.addEventListener("mousemove", (ev)=>{
            if (!menu.classList.contains("active")) return false;

            const activeLi = menu.querySelector("li.active");
            activeLi.classList.remove("active");
            li.classList.add("active");
        })
    }

    function removeLiActive(ev) { 
        for (let li of menu.querySelectorAll("li")) {
            if (li == ev.target) {
                return false;
            }
        }
        if (menu.classList.contains("active")) {
            const activeLi = menu.querySelector("li.active");
            activeLi.classList.remove("active");
            menu.classList.remove("active");
            window.removeEventListener("click", removeLiActive);
        }
    }
}