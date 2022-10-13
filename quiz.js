const otazky = [{
    otazka: 'V zahradě jakého zámku jsme se procházeli?',
    obrazek: 'breznice.JPG',
    odpovedi: [
        'Hluboš',
        'Březnice',
        'Úsov'
    ],
    spravna: 1
},
{
    otazka: 'U kterého zámku je vyhlídka „U svaté trojice“',
    obrazek: 'krivoklat.JPG',
    odpovedi: [
        'Sovinec',
        'Bouzov',
        'Křivoklát',
        'Ani jedna z možností'
    ],
    spravna: 2
},
{
    otazka: 'Na nádvoří kterého zámku jsme se fotili?',
    obrazek: 'nebilovy.JPG',
    odpovedi: [
        'Nebílovy',
        'Dobříš',
        'Sychrov'
    ],
    spravna: 0
}
];

const poradi = document.querySelector('#poradi');
const otazka = document.querySelector('#otazka');
const obrazek = document.querySelector('#obrazek');
const moznosti = document.querySelector('#moznosti');

let aktualniOtazka = 0;
let mojeOdpovedi = [];

zobrazOtazku();

function zobrazOtazku() {
poradi.textContent = 'Otázka ' + (aktualniOtazka + 1) + ' / ' + otazky.length;
otazka.textContent = otazky[aktualniOtazka].otazka;
obrazek.src = 'obrazky/' + otazky[aktualniOtazka].obrazek;


let odpovedi = otazky[aktualniOtazka].odpovedi;

let seznam = document.createElement('ul');
seznam.id = 'odpovedi';

for (let i = 0; i < odpovedi.length; i++) {
    let polozka = document.createElement('li');
    polozka.dataset.odpoved = i;
    polozka.textContent = odpovedi[i];
    polozka.onclick = klikNaOdpoved;
    seznam.appendChild(polozka);
}

document.querySelector('#odpovedi').remove();
moznosti.appendChild(seznam);
}


function klikNaOdpoved() {

let odpoved = event.target.dataset.odpoved;

mojeOdpovedi.push(odpoved);

aktualniOtazka = aktualniOtazka + 1;

if (aktualniOtazka === otazky.length) {
    zobrazVyhodnoceni();
} else {
    zobrazOtazku();
}

}

function zobrazVyhodnoceni() {
// skryjeme div s otazkami
document.querySelector('.kviz').style.display = 'none';
// a objevime div s vyhodnocenim
document.querySelector('.vysledek').style.display = 'block';
// najdeme si div, do ktereho budeme vypisovat text
const hodnoceni = document.querySelector('#hodnoceni');
// vypiseme pole - to je jen prechodne, takhle to delat nebudeme
console.log(mojeOdpovedi);

let pocetSpravnych = 0;

for (let i = 0; i < otazky.length; i++) {
    let nadpis = document.createElement('h3');
    nadpis.textContent = (i + 1) + '. ' + otazky[i].otazka;
    hodnoceni.appendChild(nadpis);

    let moje = document.createElement('p');
    moje.textContent = 'Your answer: ' + otazky[i].odpovedi[mojeOdpovedi[i]];
    hodnoceni.appendChild(moje);

    let mujobrazek = document.createElement('img');
    mujobrazek.src = 'obrazky/' + otazky[i].obrazek;
    hodnoceni.appendChild(mujobrazek);
    

    let spravne = document.createElement('p');
    if (parseInt(mojeOdpovedi[i]) === otazky[i].spravna) {
        pocetSpravnych++;
        spravne.textContent = 'That is correct.';
    } else {
        spravne.textContent = 'Correct answer: ' + otazky[i].odpovedi[otazky[i].spravna];
    }
    hodnoceni.appendChild(spravne);
}

let procenta = document.createElement('h2');
procenta.textContent += 'Correct ' + pocetSpravnych + ' from ' + otazky.length + ' answer. Success rate ' + Math.round(pocetSpravnych / otazky.length * 100) + ' %.';
hodnoceni.appendChild(procenta);
}