// Objeto con rutas de las imágenes de los planetas
const planetImages = {
    'Mercurio': 'mercurio.jpg',
    'Venus': 'venus.jpg',
    'Tierra': 'tierra.jpg',
    'Marte': 'marte.jpg',
    'Jupiter': 'jupiter.jpg',
    'Saturno': 'saturno.jpg',
    'Urano': 'urano.jpg',
    'Neptuno': 'neptuno.jpg'
};

// Variable para rastrear el tiempo transcurrido durante la caída libre
let elapsedTime = 0;
// Variable para rastrear si la simulación está en curso
let simulationInProgress = false;

// Función para cambiar la imagen del planeta seleccionado
function changePlanetImage() {
    if (!simulationInProgress) { // Verificar si no se está ejecutando la simulación
        const planetSelect = document.getElementById('planetSelect');
        const planetImage = document.getElementById('planetImage');
        const selectedPlanet = planetSelect.value;
        const planetImagePath = planetImages[selectedPlanet];
        planetImage.src = planetImagePath;
    }
}

// Asocia la función al evento "change" del menú desplegable
document.getElementById('planetSelect').addEventListener('change', changePlanetImage);

// Función inicial para mostrar la imagen del planeta predeterminado
changePlanetImage();

// Función para simular la caída libre
function simulateFreeFall() {
    if (!simulationInProgress) { // Verificar si no se está ejecutando la simulación
        simulationInProgress = true; // Marcar que la simulación está en curso
        const planetSelect = document.getElementById('planetSelect');
        const selectedPlanet = planetSelect.value;
        const gravity = getGravity(selectedPlanet); // Obtener la gravedad del planeta
        const freeFallImage = document.getElementById('freeFallImage');
        const planetImage = document.getElementById('planetImage');
        // Establecer elapsedTime a 0 al comenzar la simulación
        elapsedTime = 0;

        // Calcular la velocidad inicial de caída según la gravedad del planeta
        const initialVelocity = Math.sqrt(2 * gravity * 190); // Altura inicial de 190px

        // Obtener la posición inicial del planeta
        const planetPosition = planetImage.getBoundingClientRect();
        const planetTop = planetPosition.top + window.scrollY + planetPosition.height;

        // Posición inicial del meteorito
        freeFallImage.style.top = (planetTop - 190) + 'px'; // Altura deseada

        // Tamaño de la imagen del meteorito
        freeFallImage.style.width = '100px'; // Ancho deseado en píxeles
        freeFallImage.style.height = '100px'; // Alto deseado en píxeles

        // Agrega la imagen del meteorito
        freeFallImage.src = 'meteorito.jpg';

        // Mostrar la imagen de caída libre
        freeFallImage.style.display = 'block';

        // Posición inicial del meteorito
        let position = planetTop - 190; // Altura deseada

        // Retraso antes de que comience la caída libre
        setTimeout(() => {
            // Simular la caída libre
            const animationInterval = setInterval(() => {
                // Calcula la nueva posición del meteorito en función de la velocidad inicial
                position += initialVelocity * 0.02; // 0.02 segundos (20 ms)

                // Actualiza el tiempo transcurrido
                elapsedTime += 0.02; // Incrementa en 0.02 segundos (20 ms)

                // Actualiza el elemento HTML con el tiempo transcurrido
                document.getElementById('timeElapsed').textContent = `Tiempo transcurrido: ${elapsedTime.toFixed(2)} segundos`;

                // Actualiza la posición del meteorito
                freeFallImage.style.top = position + 'px';

                // Verifica que el meteorito ha llegado al suelo
                if (position >= window.innerHeight - 100) {
                    clearInterval(animationInterval); // Detener la simulación al llegar al suelo
                    freeFallImage.style.top = (window.innerHeight - 100) + 'px'; // Fijar la posición en el suelo

                    // Efecto sacudida al impactar el meteorito
                    shakePage();

                    // Marcar que la simulación ha terminado
                    simulationInProgress = false;

                    // Habilitar nuevamente los elementos del menú desplegable (los planetas)
                    planetSelect.disabled = false;
                }
            }, 20); // Intervalo deseado en milisegundos
        }, 1000); // Tiempo de retraso deseado en milisegundos

        // Deshabilitar los elementos del menú desplegable (los planetas)
        planetSelect.disabled = true;
    }
}

// Función de sacudida al sitio web
function shakePage() {
    const originalMarginLeft = document.body.style.marginLeft;
    const originalMarginTop = document.body.style.marginTop;

    const shakeInterval = setInterval(() => {
        const randomX = Math.random() * 10 - 5;
        const randomY = Math.random() * 10 - 5;
        document.body.style.marginLeft = `${randomX}px`;
        document.body.style.marginTop = `${randomY}px`;
    }, 50);

    setTimeout(() => {
        clearInterval(shakeInterval);
        document.body.style.marginLeft = originalMarginLeft;
        document.body.style.marginTop = originalMarginTop;
    }, 1000); // Duración del efecto de sacudida en milisegundos
}

// Se asocia la función de simulación al clic en la imagen del planeta
document.getElementById('planetImage').addEventListener('click', simulateFreeFall);

// Función para obtener la gravedad de un planeta
function getGravity(planet) {
    // Se definen las gravedades de los planetas en m/s² (aproximadamente)
    const gravityValues = {
        'Mercurio': 3.7,
        'Venus': 8.87,
        'Tierra': 9.81,
        'Marte': 3.711,
        'Jupiter': 24.79,
        'Saturno': 10.44,
        'Urano': 8.69,
        'Neptuno': 11.15
    };

    return gravityValues[planet];
}

// Abrir el modal al hacer clic en el botón
$('#openModalButton').on('click', function() {
    $('#genericPlanetModal').modal('show');
});

// Asociar la función de guardar configuración al clic en el botón "Guardar"
$('#genericPlanetModal .btn-primary').on('click', function() {
    // Obtener los valores de los campos del formulario
    const nombrePlaneta = $('#nombrePlaneta').val();
    const gravedadPlaneta = parseFloat($('#gravedadPlaneta').val());
    const velocidadCaida = parseFloat($('#velocidadCaida').val());
    // Realizar acciones con los valores obtenidos (por ejemplo, mostrarlos en la página)
    console.log('Nombre del planeta:', nombrePlaneta);
    console.log('Gravedad del planeta:', gravedadPlaneta);
    console.log('Velocidad de caída:', velocidadCaida);

    // Cerrar el modal
    $('#genericPlanetModal').modal('hide');
});

// Asociar la función de limpiar formulario al clic en el botón "Limpiar" en el modal
$('#limpiarButton').on('click', function() {
    // Limpiar los valores de los campos del formulario
    $('#nombrePlaneta').val('');
    $('#gravedadPlaneta').val('');
    $('#velocidadCaida').val('');
});
