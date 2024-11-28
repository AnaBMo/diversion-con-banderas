/* ****************************************************************************************
PRIMERA PARTE 
- Al cargar el DOM, la aplicación tiene que llamar una función que realiza una solicitud a 
la API (https://restcountries.com/v3/all) para obtener información sobre todos los países. 
Son 250, tarda un poco en renderizar.
- La información se ordena alfabéticamente.
***************************************************************************************** */
const obtenerPaises = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all'); 
        if (!response.ok) {
            throw new Error(`🔴 Ha surgido un error: ${response.status}`);
        }

        const data = await response.json(); 
         /* ***** */ console.log('🟩 Respuesta después json()', response);

        const paisesOrdenAlfa = data.sort((a, b) => {
            const nameA = a.name.common.toUpperCase() // se elige nombre común para ordenar
            const nameB = b.name.common.toUpperCase();

            if (nameA < nameB) {
                return -1;
            } else if (nameA > nameB) {
                return 1; 
            } else {
                return 0; 
            }
        });
        /* ***** */ console.log('🟦 Países ordenados alfabéticamente: ', paisesOrdenAlfa);
        paisesOrdenAlfa.forEach(pais => mostrarPaises(pais));

    } catch (error) {
        console.error('🔴 Error al obtener los datos:', error.message); // Mostrar el mensaje de error
    }
};

obtenerPaises();

const mostrarPaises = (pais) => {
    /* ***** */ console.log('🟡Función muestra paises ok? ', pais);

    const listaPaises = document.getElementById('countries-list');
    if (!listaPaises) {
        console.error('🔴 Elemento con id "countries-list" no encontrado.');
        return;
    }

    const contenedorPais = document.createElement('div');
    contenedorPais.classList.add('pais');
    contenedorPais.innerHTML = `
        <img src="${pais.flags.svg}" alt="Bandera de ${pais.name.common}">
        <p>${pais.name.common}</p>
    `;
    listaPaises.appendChild(contenedorPais);   
    
    // Evento click para llamar a la ventana flotante con más info de cada pais
    contenedorPais.addEventListener('click', () => {
        /* ***** */ console.log(`⬜ Comprobando click en: ${pais.name.common}`);
        mostrarDetallePais(pais);
    });  
};

/* ****************************************************************************************
SEGUNDA PARTE
- Al clickar en cada una de las banderas tendrá que mostrar la información detallada en una 
ventana flotante del país seleccionado. La Muestra información detallada sobre el país seleccionado, 
incluyendo la bandera, la capital, la población, el lado de la carretera por el que se circula.
- Tendrá un botón cerrar para hacer desaparecer esa información.
***************************************************************************************** */
const mostrarDetallePais = (pais) => {
    /* ***** */ console.log('🟪Función muestra flotante país ok? ', pais);

    const ventanaFlotante = document.createElement('div');
    ventanaFlotante.classList.add('ventana-flotante');
    ventanaFlotante.innerHTML = `
        <div>
            <h2>${pais.name.common}</h2>
            <img src="${pais.flags.svg}" alt="Bandera de ${pais.name.common}" width="150">
            <p><b>Capital:</b> ${pais.capital ? pais.capital[0] : 'No disponible'}</p>
            <p><b>Población:</b> ${pais.population.toLocaleString()}</p>
            <p><b>Lado de conducción:</b> ${pais.car.side}</p>
            <button class="cerrar-pais">Cerrar</button>
        </div>
    `;

    document.body.appendChild(ventanaFlotante);
    /* ***** */ console.log('🟫 Ventana flotante añadida: ', ventanaFlotante);

    const botonCerrar = ventanaFlotante.querySelector('.cerrar-pais'); //se selecciona por class
    botonCerrar.addEventListener('click', () => {
        /* ***** */ console.log('🟤 Ventana flotante cerrada: ', ventanaFlotante);
        document.body.removeChild(ventanaFlotante); 
    });
};