// 1. Lógica do Carrinho e Bagagem
const btnAddBaggage = document.getElementById('btn-add-baggage');
const cartBaggageItem = document.getElementById('cart-baggage-item');
const cartTotalPrice = document.getElementById('cart-total-price');

let hasBaggage = false;

btnAddBaggage.addEventListener('click', () => {
    hasBaggage = !hasBaggage; // Inverte o estado (se tinha, tira; se não tinha, põe)
    
    if (hasBaggage) {
        btnAddBaggage.textContent = 'Remover';
        btnAddBaggage.classList.add('remove-state');
        cartBaggageItem.classList.remove('hidden-item');
        cartTotalPrice.textContent = 'R$ 470,00'; // 350 + 120
    } else {
        btnAddBaggage.textContent = 'Adicionar';
        btnAddBaggage.classList.remove('remove-state');
        cartBaggageItem.classList.add('hidden-item');
        cartTotalPrice.textContent = 'R$ 350,00';
    }
});

// 2. Lógica de Prevenção/Recuperação de Erros no E-mail
const emailInput = document.getElementById('email');
const emailGroup = document.getElementById('email-group');
const emailHelper = document.getElementById('email-helper');

// Regex que obriga o formato texto@texto.texto
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

emailInput.addEventListener('input', (e) => {
    const value = e.target.value;
    
    // Agora ele testa se a digitação bate com a regra oficial de e-mails
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
    // Só deixa avançar se o e-mail estiver correto (Controle de Erro Forte)
    if (emailGroup.classList.contains('success')) {
        // Atualiza os dados no modal
        modalPrice.textContent = cartTotalPrice.textContent;
        modalEmail.textContent = emailInput.value;
        
        // Mostra o modal
        modalOverlay.classList.remove('hidden-item');
    } else {
        // Dá um alerta visual tremendo o campo se tiver erro
        emailInput.focus();
        alert("Por favor, corrija o e-mail antes de prosseguir para o pagamento.");
    }
});

// Fechar o modal (Controle e Liberdade do Usuário)
btnCloseModal.addEventListener('click', () => {
    modalOverlay.classList.add('hidden-item');
});