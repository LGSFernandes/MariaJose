document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        // Aplica efeito de hover apenas em botões que não são de gradiente
        if (!button.classList.contains('economize')) {
            button.addEventListener('mouseover', function() {
                // Verifica se NÃO está no modo escuro antes de aplicar o hover claro
                if (!document.body.classList.contains('dark-mode')) {
                     this.style.backgroundColor = lightenColor(getComputedStyle(this).backgroundColor, 5);
                }
            });

            button.addEventListener('mouseout', function() {
                // Reseta a cor inline para que o CSS volte a valer
                this.style.backgroundColor = '';
            });
        }
    });

    // Função utilitária para clarear cores (mantida para hovers sutis)
    function lightenColor(color, percent) {
        color = color.replace(/^\s+|\s+$/g, '');
        if (color.startsWith('rgb')) {
             let rgb = color.match(/\d+/g);
             let R = parseInt(rgb[0]);
             let G = parseInt(rgb[1]);
             let B = parseInt(rgb[2]);
             
             R = parseInt((100 + percent) * R/100);
             G = parseInt((100 + percent) * G/100);
             B = parseInt((100 + percent) * B/100);
             
             R = (R<255)?R:255;  
             G = (G<255)?G:255;  
             B = (B<255)?B:255;  
             
             return `rgb(${R}, ${G}, ${B})`;
        }
        return color;
    }

    // Lógica de partículas mantida
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        document.body.appendChild(particle);

        const size = Math.random() * 8 + 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        
        const colors = ['#4facfe', '#f9d423', '#26c6da'];
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.opacity = Math.random() * 0.5;

        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    }

    setInterval(createParticle, 700);

    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        themeToggle.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });
});
