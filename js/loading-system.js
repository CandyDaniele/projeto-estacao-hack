const createLoading = (IdDivPaiDosDados) =>{

    const pai = document.getElementById(IdDivPaiDosDados);
    const loading = document.createElement("div");
    loading.className = "spinner-border";
    loading.id = "loading";
    loading.role = "status";
    loading.style = "color: #0b7375; height:200px; width:200px; margin: 0 auto;"
    const message = document.createElement("span");
    message.className = "sr-only";
    const messageText = document.createTextNode("Loading...");
    const image = document.createElement("img");
    image.src = "./images/loading-image.gif"
    message.appendChild(messageText);
    //loading.appendChild(message);
    image.style = "width: 100%; margin: 0 auto;"
    loading.appendChild(image);
    pai.appendChild(loading);

}

const removeLoading = () =>{
    const loading = document.getElementById("loading");
    loading.remove();
}