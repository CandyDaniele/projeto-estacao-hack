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
      stringInnerHTML = '<a href="./dados.html" class="card p-0 m-md-2">';
      stringInnerHTML +=  '<div class="card-body m-0 p-0">';
      stringInnerHTML +=  `<h5 class="card-title px-2 pt-4">${medicine.produto}</h5>`;
      stringInnerHTML +=  `<p class="ph__remedy-value-notax card-text px-2">R$ ${medicine.pmc12}</p>`;
      stringInnerHTML +=  '<ul class="ph__remedy-components mb-0 list-group list-group-flush">';
      stringInnerHTML +=  `<li class="ph__remedy-composition list-group-item">${medicine.substancia}</li>`;
      stringInnerHTML +=  `<li class="ph__remedy-laboratory list-group-item">${medicine.laboratorio}</li>`;
      stringInnerHTML +=  `<li class="ph__remedy-hospital list-group-item"><span>Restrito a Hospital:</span> ${medicine.hospitalar?"Sim":"Não"}</li>`;
      stringInnerHTML +=  `<li class="ph__remedy-targe list-group-item"><span>Tarja:</span> ${medicine.tarja}</li>`;
      stringInnerHTML +=  '</ul>';
      stringInnerHTML +=  '</div>';
      stringInnerHTML +=  '</a>';
      divCard.innerHTML += stringInnerHTML;
    });
  }
}