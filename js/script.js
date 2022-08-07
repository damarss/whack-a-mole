function show(obj) {
    obj.classList.add("show");
}

function hide(obj) {
    obj.classList.remove("show");
}

function startGame() {

    const bowlList = document.querySelectorAll(".bowl");
    let count = 0;
    const countPlaceholder = document.getElementById("count");
    countPlaceholder.innerText = count;

    for (let i = 0; i < bowlList.length; i++) {
        bowlList[i].children[0].addEventListener("click", function() {
            count++;
            countPlaceholder.innerText = count;
            this.style.transition = "top 0s";
        })
    }

    let start = setInterval(function () {
        let rand = Math.floor(Math.random() * bowlList.length);
        let randTime = (Math.floor(Math.random() * 6) + 5) * 100;
        let cheems = bowlList[rand].children[0];
        cheems.style.transition = "top 0.1s";
        show(cheems);

        setTimeout(function () {
            hide(cheems);
        }, randTime);
    }, 1500)


    setTimeout(function() {
        clearInterval(start);
        alert("You have " + count + " cheems");
    }, 22000)
}