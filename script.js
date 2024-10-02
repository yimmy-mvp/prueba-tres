document.addEventListener("DOMContentLoaded", function() {

    let map;  // Definir la variable del mapa fuera de las funciones

    // Paso 1: Inicia sesión
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();  // Prevenir el envío del formulario

        const username = document.getElementById("username").value;
        if (username) {
            // Ocultar el paso 1 y mostrar el paso 2 (mapa)
            document.getElementById("step1").classList.add("hidden");
            document.getElementById("step2").classList.remove("hidden");

            // Inicializar el mapa solo la primera vez que el usuario inicia sesión
            if (!map) {
                displayMap();  // Mostrar el mapa
            }
        }
    });

    // Función para mostrar el mapa con las ofertas disponibles
    function displayMap() {
        map = L.map('map').setView([13.69294, -89.21819], 13);  // Inicializar el mapa en San Salvador

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '© OpenStreetMap'
        }).addTo(map);

        const fitnessOffers = [
            { name: "CrossFit La Grotta", location: [13.6981, -89.1913], description: "Clases de CrossFit" },
            { name: "Shanti Yoga", location: [13.6968, -89.2000], description: "Clases de Yoga" },
            // Añadir otros negocios afiliados aquí
        ];

        // Añadir marcadores al mapa
        fitnessOffers.forEach(offer => {
            const marker = L.marker(offer.location).addTo(map);
            marker.bindPopup(`<strong>${offer.name}</strong><br>${offer.description}`);
            marker.on('click', () => {
                // Al hacer clic en un marcador, pasar al siguiente paso
                document.getElementById("step2").classList.add("hidden");
                document.getElementById("step3").classList.remove("hidden");
                displaySchedule(offer);  // Mostrar los horarios
            });
        });
    }

    // Función para mostrar los horarios disponibles para un negocio
    function displaySchedule(offer) {
        const schedules = [
            { time: "8:00 AM" },
            { time: "10:00 AM" },
            { time: "6:00 PM" },
        ];

        const scheduleList = document.getElementById("scheduleList");
        scheduleList.innerHTML = "";  // Limpiar la lista de horarios

        schedules.forEach(schedule => {
            const listItem = document.createElement("li");
            listItem.textContent = schedule.time;
            listItem.addEventListener('click', () => {
                confirmReservation(offer, schedule.time);
            });
            scheduleList.appendChild(listItem);
        });
    }

    // Función para confirmar la reserva
    function confirmReservation(offer, time) {
        const confirmation = confirm(`¿Deseas confirmar tu reserva para ${offer.name} a las ${time}?`);
        if (confirmation) {
            document.getElementById("step3").classList.add("hidden");
            document.getElementById("step4").classList.remove("hidden");
            document.getElementById("confirmationMessage").textContent = `Te has suscrito al curso "${offer.name}" a las ${time} con éxito.`;
            generateQRCode(`Reserva para ${offer.name} a las ${time}`);
        }
    }

    // Función para generar el código QR
    function generateQRCode(data) {
        const qr = new QRious({
            element: document.getElementById("qrCode"),
            value: data,
            size: 150,
        });
    }

});
