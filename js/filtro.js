const titleMedicine = document.getElementById('titleMedicine');
const divCard = document.getElementById('divCard');

let query = new URLSearchParams(location.search);
let ufQuery = query.get('uf');
let cityQuery = query.get('city');
let medicineQuery = query.get('medicine');

window.addEventListener('load', async () => {
  const resultMedicine = await getMedicines(medicineQuery);

  renderMedicineCard(resultMedicine);
});

async function getMedicines(medicine) {
  const url = `https://api-medicine-brazil.herokuapp.com/medicines?name=${medicine}`;

  createLoading("divCard");
  const response = await fetch(url);
  const result = await response.json();
  if(result!==undefined){
    removeLoading();
  }
  return result;
}

function renderMedicineCard(resultMedicine) {
  if (resultMedicine.message) {
    titleMedicine.innerHTML += `${resultMedicine.message}`;
  } else {
    titleMedicine.innerHTML += `${medicineQuery} <span class="cep-local"> em </span> ${cityQuery} - ${ufQuery}`;

    const value = findValueByUfAndCity();

    console.log(resultMedicine.data);
    let stringInnerHTML = '';
    let finalValue;
    resultMedicine.data.forEach((medicine) => {
      finalValue = getFinalValue(medicine, value);
      medicine.finalValue = finalValue === 0 ? 'Restrito' : `R$ ${finalValue}`;

      stringInnerHTML = `<div class="card-body m-0 p-0">`;
      stringInnerHTML += `<h5 class="card-title px-2 pt-4">${medicine.produto}</h5>`;
      stringInnerHTML += `<div class="mb-4"><p class="ph__remedy-value-withtax card-text px-2 mb-0">${medicine.finalValue}</p><span class="ph__detail-text">(Com imposto - ${ufQuery})</span></div>`;
      stringInnerHTML += 
      '<ul class="ph__remedy-components mb-0 list-group list-group-flush">';
      stringInnerHTML += `<li class="ph__remedy-noTax list-group-item"><span>Sem imposto: </span>R$ ${(medicine.semimposto)}</li>`;
      stringInnerHTML += `<li class="ph__remedy-composition list-group-item">${(medicine.substancia).replaceAll(';', ', ')}</li>`;
      stringInnerHTML += `<li class="ph__remedy-composition list-group-item">${(medicine.dosagem).match(/(\(?.+)?(\)?(MG\/G|UI\/G|UI|MG))\)?|(\d{1,}G)/g)}</li>`;
      stringInnerHTML += `<li class="ph__remedy-laboratory list-group-item">${medicine.laboratorio}</li>`;
      stringInnerHTML += `<li class="ph__remedy-hospital list-group-item"><span>Restrito a Hospital:</span> ${medicine.hospitalar ? 'Sim' : 'Não'
      }</li>`;
      stringInnerHTML += `<li class="ph__remedy-targe list-group-item"><span>Tarja:</span> ${medicine.tarja}</li>`;
      stringInnerHTML += '</ul>';
      stringInnerHTML += '</div>'; 

      let elementA = document.createElement("a"); 
      elementA.classList.add("card", "p-0", "m-md-2");
      elementA.href="./dados.html";

      elementA.innerHTML += stringInnerHTML;

      elementA.addEventListener("click", (evt) => {
        sessionStorage.setItem("medicine", JSON.stringify(medicine));
      });

      divCard.appendChild(elementA);   
    });
  }
}

function findValueByUfAndCity() {
  let result = '';
  let cityLower = cityQuery.toLowerCase();
  switch (ufQuery) {
    case 'RJ':
      result = 'pmc20';
      break;
    case 'RO':
      if (cityLower === 'guajará-mirim') {
        result = 'pmc175alc';
      } else {
        result = 'pmc175';
      }
      break;
    case 'AM':
      if (cityLower === 'manaus' || cityLower === 'tabatinga') {
        result = 'pmc18alc';
      } else {
        result = 'pmc18';
      }
      break;
    case 'AP':
      if (cityLower === 'macapá' || cityLower === 'santana') {
        result = 'pmc18alc';
      } else {
        result = 'pmc18';
      }
      break;
    case 'BA':
    case 'CE':
    case 'MA':
    case 'MG':
    case 'PB':
    case 'PE':
    case 'PI':
    case 'PR':
    case 'RN':
    case 'RS':
    case 'SE':
    case 'SP':
    case 'TO':
      result = 'pmc18';
      break;
    case 'RR':
      if (cityLower === 'boa vista' || cityLower === 'bonfim') {
        result = 'pmc17alc';
      } else {
        result = 'pmc17';
      }
      break;
    case 'AC':
      if (
        cityLower === 'brasiléia' ||
        cityLower === 'epitaciolândia' ||
        cityLower === 'cruzeiro do sul'
      ) {
        result = 'pmc17alc';
      } else {
        result = 'pmc17';
      }
      break;
    default:
      result = 'pmc17';
  }

  return result;
}

function getFinalValue(medicine, valueUfCity) {
  let finalResult;
  if (medicine.hospitalar) {
    finalResult = 0;
  } else if (medicine.icms0) {
    finalResult = medicine.pmc0;
  } else if((ufQuery == 'MG' || ufQuery == 'SP') && medicine.tipo.toLowerCase() == 'genérico'){
    finalResult = medicine.pmc12;
  } else {
    finalResult =  medicine[valueUfCity];
  }
  return finalResult;
}
