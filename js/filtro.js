window.addEventListener('load', async() => {
  let query = new URLSearchParams(location.search);

  let ufQuery = query.get('uf');
  let cityQuery = query.get('city');
  let medicineQuery = query.get('medicine');

  const resultMedicine = await getMedicines(medicineQuery);

  resultMedicine.data.forEach(medicine => {
    console.log(medicine);
  });


});

async function getMedicines(medicine){
  const url = `https://api-medicine-brazil.herokuapp.com/medicines?name=${medicine}`;

  const response = await fetch(url);
  const result = await response.json();
  return result;
}