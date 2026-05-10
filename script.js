const btnLang = document.getElementById('btnLang');
btnLang.addEventListener('click', () => {
    const isPt = document.body.classList.contains('lang-pt');
    document.body.classList.toggle('lang-pt', !isPt);
    document.body.classList.toggle('lang-en', isPt);
    btnLang.textContent = isPt ? '🌍 PT' : '🌍 EN';
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.style.color = link.getAttribute('href') === `#${entry.target.id}`
                    ? 'var(--red)'
                    : '';
            });
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => navObserver.observe(s));

document.getElementById('formContato').addEventListener('submit', function(event) {
    event.preventDefault();

    const isPt = document.body.classList.contains('lang-pt');
    const nome     = document.getElementById('nome').value.trim();
    const email    = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nome || !email || !mensagem) {
        alert(isPt
            ? '⸸ Por favor, preencha todos os campos do pergaminho.'
            : '⸸ Please fill out all fields of the parchment.');
        return;
    }
    if (!regexEmail.test(email)) {
        alert(isPt
            ? '⸸ Este e-mail não parece ser de um mortal válido.'
            : '⸸ This email does not seem to belong to a valid mortal.');
        return;
    }

    alert(isPt
        ? '⸸ Mensagem enviada com sucesso ao abismo!'
        : '⸸ Message successfully sent to the abyss!');
    this.reset();
});