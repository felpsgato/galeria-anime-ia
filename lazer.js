// Seleciona elementos principais
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("img01");
const captionText = document.getElementById("caption");
const closeBtn = document.querySelector(".close");

// A lista de imagens da galeria será populada dinamicamente
let galleryImages = [];
let currentImageIndex = 0;

// Função para atualizar a lista de imagens (chamada após o carregamento do DOM)
function updateGalleryImages() {
    galleryImages = Array.from(document.querySelectorAll(".gallery img"));
    // Adiciona o evento de clique a todas as imagens da galeria
    galleryImages.forEach(img => {
        img.onclick = function() {
            openModal(this);
        };
    });
}

// Função para abrir o modal
function openModal(element) {
  if (!modal || !modalImg || !element) return;

  // Garante que a lista de imagens está atualizada
  updateGalleryImages();

  // Encontra o índice da imagem clicada
  currentImageIndex = galleryImages.indexOf(element);

  // Exibe a imagem no modal
  showSlides(currentImageIndex);

  modal.style.display = "flex";
  // Adiciona a classe 'show' para a animação CSS
  setTimeout(() => {
      modal.classList.add("show");
  }, 10); 
  document.body.style.overflow = "hidden";
}

// Função para fechar o modal
function closeModal() {
  if (!modal) return;
  modal.classList.remove("show");
  setTimeout(() => {
    modal.style.display = "none";
    modalImg.src = "";
    captionText.innerHTML = "";
    document.body.style.overflow = "";
  }, 300); // Tempo da animação CSS
}

// Função para mostrar a imagem atual
function showSlides(n) {
    if (galleryImages.length === 0) return;

    if (n >= galleryImages.length) {
        currentImageIndex = 0; // Volta para a primeira imagem
    } else if (n < 0) {
        currentImageIndex = galleryImages.length - 1; // Vai para a última imagem
    } else {
        currentImageIndex = n;
    }

    const currentImage = galleryImages[currentImageIndex];
    modalImg.src = currentImage.src;
    captionText.innerHTML = currentImage.alt;
}

// Função para avançar/voltar slides
function plusSlides(n) {
    showSlides(currentImageIndex + n);
}

// Evento para clicar fora do conteúdo e fechar
window.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// Fecha o modal ao pressionar ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("show")) closeModal();
});

// Adiciona o evento de clique ao botão de fechar
if (closeBtn) {
  closeBtn.addEventListener("click", closeModal);
}

// Inicializa a lista de imagens após o carregamento do DOM
document.addEventListener('DOMContentLoaded', updateGalleryImages);

// Adiciona a função plusSlides e openModal ao escopo global para serem chamadas pelo HTML
window.plusSlides = plusSlides;
window.openModal = openModal;
window.closeModal = closeModal;
