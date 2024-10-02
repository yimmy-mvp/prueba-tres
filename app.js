function login() {
    const username = document.getElementById('username').value;
    if (username) {
        document.getElementById('step1').classList.add('hidden');
        document.getElementById('step2').classList.remove('hidden');
        loadMap();
    } else {
        alert('Por favor, ingresa tu usuario.');
    }
}

function loadMap() {
    // Simulación de carga de mapa
    const mapElement = document.getElementById('map');
    mapElement.innerHTML = '<p>Cargando mapa de San Salvador con las ofertas fitness...</p>';

    // Simulación de marcador de negocios en el mapa
    setTimeout(() => {
        const locations = ['Negocio 1', 'Negocio 2', 'Negocio 3'];
        let businessList = '';
        locations.forEach((business, index) => {
            businessList += `<li onclick="showSchedule('${business}')">${business}</li>`;
        });
        mapElement.innerHTML = `<ul>${businessList}</ul>`;
    }, 2000);
}

function showSchedule(business) {
    document.getElementById('step2').classList.add('hidden');
    document.getElementById('step3').classList.remove('hidden');

    const scheduleList = document.getElementById('scheduleList');
    const schedules = ['10:00 AM', '1:00 PM', '6:00 PM'];
    let scheduleOptions = '';
    schedules.forEach((time) => {
        scheduleOptions += `<li onclick="confirmBooking('${business}', '${time}')">${time}</li>`;
    });
    scheduleList.innerHTML = scheduleOptions;
}

function confirmBooking(business, time) {
    document.getElementById('step3').classList.add('hidden');
    document.getElementById('step4').classList.remove('hidden');

    const confirmationMessage = `Te has suscrito al curso en ${business} a las ${time} con éxito.`;
    document.getElementById('confirmationMessage').innerText = confirmationMessage;

    // Generar código QR (simulación)
    const qrCanvas = document.getElementById('qrCode');
    qrCanvas.innerHTML = '<p>Aquí va el código QR</p>'; // Puedes agregar librerías QR si es necesario
}
