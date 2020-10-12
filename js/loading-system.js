const createLoading = (IdDivPaiDosDados) =>{

    const pai = document.getElementById(IdDivPaiDosDados);
    const loading = document.createElement("div");
    loading.id = "loading";
    loading.style = "height:200px; width:200px; margin: 0 auto;"
    const image = document.createElement("img");
    image.src = "./images/loading-image.gif"
    image.style = "width: 100%; margin: 0 auto;"
    loading.appendChild(image);
    pai.appendChild(loading);

}

const removeLoading = () =>{
    const loading = document.getElementById("loading");
    loading.remove();
}