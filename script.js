risultato = [];

const imgs = document.querySelectorAll(".comando");
for (const img of imgs) {
  img.addEventListener("click", checkbox);
}

function checkbox(event) {
  const oggetto = event.currentTarget;

  const ck = oggetto.querySelector(".checkbox");
  ck.src = "./images/checked.png";
  oggetto.classList.add("background");

  const cover = oggetto.querySelector(".cover");
  if (cover.classList.contains("hidden") === false) {
    cover.classList.add("hidden");
  }

  for (let image of imgs) {
    if (image.dataset.questionId === event.currentTarget.dataset.questionId) {
      if (image !== event.currentTarget) {
        let cover = image.querySelector(".cover");
        cover.classList.remove("hidden");

        let img = image.querySelector(".checkbox");
        img.src = "./images/unchecked.png";

        image.classList.remove("background");
      }
    }
  }
  getRisultati(event.currentTarget.dataset);
}

function getRisultati(risultati) {
  if (risultati.questionId === "one") {
    risultato[0] = risultati.choiceId;
  } else if (risultati.questionId === "two") {
    risultato[1] = risultati.choiceId;
  } else if (risultati.questionId === "three") {
    risultato[2] = risultati.choiceId;
  }

  if (Object.keys(risultato).length === 3) {
    for (const img of imgs) {
      img.removeEventListener("click", checkbox);
    }
    console.log(risultato);

    calcolaTesto();
  }
}

function calcolaTesto() {
  const titolo = document.getElementById("titolo");
  const testo = document.getElementById("testo");

  console.log("ciao");

  if (risultato[0] !== risultato[1] && risultato[1] === risultato[2]) {
    titolo.textContent = RESULTS_MAP[risultato[1]].title;
    testo.textContent = RESULTS_MAP[risultato[1]].contents;
  } else {
    titolo.textContent = RESULTS_MAP[risultato[0]].title;
    testo.textContent = RESULTS_MAP[risultato[0]].contents;
  }

  const bottone = document.querySelector("#reset");
  bottone.addEventListener("click", gestioneBottone);

  const fine = document.querySelector("#fine");
  fine.classList.remove("hidden");
}

function gestioneBottone(event) {
  risultato = [];
  for (let image of imgs) {
    const cover = image.querySelector(".cover");
    cover.classList.add("hidden");

    const img = image.querySelector(".checkbox");
    img.src = "./images/unchecked.png";

    image.classList.remove("background");

    const fine = document.querySelector("#fine");
    fine.classList.add("hidden");

    image.addEventListener("click", checkbox);

    const b = event.currentTarget;
    b.removeEventListener("click", gestioneBottone);
  }
}
