window.addEventListener('load', () => {
  let query = new URLSearchParams(location.search);

  let ufQuery = query.get('uf');
  let cityQuery = query.get('city');
  let medicineQuery = query.get('medicine');
});