// app.js - Lógica principal de la app

let events = [];
let currentFilter = 'all';
let currentCategory = 'all';

// Inicializar app
document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
    setupEventListeners();
    renderEvents();
});

// Cargar eventos
function loadEvents() {
    // Primero intenta cargar desde localStorage
    const savedEvents = localStorage.getItem('agendaEvents');
    if (savedEvents) {
        events = JSON.parse(savedEvents);
    } else {
        // Si no hay eventos guardados, usa los de events.js
        events = [...EVENTS_DATA];
        saveEvents();
    }
}

// Guardar eventos
function saveEvents() {
    localStorage.setItem('agendaEvents', JSON.stringify(events));
}

// Setup event listeners
function setupEventListeners() {
    // Add button
    document.getElementById('addBtn').addEventListener('click', showAddModal);
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderEvents();
        });
    });
    
    // Category buttons
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            renderEvents();
        });
    });
    
    // Form submit
    document.getElementById('eventForm').addEventListener('submit', handleFormSubmit);
}

// Show add modal
function showAddModal() {
    document.getElementById('modalTitle').textContent = 'Añadir evento';
    document.getElementById('eventForm').reset();
    document.getElementById('eventId').value = '';
    document.getElementById('modal').classList.add('active');
}

// Show edit modal
function showEditModal(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;
    
    document.getElementById('modalTitle').textContent = 'Editar evento';
    document.getElementById('eventId').value = event.id;
    document.getElementById('titulo').value = event.titulo;
    document.getElementById('fecha').value = event.fecha;
    document.getElementById('hora').value = event.hora || '';
    document.getElementById('lugar').value = event.lugar || '';
    document.getElementById('descripcion').value = event.descripcion || '';
    document.getElementById('categoria').value = event.categoria;
    document.getElementById('url').value = event.url || '';
    document.getElementById('estado').value = event.estado;
    
    document.getElementById('modal').classList.add('active');
}

// Close modal
function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

// Handle form submit
function handleFormSubmit(e) {
    e.preventDefault();
    
    const eventId = document.getElementById('eventId').value;
    const eventData = {
        id: eventId || Date.now().toString(),
        titulo: document.getElementById('titulo').value,
        fecha: document.getElementById('fecha').value,
        hora: document.getElementById('hora').value,
        lugar: document.getElementById('lugar').value,
        descripcion: document.getElementById('descripcion').value,
        categoria: document.getElementById('categoria').value,
        url: document.getElementById('url').value,
        estado: document.getElementById('estado').value
    };
    
    if (eventId) {
        // Edit existing
        const index = events.findIndex(e => e.id === eventId);
        if (index !== -1) {
            events[index] = eventData;
        }
    } else {
        // Add new
        events.push(eventData);
    }
    
    saveEvents();
    renderEvents();
    closeModal();
}

// Delete event
function deleteEvent(eventId) {
    if (!confirm('¿Seguro que quieres eliminar este evento?')) return;
    
    events = events.filter(e => e.id !== eventId);
    saveEvents();
    renderEvents();
}

// Filter events
function filterEvents() {
    let filtered = [...events];
    
    // Filter by time
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    if (currentFilter === 'today') {
        filtered = filtered.filter(e => {
            const eventDate = new Date(e.fecha);
            return eventDate.toDateString() === today.toDateString();
        });
    } else if (currentFilter === 'week') {
        const weekFromNow = new Date(today);
        weekFromNow.setDate(weekFromNow.getDate() + 7);
        filtered = filtered.filter(e => {
            const eventDate = new Date(e.fecha);
            return eventDate >= today && eventDate < weekFromNow;
        });
    } else if (currentFilter === 'upcoming') {
        filtered = filtered.filter(e => {
            const eventDate = new Date(e.fecha);
            return eventDate >= today;
        });
    }
    
    // Filter by category
    if (currentCategory !== 'all') {
        filtered = filtered.filter(e => e.categoria === currentCategory);
    }
    
    // Sort by date
    filtered.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    
    return filtered;
}

// Render events
function renderEvents() {
    const filtered = filterEvents();
    const container = document.getElementById('eventsList');
    const emptyState = document.getElementById('emptyState');
    
    if (filtered.length === 0) {
        container.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    container.innerHTML = filtered.map(event => createEventCard(event)).join('');
}

// Create event card HTML
function createEventCard(event) {
    const eventDate = new Date(event.fecha);
    const today = new Date();
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    let daysUntilHTML = '';
    if (diffDays === 0) {
        daysUntilHTML = '<div class="days-until today">¡HOY!</div>';
    } else if (diffDays === 1) {
        daysUntilHTML = '<div class="days-until today">¡MAÑANA!</div>';
    } else if (diffDays > 0 && diffDays <= 7) {
        daysUntilHTML = `<div class="days-until soon">En ${diffDays} días</div>`;
    } else if (diffDays > 7) {
        daysUntilHTML = `<div class="days-until">En ${diffDays} días</div>`;
    }
    
    const formattedDate = eventDate.toLocaleDateString('es-ES', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short' 
    });
    
    const statusClass = `status-${event.estado.toLowerCase().replace(' ', '-')}`;
    
    return `
        <div class="event-card">
            ${daysUntilHTML}
            <div class="event-header">
                <div>
                    <div class="event-title">${event.titulo}</div>
                    <div class="event-date">
                        📅 ${formattedDate}
                        ${event.hora ? `<span class="event-time">• ${event.hora}</span>` : ''}
                    </div>
                </div>
            </div>
            
            <div class="event-info">
                ${event.lugar ? `<div class="event-location">📍 ${event.lugar}</div>` : ''}
                ${event.descripcion ? `<div class="event-description">${event.descripcion}</div>` : ''}
            </div>
            
            <div class="event-footer">
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <span class="event-category">${getCategoryIcon(event.categoria)} ${event.categoria}</span>
                    <span class="event-status ${statusClass}">${getStatusIcon(event.estado)} ${event.estado}</span>
                </div>
                <div class="event-actions">
                    <button class="btn-icon" onclick="showEditModal('${event.id}')" title="Editar">✏️</button>
                    <button class="btn-icon btn-delete" onclick="deleteEvent('${event.id}')" title="Eliminar">🗑️</button>
                </div>
            </div>
            
            ${event.url ? `<a href="${event.url}" target="_blank" class="event-link">Ver más info →</a>` : ''}
        </div>
    `;
}

// Get category icon
function getCategoryIcon(category) {
    const icons = {
        'Música': '🎵',
        'Teatro': '🎭',
        'Cine': '🎬',
        'Exposición': '🎨',
        'Fiesta': '🎉',
        'Charla': '💬',
        'Deportes': '⚽',
        'Otro': '📌'
    };
    return icons[category] || '📌';
}

// Get status icon
function getStatusIcon(status) {
    const icons = {
        'Interesado': '⭐',
        'Confirmado': '✅',
        'Asistido': '🎉',
        'No fui': '❌'
    };
    return icons[status] || '⭐';
}

// Close modal on outside click
document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal') {
        closeModal();
    }
});

// Set default date to today
document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('fecha').value = today;
});
