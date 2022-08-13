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
    const sfx = document.getElementById("sfx");
    countPlaceholder.innerText = count;

    for (let i = 0; i < bowlList.length; i++) {
        bowlList[i].children[0].addEventListener("click", function() {
            // tambah efek sound & gambar waktu user click
            sfx.play();
            count++;
            countPlaceholder.innerText = count;
            this.style.transition = "top 0s";

        })
    }

    let start = setInterval(function () {
        let rand = Math.floor(Math.random() * bowlList.length);
        let randTime = (Math.floor(Math.random() * 5) + 4) * 100;
        let cheems = bowlList[rand].children[0];
        cheems.style.transition = "top 0.1s";
        show(cheems);

        setTimeout(function () {
            hide(cheems);
        }, randTime);
    }, 1200)


    setTimeout(function() {
        clearInterval(start);
        showSaveModal();
    }, 31200)
}

async function loadLeaderboardData() {
    let data = fetch("https://sheetdb.io/api/v1/8ds12yzscpub6")
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            return data;
        })

    return data;
}

async function loadLeaderboard() {
    const leaderboard = document.getElementById("tabel-leaderboard");
    const spinner = document.getElementById("spinner");
    const leaderBoardData = await loadLeaderboardData();

    // remove spinner element after data is successfully loaded
    spinner.remove();
    
    for (let data in leaderBoardData) {
        let row = document.createElement("tr");
        row.innerHTML = "<td>" + leaderBoardData[data].name + "</td>" +
                        "<td>" + leaderBoardData[data].score + "</td>";
        leaderboard.appendChild(row);
    }
}

function saveCurrentScore(nama, skor) {
    fetch("https://sheetdb.io/api/v1/8ds12yzscpub6", {
        method: "POST",
        body: JSON.stringify({
            name: nama, 
            score: skor
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
}