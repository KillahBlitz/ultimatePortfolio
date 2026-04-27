<script setup>
import './experience.css';
import { ref } from 'vue';

const activeEducationIndex = ref(null);
const activeExperienceIndex = ref(null);

const educationItems = [
    
    {
        image: '/education/udemy.png',
        title: 'Udemy',
        subtitle: 'Plataforma de Aprendizaje en Línea',
        date: 'Nov 2025 - Presente',
        description: 'Enfoque en ingeniería de datos, optimización de bases de datos relacionales y no relacionales, y arquitecturas modernas de nube.'
    },
    {
        image: '/education/esime.jpg',
        title: 'Instituto Politécnico Nacional',
        subtitle: 'Escuela Superior de Ingeniería Mecánica y Eléctrica Unidad Culhuacán',
        date: 'Ago 2019 - Jul 2026',
        description: 'Ingeniera en Computación (Próxima a egresar).'
    },
    {
        image: '/education/cet1.jpg',
        title: 'Instituto Politécnico Nacional',
        subtitle: 'Centro de Estudios Tecnológicos No. 1 “Walter Cross Buchanan”',
        date: 'Ago 2016 - Jun 2018',
        description: 'Técnico en Redes de Cómputo.'
    }
];

const experienceItems = [
  
    {
        image: '/professional_info/consultorio.jpg',
        title: 'Clínica Médica Reynoso',
        position: 'Aplicación de Escritorio',
        dates: 'Dic 2025 - Ene 2026',
        responsibilities: [
            'Desarrollo de una aplicación de escritorio para Windows utilizando WPF con XAML y C#, gestionando el almacenamiento de datos de pacientes y el control de sus consultas.'
        ]
    },
    {
        image: '/professional_info/liberty.jpg',
        title: 'Liberty Fianzas',
        position: 'Becaria de Datos y QA',
        dates: 'Sep 2024 - Sep 2025',
        responsibilities: [
            'Aseguramiento de Calidad (QA): Ejecución de pruebas integrales en módulos operativos, validando la correcta persistencia de datos y el cumplimiento de la lógica de negocio.',
            'Gestión de Base de Datos: Desarrollo de funciones y procedimientos para la gestión de catálogos, optimizando la lógica de almacenamiento y la integridad de los datos en el sistema financiero.'
        ]
    }
];

const toggleEducation = (index) => {
    activeEducationIndex.value = activeEducationIndex.value === index ? null : index;
};

const toggleExperience = (index) => {
    activeExperienceIndex.value = activeExperienceIndex.value === index ? null : index;
};
</script>

<template>
    <div class="content">
        <content class="lg-box">
            <section class="title">
                <h2>Experiencia Profesional</h2>
            </section>
            <section class="experience-box">
                <div class="timeline">
                    <div 
                        v-for="(item, index) in experienceItems" 
                        :key="index"
                        class="timeline-item"
                        :class="{ active: activeExperienceIndex === index }"
                    >
                        <div class="timeline-marker" @click="toggleExperience(index)">
                            <img :src="item.image" :alt="item.title" class="timeline-icon"/>
                        </div>
                        <div class="timeline-content" @click="toggleExperience(index)">
                            <div v-show="activeExperienceIndex !== index" class="hidden-content">
                                <h3>{{ item.title }}</h3>
                                <p class="position">{{ item.position }}</p>
                                <p class="dates">{{ item.dates }}</p>
                            </div>
                            <div v-show="activeExperienceIndex === index" class="visible-content">
                                <h3>{{ item.title }}</h3>
                                <p class="position">{{ item.position }}</p>
                                <p class="dates">{{ item.dates }}</p>
                                <ul class="responsibilities">
                                    <li v-for="(resp, i) in item.responsibilities" :key="i">
                                        {{ resp }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="title">
                <h2>Educación y Aprendizaje</h2>
            </section>
            <section class="education-box">
                <div 
                    v-for="(item, index) in educationItems" 
                    :key="index"
                    class="education-item"
                    :class="{ active: activeEducationIndex === index }"
                    @click="toggleEducation(index)"
                >
                    <img :src="item.image" :alt="item.title" class="icon"/>
                    <div v-show="activeEducationIndex !== index" class="hidden-content">
                        <h2>{{ item.title }}</h2>
                        <h3>{{ item.subtitle }}</h3>
                        <h4>{{ item.date }}</h4>
                        <p>{{ item.description }}</p>
                    </div>
                    <div v-show="activeEducationIndex === index" class="visible-content">
                        <h2>{{ item.title }}</h2>
                        <h3>{{ item.subtitle }}</h3>
                        <h4>{{ item.date }}</h4>
                        <p>{{ item.description }}</p>
                    </div>
                </div>
            </section>
        </content>
    </div>
</template>

<style scoped>
</style>