const menuHTML = `
    <div class="top-bar">
        <div class="top-bar-left">
            <button class="menu-btn" id="openMenuBtn"><i class='bx bx-menu'></i></button>
        </div>
        <div class="top-bar-right">
            <div class="badge"><i class='bx bx-calendar'></i> <span id="joinDateDisplay">--/--/----</span></div>
            <div class="badge" onclick="window.location.href='perfil.html'">
                <img id="topAvatar" src="https://via.placeholder.com/30/14001e/bc13fe?text=U"> 
                <span id="topUserDisplay">...</span>
            </div>
            <div class="badge green"><span>$</span><span id="balanceDisplay">0.00</span></div>
        </div>
    </div>

    <div class="sidebar-overlay" id="sidebarOverlay"></div>
    
    <div class="sidebar" id="sidebar">
        <div class="sidebar-header">
            <h2>Socios XIT </h2>
            <button class="close-btn" id="closeMenuBtn"><i class='bx bx-x'></i></button>
        </div>
        
        <div class="sidebar-menu">
            <a href="dashboard.html" class="sidebar-item"><i class='bx bx-home-alt-2'></i> Inicio</a>
            <a href="perfil.html" class="sidebar-item"><i class='bx bx-user-circle'></i> Mi Perfil</a>
            <a href="index.html" class="sidebar-item"><i class='bx bx-store-alt'></i> Tienda</a>
            <a href="ranking.html" class="sidebar-item"><i class='bx bx-trophy'></i> Rankings</a>
            <a href="recarga.html" class="sidebar-item"><i class='bx bx-wallet'></i> Recargar Saldo</a>
            <a href="transferir_saldo.html" class="sidebar-item"><i class='bx bx-transfer-alt'></i> Transferir Saldo</a>
            <a href="bot.html" class="sidebar-item"><i class='bx bxl-telegram'></i> Autorizar ID</a>
            <a href="historial.html" class="sidebar-item"><i class='bx bx-history'></i> Mis Compras</a>
            <a href="redes_sociales.html" class="sidebar-item"><i class='bx bx-globe'></i> Seguidores Redes Sociales</a>
            <a href="diamantes.html" class="sidebar-item"><i class='bx bxs-diamond'></i> Diamantes FF</a>
            <a href="downloader.html" class="sidebar-item"><i class='bx bx-cloud-download'></i> Descargar Media</a>
            <a href="referidos.html" class="sidebar-item"><i class='bx bx-share-alt'></i> Referidos</a>
            <a href="tutoriales.html" class="sidebar-item"><i class='bx bx-file'></i> Tutoriales</a>
            <a href="sugerencias.html" class="sidebar-item"><i class='bx bx-message-square-dots'></i> Hacer Sugerencia</a>
            <a href="admin.html" class="sidebar-item" id="adminMenuBtn" style="display:none; border-left: 4px solid var(--neon-pink);"><i class='bx bx-shield-quarter' style="color: var(--neon-pink);"></i> Panel Admin</a>
        </div>
        
        <div class="sidebar-footer">
            <button class="logout-btn" id="logoutMenuBtn"><i class='bx bx-log-out'></i> Cerrar Sesión</button>
            <div class="sidebar-version">
                <p>Copyright SebasXit 2024 - 2026</p>
                <div class="version-badge"><i class='bx bx-code-alt'></i> V4</div>
            </div>
        </div>
    </div>
`;

function inicializarMenu() {
    // 1. Inyectar el menú en el body
    document.body.insertAdjacentHTML('afterbegin', menuHTML);

    // 2. Lógica para abrir y cerrar el sidebar
    const sidebar = document.getElementById('sidebar'); 
    const overlay = document.getElementById('sidebarOverlay');
    
    document.getElementById('openMenuBtn').onclick = () => { 
        sidebar.classList.add('active'); 
        overlay.classList.add('active'); 
    };
    
    document.getElementById('closeMenuBtn').onclick = () => { 
        sidebar.classList.remove('active'); 
        overlay.classList.remove('active'); 
    };
    
    overlay.onclick = () => { 
        sidebar.classList.remove('active'); 
        overlay.classList.remove('active'); 
    };

    // 3. Sistema para iluminar automáticamente el menú activo según la URL
    // Obtenemos el nombre del archivo actual (ej: "dashboard.html")
    let currentPath = window.location.pathname.split('/').pop();
    if (currentPath === '') currentPath = 'index.html'; // Por si entra a la raíz

    const menuItems = document.querySelectorAll('.sidebar-item');
    
    menuItems.forEach(item => {
        const itemHref = item.getAttribute('href');
        
        // Si el enlace coincide con la página actual, le aplicamos los estilos neon
        if (itemHref === currentPath) {
            item.style.borderLeft = '4px solid var(--neon-blue)';
            item.style.background = 'linear-gradient(90deg, rgba(0, 238, 255, 0.15), transparent)';
            item.style.color = '#fff';
            item.style.transform = 'translateX(8px)';
            item.style.opacity = '1';
            
            const icon = item.querySelector('i');
            if (icon) {
                icon.style.color = 'var(--neon-blue)';
                icon.style.textShadow = '0 0 10px var(--neon-blue)';
            }
        }
    });
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarMenu);
