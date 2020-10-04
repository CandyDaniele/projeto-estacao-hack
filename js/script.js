const form = document.getElementById('formId');
const header = document.querySelector('header')
const inputCep = document.getElementById('cepId');
const inputMedicine = document.getElementById('medicineId');

form.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const cep = inputCep.value;
  const medicine = inputMedicine.value;

  const resultCep = await getCep(cep);

  if(!resultCep.erro){
  window.location = `filtro.html?uf=${resultCep.uf}&city=${resultCep.localidade}&medicine=${medicine}`;
  }else{
    header.innerHTML += `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>Ops!</strong> Coloque um CEP válido.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    `
  }
});

async function getCep(cep) {
  const url = `https://viacep.com.br/ws/${cep}/json/`;

  const response = await fetch(url);
  const result = await response.json();
  return result;
}
