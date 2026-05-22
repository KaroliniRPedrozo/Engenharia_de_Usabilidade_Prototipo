// 1. Lógica do Carrinho, Bagagem e Toast (Recuperação de Erros)
const btnAddBaggage = document.getElementById('btn-add-baggage');
const cartBaggageItem = document.getElementById('cart-baggage-item');
const cartTotalPrice = document.getElementById('cart-total-price');

// Elementos do Toast
const undoToast = document.getElementById('undo-toast');
const btnUndo = document.getElementById('btn-undo');
let toastTimeout;
let hasBaggage = false;

// Função principal que muda os estados
function toggleBaggage(forceState) {
    // Se forceState foi passado, usa ele. Se não, apenas inverte o estado atual.
    hasBaggage = forceState !== undefined ? forceState : !hasBaggage;
    
    if (hasBaggage) {
        btnAddBaggage.textContent = 'Remover';
        btnAddBaggage.classList.add('remove-state');
        cartBaggageItem.classList.remove('hidden-item');
        cartTotalPrice.textContent = 'R$ 470,00'; 
    } else {
        btnAddBaggage.textContent = 'Adicionar';
        btnAddBaggage.classList.remove('remove-state');
        cartBaggageItem.classList.add('hidden-item');
        cartTotalPrice.textContent = 'R$ 350,00';
    }
}

// Clique no botão principal de bagagem
btnAddBaggage.addEventListener('click', () => {
    toggleBaggage();
    
    // Mostra o Toast de recuperação de erro se a pessoa acabou de remover a mala
    if (!hasBaggage) {
        showToast();
    } else {
        hideToast(); // Esconde imediatamente se ela resolveu adicionar de novo
    }
});

function showToast() {
    undoToast.classList.add('show');
    clearTimeout(toastTimeout);
    // O toast some sozinho após 5 segundos
    toastTimeout = setTimeout(() => {
        hideToast();
    }, 5000);
}

function hideToast() {
    undoToast.classList.remove('show');
}

// Clique no botão "Desfazer" do Toast
btnUndo.addEventListener('click', () => {
    toggleBaggage(true); // Força o estado para "Adicionado"
    hideToast();         // Esconde o aviso instantaneamente
});


// 2. Lógica de Prevenção/Recuperação de Erros no E-mail
const emailInput = document.getElementById('email');
const emailGroup = document.getElementById('email-group');
const emailHelper = document.getElementById('email-helper');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

emailInput.addEventListener('input', (e) => {
    const value = e.target.value;
    
    if (emailRegex.test(value)) {
        emailGroup.classList.remove('error');
        emailGroup.classList.add('success');
        emailHelper.textContent = '✓ Formato de e-mail válido!';
    } else {
        emailGroup.classList.add('error');
        emailGroup.classList.remove('success');
        emailHelper.textContent = '⚠️ Formato inválido. Insira um e-mail completo (ex: nome@dominio.com).';
    }
});


// 3. Lógica do Botão de Pagamento e Modal (Passo 3)
const btnSubmit = document.querySelector('.btn-submit');
const modalOverlay = document.getElementById('success-modal');
const btnCloseModal = document.getElementById('btn-close-modal');
const modalPrice = document.getElementById('modal-price');
const modalEmail = document.getElementById('modal-email');

btnSubmit.addEventListener('click', () => {
    if (emailGroup.classList.contains('success')) {
        modalPrice.textContent = cartTotalPrice.textContent;
        modalEmail.textContent = emailInput.value;
        modalOverlay.classList.remove('hidden-item');
    } else {
        emailInput.focus();
        alert("Por favor, corrija o e-mail antes de prosseguir para o pagamento.");
    }
});

btnCloseModal.addEventListener('click', () => {
    modalOverlay.classList.add('hidden-item');
});