const reponse = await fetch("https://dinosaurpictures.org/api/category/all");
const dino = await reponse.json();

let submit = document.querySelector(".submit");
let pictureDino = document.querySelector(".picture");
let selectDino = document.querySelector(".dinoname");
let body = document.querySelector("body");
let select = document.querySelector(".select_card");

let pictureNb = 0;

dino.reverse();
while (dino.length) {
  var nameD = dino.pop();
  var opt = new Option(nameD, nameD);
  selectDino.options[selectDino.options.length] = opt;
}

selectDino.addEventListener("change", () => {
  let url = `https://dinosaurpictures.org/api/dinosaur/${selectDino.value}/`;
  axios
    .get(url)
    .then((res) => {
      pictureDino.src = res.data.pics[pictureNb].url;
      select.style.display = "none";
      pictureDino.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        pictureNb = pictureNb < res.data.pics.length ? pictureNb + 1 : 0;
        pictureDino.src = res.data.pics[pictureNb].url;
        console.log(pictureNb);
      });
    })
    .catch((err) => {
      console.error(err);
    });
});

pictureDino.addEventListener("click", () => {
  pictureDino.src = "";
  select.style.display = "inline-block";
  pictureNb = 0;
});
