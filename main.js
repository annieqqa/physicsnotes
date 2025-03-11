// Written by DeepSeek
// NightCat doesn't know much about JavaScript :(

document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

    themeToggle.addEventListener('click', function() {
        const isDark = body.getAttribute('data-theme') === 'dark';
        body.setAttribute('data-theme', isDark ? 'light' : 'dark');
        themeToggle.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
    });
    
    // Hide sidebar functionality
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');

    sidebarToggle.addEventListener('click', () => {
        const collapsed = sidebar.getAttribute('collapsed') === 'yes';
        console.log(collapsed);
        sidebar.setAttribute('collapsed', collapsed ? 'no' : 'yes');
        content.setAttribute('move-left', collapsed ? 'no' : 'yes');
        sidebarToggle.innerHTML = collapsed ?  '☰' : '→';
    });

    // Checkbox persistence
    const checkboxes = document.querySelectorAll('.checkbox-container input');
    
    // Load checkbox states
    checkboxes.forEach((checkbox, index) => {
        const savedState = localStorage.getItem(`checkbox-${index}`);
        if (savedState === 'true') {
            checkbox.checked = true;
        }
    });

    // Save checkbox states
    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('change', function() {
            localStorage.setItem(`checkbox-${index}`, this.checked);
        });
    });
    
    // Existing sidebar functionality
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    const contentItems = document.querySelectorAll('.content-item');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            sidebarLinks.forEach(l => l.classList.remove('active'));
            contentItems.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(this.dataset.content).classList.add('active');
        });
    });

    
    // Prevent checkbox clicks from triggering link activation
    document.querySelectorAll('.checkbox-container').forEach(container => {
        container.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
});