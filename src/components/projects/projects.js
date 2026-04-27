export function setupCarousel() {
    let currentPage = 0;
    const itemsPerPage = 2;

    function updateCarousel(projects) {
        const totalPages = Math.ceil(projects.length / itemsPerPage);
        const container = document.querySelector('.carousel-container');
        const prevBtn = document.querySelector('.carousel-button.prev');
        const nextBtn = document.querySelector('.carousel-button.next');
        const indicators = document.querySelectorAll('.indicator-dot');

        if (!container) return;

        // Calcular el offset de transform (vertical)
        const offset = currentPage * 100;
        container.style.transform = `translateY(-${offset}%)`;

        // Actualizar botones
        if (prevBtn) prevBtn.disabled = currentPage === 0;
        if (nextBtn) nextBtn.disabled = currentPage === totalPages - 1;

        // Actualizar indicadores
        indicators.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentPage);
        });
    }

    function goToPrevious(projects) {
        const totalPages = Math.ceil(projects.length / itemsPerPage);
        if (currentPage > 0) {
            currentPage--;
            updateCarousel(projects);
        }
    }

    function goToNext(projects) {
        const totalPages = Math.ceil(projects.length / itemsPerPage);
        if (currentPage < totalPages - 1) {
            currentPage++;
            updateCarousel(projects);
        }
    }

    function goToPage(page, projects) {
        const totalPages = Math.ceil(projects.length / itemsPerPage);
        if (page >= 0 && page < totalPages) {
            currentPage = page;
            updateCarousel(projects);
        }
    }

    function getVisibleProjects(projects) {
        const start = currentPage * itemsPerPage;
        const end = start + itemsPerPage;
        return projects.slice(start, end);
    }

    return {
        goToPrevious,
        goToNext,
        goToPage,
        getVisibleProjects,
        updateCarousel,
        getCurrentPage: () => currentPage,
        setCurrentPage: (page) => { currentPage = page; }
    };
}
