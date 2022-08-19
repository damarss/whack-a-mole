function show(obj) {
  obj.classList.add("show");
}

function hide(obj) {
  obj.classList.remove("show");
}

function showSaveModal() {
  const showModalButton = document.getElementById("showModalButton");
  showModalButton.click();
}

function showSuccessToast() {
  const successToast = document.getElementById("successToast");
  const toast = new bootstrap.Toast(successToast);
  toast.show();
}

function showFailedToast() {
  const failedToast = document.getElementById("failedToast");
  const toas = new bootstrap.Toast(failedToast);
  toas.show();
}

function startGame() {
  const bowlList = document.querySelectorAll(".bowl");
  let count = 0;
  const countPlaceholder = document.getElementById("count");
  const sfx = document.getElementById("sfx");
  countPlaceholder.innerText = count;

  for (let i = 0; i < bowlList.length; i++) {
    bowlList[i].children[0].addEventListener("click", function () {
      // tambah efek sound & gambar waktu user click
      sfx.play();
      count++;
      countPlaceholder.innerText = count;
      this.style.transition = "top 0s";
    });
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
  }, 1200);

  setTimeout(function () {
    clearInterval(start);
    showSaveModal();
  }, 31200);
}

async function loadLeaderboardData(topFive = false) {
  const url =
    "https://api.steinhq.com/v1/storages/62f7153bbc148508ba872067/Sheet1";
  let data = fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // sortir data berdasarkan skor tertinggi
      data.sort(function (a, b) {
        return b.score - a.score;
      });

      // jika true, maka ambil 5 data teratas
      if (topFive) {
        data = data.slice(0, 5);
      }
      return data;
    });

  return data;
}

async function loadLeaderboard() {
  const leaderboard = document.getElementById("tabel-leaderboard");
  const spinner = document.getElementById("spinner");
  // const leaderBoardData = await loadLeaderboardData();

  // menggunakan data dummy terlebih dahulu untuk menghemat kuota request api
  let leaderBoardData = [
    { name: "User 1", score: 15 },
    { name: "User 2", score: 10 },
    { name: "User 3", score: 5 },
    { name: "User 4", score: 1 },
  ];

  // remove spinner element after data is successfully loaded
  spinner.remove();

  for (let data in leaderBoardData) {
    let row = document.createElement("tr");
    row.innerHTML =
      "<td>" +
      (parseInt(data) + 1) +
      "</td>" +
      "<td>" +
      leaderBoardData[data].name +
      "</td>" +
      "<td><div class='container align-self-center'>" +
      leaderBoardData[data].score +
      "</div></td>";
    leaderboard.appendChild(row);
  }
}

async function saveCurrentScore(nama, skor) {
  const url =
    "https://api.steinhq.com/v1/storages/62f7153bbc148508ba872067/Sheet1";
  let success = fetch(url, {
    method: "POST",
    body: JSON.stringify([
      {
        name: nama,
        score: skor,
      },
    ]),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => {
    return response.status;
  });

  return success;
}

function dontSave() {
  const form = document.querySelector("form");
  form.reset();
}

async function saveModalAction() {
  event.preventDefault();
  const form = document.querySelector("form");
  const name = document.getElementById("name").value;
  const score = parseInt(document.getElementById("count").innerText);

  let status = await saveCurrentScore(name, score);

  if (status == 200) {
    showSuccessToast();
  } else {
    showFailedToast();
    setTimeout(function () {
      showSaveModal();
    }, 500);
  }
  document.querySelector("button.btn.btn-secondary").click();
}
