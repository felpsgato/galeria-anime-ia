const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("img01");
const captionText = document.getElementById("caption");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

// 🖼️ ATUALIZAÇÃO: Alterado de ".gallery-item" para ".gallery img" para corresponder ao HTML
const galleryItems = document.querySelectorAll(".gallery img"); 

let currentImageIndex = 0;
let imageList = [];

// Inicialização da galeria
function initializeGallery() {
    galleryItems.forEach((img, index) => {
        // As informações da imagem são extraídas aqui
        imageList.push({ src: img.src, alt: img.alt });

        // O evento de clique é adicionado a cada imagem
        img.addEventListener("click", () => {
            currentImageIndex = index;
            // Usamos a função original openModal, mas passamos a imagem clicada
            openModal(imageList[currentImageIndex].src, imageList[currentImageIndex].alt);
        });
    });
}

function openModal(imageSrc, altText = "") {
    // A função openModal no seu HTML original usa "this", mas no JS você usa a lista
    // Isso garante que mesmo o HTML chamando `openModal(this)` ainda funcione se você alterar a chamada no HTML para a lista.
    modal.style.display = "flex";
    modal.classList.add("show");
    modalImg.src = imageSrc;
    captionText.innerHTML = altText;
    document.body.style.overflow = "hidden";
}

function closeModal() {
    modal.classList.remove("show");
    // Um pequeno delay garante que a transição CSS termine antes de ocultar o modal
    setTimeout(() => {
        modal.style.display = "none";
        modalImg.src = "";
        captionText.innerHTML = "";
        document.body.style.overflow = "";
    }, 200);
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % imageList.length;
    openModal(imageList[currentImageIndex].src, imageList[currentImageIndex].alt);
}

function showPrevImage() {
    // O (+ imageList.length) garante que o índice não seja negativo ao ir para o final da lista
    currentImageIndex = (currentImageIndex - 1 + imageList.length) % imageList.length;
    openModal(imageList[currentImageIndex].src, imageList[currentImageIndex].alt);
}

// 🎧 Event Listeners 
closeBtn.addEventListener("click", closeModal);
prevBtn.addEventListener("click", showPrevImage);
nextBtn.addEventListener("click", showNextImage);

// Fecha clicando fora do modal
window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});

// Teclado: ESC, ← → para navegação
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
    // Só navega se o modal estiver aberto
    if (!modal.classList.contains("show")) return; 

    if (e.key === "ArrowRight") showNextImage();
    if (e.key === "ArrowLeft") showPrevImage();
});

// 🚀 Inicia a galeria ao carregar o script
initializeGallery();