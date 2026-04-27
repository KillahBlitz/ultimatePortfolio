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
                <h2>About Me...</h2>
                <h1>Paulina Blanco</h1>
                <h2>Computer Engineering and Jr FullStack Developer</h2>
            </section>
            <section class="description-container">
                <p>
                    I am a Computer Engineering student, currently in the final stage of my academic program, 
                    with approximately six months remaining until graduation.
                </p>
                <p>
                    I have experience in backend development and knowledge of frontend technologies, 
                    as well as cloud architectures and the use of Machine Learning and LLM models. 
                    I adapt quickly to different technologies and architectures, with a strong focus on continuous learning and programming.
                </p>

            </section>
            <section class="buttons-container">
                <div class="image-button">
                    <a href="https://github.com/KillahBlitz" target="_blank">
                        <img src="/icons/logo_gh.png" alt="GitHub Logo" class="button-color"/>
                    </a>
                </div>
                <div class="image-button">
                    <a href="https://www.linkedin.com/in/monroy-jacobo" target="_blank">
                        <img src="/icons/logo_ln.png" alt="LinkedIn Logo" class="button-color"/>
                    </a>
                </div>
                <div class="image-button">
                    <a href="/CV/CV_JACOBO_MONROY_C.pdf" download class="icon-link">
                        <img src="/icons/logo_pf.png" alt="Portfolio Logo" class="button-color"/>
                    </a>
                </div>
            </section>
        </content>
    </div>
</template>

<style scoped>
</style>