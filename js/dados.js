let commercialName = document.getElementById('nome');
let remedyName = document.querySelector('.remedy-name')
let tarja = document.getElementById('tarja');
let maxValue = document.getElementById('maxValue');
let principioAtivo = document.getElementById('principioAtivo');
let valueWithoutTax = document.getElementById('valueWithoutTax');
let lab = document.getElementById('lab');
let hospital = document.getElementById('hospital');

window.addEventListener("load", () => {
  let medicine = JSON.parse(sessionStorage.getItem("medicine"));

  remedyName.innerText = medicine.produto;
  commercialName.innerText = medicine.produto;
  tarja.innerText = medicine.tarja;
  maxValue.innerText = medicine.finalValue;
  principioAtivo.innerText = medicine.substancia;
  valueWithoutTax.innerText = 'R$ ' + medicine.semimposto;
  lab.innerText = medicine.laboratorio;
  hospital.innerText = medicine.hospitalar? 'Sim' : 'Não';
});