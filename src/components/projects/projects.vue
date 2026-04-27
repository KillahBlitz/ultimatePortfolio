<script setup>
import { ref, computed, onMounted } from 'vue';
import './projects.css';
import { setupCarousel } from './projects.js';

const currentPage = ref(0);
const itemsPerPage = 1;
const carousel = setupCarousel();
const window = globalThis.window;

const catalog = {
    "github": "https://img.icons8.com/color-glass/96/github--v1.png",
    "web": "https://img.icons8.com/external-smashingstocks-flat-smashing-stocks/66/external-Web-shopping-and-commerce-smashingstocks-flat-smashing-stocks.png",
    "vue": "https://img.icons8.com/color/96/vue-js.png",
    "react": "https://img.icons8.com/plasticine/96/react.png",
    "astro": "https://img.icons8.com/nolan/96/astro.png",
    "html": "https://img.icons8.com/color/96/html-5--v1.png",
    "css": "https://img.icons8.com/color/96/css3.png",
    "javascript": "https://img.icons8.com/color/96/javascript--v1.png",
    "node": "https://img.icons8.com/fluency/96/node-js.png",
    "csharp": "https://img.icons8.com/color/96/c-sharp-logo-2.png",
    "python": "https://img.icons8.com/color/96/python--v1.png",
    "nginx": "https://img.icons8.com/color/96/nginx.png",
    "mongo": "https://img.icons8.com/color/96/mongodb.png",
    "php": "https://img.icons8.com/external-tal-revivo-color-tal-revivo/96/external-hypertext-preprocessor-a-widely-used-open-source-general-purpose-scripting-language-logo-color-tal-revivo.png",
    "java": "https://img.icons8.com/color/96/java-coffee-cup-logo--v1.png",
    "mysql": "https://img.icons8.com/color/96/mysql-logo.png",
    "postgres": "https://img.icons8.com/color/96/postgreesql.png",
    "sqlserver": "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/microsoft-sql-server-light.png",
    "azure": "https://img.icons8.com/fluency/96/azure-1.png",
    "aws": "https://img.icons8.com/color/96/amazon-web-services.png",
    "typescript": "https://img.icons8.com/color/96/typescript.png",
    "selenium": "https://img.icons8.com/stickers/96/selenium-test-automation.png",
    "bash": "https://img.icons8.com/color/96/bash.png",
    "fedora": "https://img.icons8.com/fluency/96/fedora.png",
    "dotnet": "https://img.icons8.com/color/48/net-framework.png",
    "fastapi": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
    "linux": "https://img.icons8.com/color/96/linux--v1.png",
    "pyqt": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/qt/qt-original.svg",
    "bootstrap": "https://img.icons8.com/color/96/bootstrap.png",
    "flask": "https://img.icons8.com/color/96/flask.png",
    "angular": "https://img.icons8.com/color/96/angularjs.png",
    "matplotlib": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg",
    "numpy": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
    "pandas": "https://img.icons8.com/color/96/pandas.png",
    "tkinter": "https://th.bing.com/th/id/R.fea059819097889534de5de25f997904?rik=xs4vIgG9sTKK7A&riu=http%3a%2f%2fpascal.ortiz.free.fr%2f_images%2flogo_tkinter.png&ehk=YlB8iCgCgvV8n5FmURuzu9gWZ0RAM7tHUVG3UvQ0a2M%3d&risl=&pid=ImgRaw&r=0",
    "reactrouter": "https://www.svgrepo.com/show/354262/react-router.svg",
    "reactbootstrap": "https://shapebootstrap.net/wp-content/uploads/2023/06/image-5.jpeg",
    "sass": "https://img.icons8.com/color/96/sass.png",
    "semanticui": "https://react.semantic-ui.com/logo.png",
    "svelte": "https://img.icons8.com/doodle/96/svetle.png"
}

const projects = [
    {
        id: '1',
        title: 'Educational C# Compiler (.NET)',
        description: 'A simple compiler built with .NET that demonstrates the core phases of compilation, including lexical analysis, parsing, and intermediate code generation. Designed as an educational project to illustrate how modern compilers work internally.',
        image: '/projects/csharp_compiler.png',
        github: 'https://github.com/KillahBlitz/compiler-v4.02',
        website: '',
        tecnologies: ['csharp', 'dotnet']
    },
    {
        id: '2',
        title: 'Student Management Web Platform',
        description: 'Full-stack academic management system designed to manage students and their grades. Built with ASP.NET Core and React, the platform allows administrators to create accounts, manage academic records, and organize student data efficiently.',
        image: '/projects/csharp_institute_app.png',
        github: 'https://github.com/KillahBlitz/school-web-aspdotnet-react',
        website: '',
        tecnologies: ['csharp', 'dotnet', 'react', 'html', 'css', 'javascript', 'sqlserver']
    },
    {
        id: '3',
        title: 'Local WiFi Security Vulnerability Simulation',
        description: 'Educational cybersecurity project that demonstrates how a rogue WiFi access point attack works. It simulates a fake network, captures connected device IP addresses, redirects HTTP requests to a malicious page, and illustrates how attackers might deploy payloads to open an SSH port for research and educational purposes.',
        image: '/projects/vue_project_so.png',
        github: 'https://github.com/KillahBlitz/proyetoSO',
        website: '',
        tecnologies: ['python', 'fastapi', 'nginx', 'bash', 'vue', 'fedora', 'linux']
    },
    {
        id: '4',
        title: 'Simple Task Manager (FastAPI + Vue)',
        description: 'Lightweight task management application where tasks are stored in the host memory. The backend API is built with FastAPI while Vue handles the interactive user interface.',
        image: '/projects/vue_task_todo.png',
        github: 'https://github.com/KillahBlitz/task-todo-vue-fastapi',
        website: '',
        tecnologies: ['python', 'fastapi', 'vue', 'css']
    },
    {
        id: '5',
        title: 'Data Analysis and Visualization Dashboard',
        description: 'desktop application with Python and PyQt to analyze data of the rise of bitcoin and the Mexican peso',
        image: '/projects/python_data_analyst_csv.png',
        github: 'https://github.com/KillahBlitz/data-analyzer-python-pandas',
        website: '',
        tecnologies: ['python', 'pyqt', 'pandas', 'matplotlib', 'numpy']
    },
    {
        id: '6',
        title: 'Flask Academy Management System',
        description: 'Academic platform built with Flask and MySQL providing a REST API for managing educational records. The frontend uses vanilla JavaScript to display academic data.',
        image: '/projects/python_flask_academy.png',
        github: 'https://github.com/KillahBlitz/flask-academy',
        website: '',
        tecnologies: ['python', 'flask', 'mysql', 'html', 'css', 'bootstrap']
    },
    {
        id: '7',
        title: 'Human Resources Management Platform',
        description: 'Full-stack HR management system built with Angular and a Flask API connected to MySQL. The platform allows companies to register employees, track positions, and manage salaries.',
        image: '/projects/python_human_resources.png',
        github: 'https://github.com/KillahBlitz/human-resources-web',
        website: '',
        tecnologies: ['python', 'flask', 'mysql', 'angular', 'html', 'css', 'javascript', 'bootstrap']
    },
    {
        id: '8',
        title: 'Zona Fit Gym Desktop Application',
        description: 'Desktop application developed with Python and Tkinter for managing gym memberships. It allows administrators to register new users and store information in a MySQL database.',
        image: '/projects/python_zona_fit_app.png',
        github: 'https://github.com/KillahBlitz/zona-fit-app',
        website: '',
        tecnologies: ['python', 'tkinter', 'mysql']
    },
    {
        id: '9',
        title: 'Dynamic Form Builder with React',
        description: 'Interactive dynamic form system where each answer determines the next question shown to the user. Built using React to demonstrate conditional rendering and dynamic form generation.',
        image: '/projects/react_dynamic_platform.png',
        github: 'https://github.com/KillahBlitz/form-dinamic-react',
        website: '',
        tecnologies: ['react', 'reactbootstrap', 'html', 'css', 'javascript']
    },
    {
        id: '10',
        title: 'Marvel API',
        description: 'Application created with React, react-router and sass to make a request an external API of marvel',
        image: '/projects/react_marvel.png',
        github: 'https://github.com/KillahBlitz/marvel-app-react',
        website: '',
        tecnologies: ['react', 'reactrouter', 'sass', 'semanticui']
    },
    {
        id: '11',
        title: 'Rick and Morty API',
        description: 'Application created with React css to make a request an external API of rick and morty',
        image: '/projects/react_rick_and_morty.png',
        github: 'https://github.com/KillahBlitz/rick-morty-api-react',
        website: '',
        tecnologies: ['react', 'css']
    },
    {
        id: '12',
        title: 'Task ToDo React',
        description: 'Task management application built with React that allows users to categorize tasks. Data is stored directly in the browser without requiring a backend API.',
        image: '/projects/react_task_todo.png',
        github: 'https://github.com/KillahBlitz/form-dinamic-react',
        website: 'https://fanciful-pegasus-9f10c1.netlify.app/',
        tecnologies: ['react', 'semanticui']
    },
    {
        id: '13',
        title: 'GitHub User Statistics Dashboard',
        description: 'Web application that retrieves and displays GitHub user statistics using the public GitHub API. Built entirely with vanilla JavaScript, HTML, and CSS to demonstrate API consumption and dynamic data visualization.',
        image: '/projects/html_github_page.png',
        github: 'https://github.com/KillahBlitz/api-github-page',
        website: 'https://projectescv.netlify.app/',
        tecnologies: ['html', 'css', 'javascript']
    },
    {
        id: '14',
        title: 'OpenAI Playground with Astro',
        description: 'Interactive web application that allows users to submit prompts and receive responses from OpenAI in the form of generated text or images. Built with the Astro framework and Svelte to explore modern frontend architecture for AI-powered interfaces.',
        image: '/projects/astro_openai_web.png',
        github: 'https://github.com/KillahBlitz/openai-with-astro',
        website: '',
        tecnologies: ['astro', 'svelte', 'html', 'css', 'javascript']
    },
    {
        id: '15',
        title: 'Movie Carousel with Astro and React',
        description: 'Frontend project that implements a movie carousel using the Astro framework with React components. The application fetches movie data from an external API to display a dynamic movie showcase.',
        image: '/projects/astro_movies.png',
        github: 'https://github.com/KillahBlitz/astro-react-movies',
        website: '',
        tecnologies: ['astro', 'react', 'html', 'css', 'javascript']
    },
]

const totalPages = computed(() => Math.ceil(projects.length / itemsPerPage));

const paginatedProjects = computed(() => {
    const start = currentPage.value * itemsPerPage;
    const end = start + itemsPerPage;
    return projects.slice(start, end);
});

const goToPrevious = () => {
    if (currentPage.value > 0) {
        currentPage.value--;
    }
};

const goToNext = () => {
    if (currentPage.value < totalPages.value - 1) {
        currentPage.value++;
    }
};

const goToPage = (page) => {
    if (page >= 0 && page < totalPages.value) {
        currentPage.value = page;
    }
};

const isPrevDisabled = computed(() => currentPage.value === 0);
const isNextDisabled = computed(() => currentPage.value === totalPages.value - 1);
</script>

<template>
    <div class="projects-container">
        <h2>Projects</h2>
        <div class="projects-grid">
            <template v-for="project in projects" :key="project.id">
                <div class="project-card" v-show="window.innerWidth > 480">
                    <img :src="project.image" :alt="project.title" class="project-image" />
                    <h3>{{ project.title }}</h3>
                    <p>{{ project.description }}</p>
                    <div class="tecnologies">
                        <img v-for="tech in project.tecnologies" :key="tech" :src="catalog[tech]" :alt="tech" class="tech-icon-projects" />
                    </div>
                    <div class="links">
                        <a v-if="project.github" :href="project.github" target="_blank">
                            <img :src="catalog.github" alt="GitHub" class="link-icon" />
                        </a>
                        <a v-if="project.website" :href="project.website" target="_blank">
                            <img :src="catalog.web" alt="Live Demo" class="link-icon" />
                        </a>
                    </div>
                </div>
            </template>

            <div v-show="window.innerWidth <= 480" class="carousel-wrapper">
                <div class="carousel-viewport">
                    <div class="carousel-container">
                        <div v-for="project in paginatedProjects" :key="project.id" class="project-card">
                            <img :src="project.image" :alt="project.title" class="project-image" />
                            <h3>{{ project.title }}</h3>
                            <p>{{ project.description }}</p>
                            <div class="tecnologies">
                                <img v-for="tech in project.tecnologies" :key="tech" :src="catalog[tech]" :alt="tech" class="tech-icon-projects" />
                            </div>
                            <div class="links">
                                <a v-if="project.github" :href="project.github" target="_blank">
                                    <img :src="catalog.github" alt="GitHub" class="link-icon" />
                                </a>
                                <a v-if="project.website" :href="project.website" target="_blank">
                                    <img :src="catalog.web" alt="Live Demo" class="link-icon" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-show="window.innerWidth <= 480" class="carousel-buttons-mobile">
                <button 
                    class="carousel-button prev" 
                    @click="goToPrevious"
                    :disabled="isPrevDisabled"
                    aria-label="Proyecto anterior"
                >
                    ❮
                </button>

                <div style="flex: 1;"></div>

                <button 
                    class="carousel-button next" 
                    @click="goToNext"
                    :disabled="isNextDisabled"
                    aria-label="Próximo proyecto"
                >
                    ❯
                </button>
            </div>

            <div v-show="window.innerWidth <= 480" class="carousel-indicator">
                <div 
                    v-for="(_, index) in totalPages" 
                    :key="index"
                    class="indicator-dot"
                    :class="{ active: index === currentPage }"
                    @click="goToPage(index)"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>