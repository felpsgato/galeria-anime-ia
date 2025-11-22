// Seleciona elementos principais
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("img01");
const captionText = document.getElementById("caption");
const closeBtn = document.querySelector(".close");
// Seleciona todas as imagens dentro da galeria
const galleryImages = Array.from(document.querySelectorAll(".gallery img"));

let currentImageIndex = 0;

// Função para abrir o modal
function openModal(element) {
  if (!modal || !modalImg || !element) return;

  // Encontra o índice da imagem clicada
  currentImageIndex = galleryImages.indexOf(element);

  // Exibe a imagem no modal
  showSlides(currentImageIndex);

  modal.style.display = "flex";
  // Adiciona a classe 'show' para a animação CSS
  modal.classList.add("show");
  // Impede a rolagem do corpo da página
  document.body.style.overflow = "hidden";
}

// Função para fechar o modal
function closeModal() {
  if (!modal) return;
  // Remove a classe 'show' para a animação de saída
  modal.classList.remove("show");
  setTimeout(() => {
    modal.style.display = "none";
    modalImg.src = "";
    captionText.innerHTML = "";
    // Restaura a rolagem do corpo da página
    document.body.style.overflow = "";
  }, 200); // Tempo da animação CSS
}

// Função para mostrar a imagem atual
function showSlides(n) {
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

// Evento para fechar o modal ao clicar no botão de fechar
if (closeBtn) {
  closeBtn.addEventListener("click", closeModal);
}

// Evento para fechar o modal ao clicar fora do conteúdo
window.addEventListener("click", (e) => {
  // Verifica se o clique foi no fundo do modal (e não na imagem ou nos botões)
  if (e.target === modal) closeModal();
});

// Fecha o modal ao pressionar ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("show")) closeModal();
});

// Adiciona o evento de clique a todas as imagens da galeria
galleryImages.forEach(img => {
    img.onclick = function() {
        openModal(this);
    };
});

// Adiciona as funções ao escopo global para serem chamadas pelo HTML (onclick)
window.plusSlides = plusSlides;
window.openModal = openModal;
window.closeModal = closeModal;
