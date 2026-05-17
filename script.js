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

emailInput.addEventListener('input', (e) => {
    const value = e.target.value;
    
    // Se o usuário digitar o '@', consideramos que ele está corrigindo o erro
    if (value.includes('@')) {
        emailGroup.classList.remove('error');
        emailGroup.classList.add('success');
        emailHelper.textContent = '✓ Formato de e-mail válido!';
    } else {
        emailGroup.classList.add('error');
        emailGroup.classList.remove('success');
        emailHelper.textContent = '⚠️ Formato inválido. Verifique se esqueceu de colocar o "@" ou o ".com".';
    }
});