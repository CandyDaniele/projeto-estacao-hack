const form = document.getElementById('formId');
const inputCep = document.getElementById('cepId');

form.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const cep = inputCep.value;
  const resultCep = await getCep(cep);
  
  if(!resultCep.erro){
   window.location = `filtro.html?uf=${resultCep.uf}&city=${resultCep.localidade}`;
  }else{
    alert("erro");
  }
});

async function getCep(cep) {
  const url = `https://viacep.com.br/ws/${cep}/json/`;

  const response = await fetch(url);
  const result = await response.json();
  return result;
}
