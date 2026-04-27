<script setup>
import './aboutMe.css';
</script>

<template>
    <div class="content">
        <content class="about-me-container">
            <section class="image-space">
                <div class="image-container">
                    <img src="/aboutMe/profile.jpeg" alt="Profile Picture" class="profile-image" />
                </div>
            </section>
            <section class="presentation-content">
                <h2>Sobre mí...</h2>
                <h1>Paulina Castillo</h1>
                <h2>Ingeniera en Computación | Data Specialist</h2>
            </section>
            <section class="description-container">
                <p>
                Próxima a egresar de la carrera de Ingeniería en Computación, con una trayectoria técnica centrada en el manejo de datos.
                Cuento con experiencia previa como Administradora de Datos y en Aseguramiento de Calidad (QA).
                </p>
                <br>
                <p>
                   Actualmente, enfoco mi perfil hacia la Ingeniería, Ciencia y Análisis de Datos. Mi objetivo es diseñar arquitecturas escalables
                    y automatizar procesos que transformen grandes volúmenes de información en conocimiento estratégico. Me apasiona aplicar mis 
                    conocimientos técnicos para construir soluciones innovadoras que optimicen la toma de decisiones y el procesamiento de datos a
                     gran escala.
                </p>

            </section>
            <section class="buttons-container">
                <div class="image-button">
                    <a href="https://github.com/KapauCastle" target="_blank">
                        <img src="/icons/logo_gh.png" alt="GitHub Logo" class="button-color"/>
                    </a>
                </div>
                <div class="image-button">
                    <a href="https://www.linkedin.com/in/karen-paulina-blanco-castillo-65882419b" target="_blank">
                        <img src="/icons/logo_ln.png" alt="LinkedIn Logo" class="button-color"/>
                    </a>
                </div>
                <div class="image-button">
                    <a href="/CV/CV_Blanco_C._Karen_P..pdf" download class="icon-link">
                        <img src="/icons/logo_pf.png" alt="Portfolio Logo" class="button-color"/>
                    </a>
                </div>
            </section>
        </content>
    </div>
</template>

<style scoped>
</style>