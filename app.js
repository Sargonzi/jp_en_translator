let langJP = document.getElementById('fromText');
let langEN = document.getElementById('toText');
let empty = "";

document.getElementById('reset').addEventListener('click', () => {
    console.log("Reset button is clicked");
    langJP.value = empty;
    langEN.value = empty;
});
