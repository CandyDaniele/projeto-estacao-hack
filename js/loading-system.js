const createLoading = (IdDivPaiDosDados) =>{

    const pai = document.getElementById(IdDivPaiDosDados);
    const loading = document.createElement("div");
    loading.className = "spinner-border text-success";
    loading.id = "loading";
    loading.role = "status";
    const message = document.createElement("span");
    const messageText = document.createTextNode("Carregando...");
    message.appendChild(messageText);
    loading.appendChild(message);
    pai.appendChild(loading);

}