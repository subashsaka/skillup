document.addEventListener('DOMContentLoaded', () => {
    // Create toggle button if it doesn't exist (for pages where we might have missed adding it manually)
    // But ideally we add it to the HTML.

    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Check local storage for theme preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.setAttribute('data-theme', currentTheme);
        if (themeToggleBtn) {
            updateIcon(themeToggleBtn, currentTheme);
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            let theme = 'light';
            if (body.getAttribute('data-theme') === 'dark') {
                body.removeAttribute('data-theme');
                theme = 'light';
            } else {
                body.setAttribute('data-theme', 'dark');
                theme = 'dark';
            }
            localStorage.setItem('theme', theme);
            updateIcon(themeToggleBtn, theme);
        });
    }

    function updateIcon(btn, theme) {
        if (theme === 'dark') {
            btn.innerHTML = '<i class="fa fa-sun-o"></i>';
        } else {
            btn.innerHTML = '<i class="fa fa-moon-o"></i>';
        }
    }
});
