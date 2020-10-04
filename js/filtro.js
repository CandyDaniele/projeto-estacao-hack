const titleMedicine = document.getElementById("titleMedicine");
const divCard = document.getElementById("divCard");

let query = new URLSearchParams(location.search);
let ufQuery = query.get('uf');
let cityQuery = query.get('city');
let medicineQuery = query.get('medicine');

window.addEventListener('load', async() => {
  const resultMedicine = await getMedicines(medicineQuery);

  renderMedicineCard(resultMedicine);
});

async function getMedicines(medicine){
  const url = `https://api-medicine-brazil.herokuapp.com/medicines?name=${medicine}`;

  const response = await fetch(url);
  const result = await response.json();
  return result;
}

function renderMedicineCard(resultMedicine) {
  if(resultMedicine.message){
    titleMedicine.innerHTML += resultMedicine.message;
  }else{
    titleMedicine.innerHTML += medicineQuery;
    let stringInnerHTML = '';
    resultMedicine.data.forEach(medicine => {
      stringInnerHTML = '<a href="./dados.html" class="card">';
      stringInnerHTML +=  '<div class="card-body">';
      stringInnerHTML +=  `<h5 class="card-title">${medicine.produto}</h5>`;
      stringInnerHTML +=  `<p class="ph__remedy-value-notax card-text">R$ ${medicine.pmc12}</p>`;
      stringInnerHTML +=  '<ul class="ph__remedy-components mb-0">';
      stringInnerHTML +=  `<li class="ph__remedy-composition">${medicine.substancia}</li>`;
      stringInnerHTML +=  `<li class="ph__remedy-laboratory">${medicine.laboratorio}</li>`;
      stringInnerHTML +=  `<li class="ph__remedy-hospital">Restrito a Hospital: ${medicine.hospitalar?"Sim":"Não"}</li>`;
      stringInnerHTML +=  `<li class="ph__remedy-targe">Tarja: ${medicine.tarja}</li>`;
      stringInnerHTML +=  '</ul>';
      stringInnerHTML +=  '</div>';
      stringInnerHTML +=  '</a>';
      divCard.innerHTML += stringInnerHTML;
    });
  }
}