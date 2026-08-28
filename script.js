document.addEventListener('DOMContentLoaded', () => {
  const btnEntrar = document.getElementById('btnEntrar');
  const pantallaBienvenida = document.getElementById('pantallabienvenida');
  const invitacion = document.getElementById('Invitacióncontenedor');
  const musicaFondo = document.getElementById('musicaFondo');

  btnEntrar.addEventListener('click', () => {
    musicaFondo?.play().catch(() => {});
    pantallaBienvenida.classList.add('oculto');
    invitacion.style.display = 'block';
    document.body.classList.add('invitacion-abierta');
    observarAnimaciones();
  });

  actualizarContador();
  setInterval(actualizarContador, 1000);
});

const fechaFiesta = new Date(2026, 8, 19, 16, 0, 0).getTime();

function actualizarContador() {
  const contador = document.getElementById('contador');
  if (!contador) return;
  const diferencia = fechaFiesta - Date.now();
  if (diferencia < 0) {
    contador.innerHTML = '<p class="etiqueta">¡Llegó el gran día!</p>';
    return;
  }
  const unidades = {
    dias: Math.floor(diferencia / 86400000),
    horas: Math.floor((diferencia % 86400000) / 3600000),
    minutos: Math.floor((diferencia % 3600000) / 60000),
    segundos: Math.floor((diferencia % 60000) / 1000)
  };
  Object.entries(unidades).forEach(([id, valor]) => {
    document.getElementById(id).textContent = String(valor).padStart(2, '0');
  });
}

function observarAnimaciones() {
  const elementos = document.querySelectorAll('.animar');
  if (!('IntersectionObserver' in window)) {
    elementos.forEach(elemento => elemento.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entradas, observador) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12 });
  elementos.forEach(elemento => observer.observe(elemento));
}
