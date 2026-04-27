<script setup>
import router from '@/router/routes';
import SwitchToggle from './switch.vue';
import { ref } from 'vue';

const menuOpen = ref(false);

const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
};

const closeMenu = () => {
    menuOpen.value = false;
};

const navigateTo = (hash) => {
    router.push({ hash }).then(() => {
        closeMenu();
    });
};
</script>

<template>
    <div class="background">
        <div class="right-center">
            <a href="#about">
                <div class="button-style-1">
                    <h3>Sobre mí</h3>
                </div>
            </a>
            <a href="#experience">
                <div class="button-style-1">
                    <h3>Experiencia</h3>
                </div>
            </a>
            <a href="#skills">
                <div class="button-style-1">
                    <h3>Skills</h3>
                </div>
            </a>
            <a href="#projects">
                <div class="button-style-1">
                    <h3>Proyectos</h3>
                </div>
            </a>
            <a href="#certificates">
                <div class="button-style-1">
                    <h3>Certificados</h3>
                </div>
            </a>
            <a href="https://github.com/KapauCastle" target="_blank">
                <div class="button-style-2">
                    <img src="/icons/logo_gh.png"/>
                </div>
            </a>
            <a href="https://www.linkedin.com/in/karen-paulina-blanco-castillo-65882419b" target="_blank">
                <div class="button-style-2">
                        <img src="/icons/logo_ln.png"/>
                </div>
            </a>
            <a href="/CV/CV_Blanco_C._Karen_P..pdf" download class="icon-link">
                <div class="button-style-2">
                        <img src="/icons/logo_pf.png"/>
                </div>
            </a>
        </div>
        <div class="left-separation">
            <a href="#contact">
                <div class="button-style-3">
                    <h3>Contacto</h3>
                </div>        
            </a>
            <div class="separator"></div>
            <SwitchToggle />
            <div class="hamburger-menu" @click="toggleMenu">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div v-if="menuOpen" class="mobile-menu">
            <a href="#about" @click="closeMenu">
                <div class="menu-item">
                    <h3>Sobre mí</h3>
                </div>
            </a>
            <a href="#experience" @click="closeMenu">
                <div class="menu-item">
                    <h3>Experiencia</h3>
                </div>
            </a>
            <a href="#skills" @click="closeMenu">
                <div class="menu-item">
                    <h3>Skills</h3>
                </div>
            </a>
            <a href="#projects" @click="closeMenu">
                <div class="menu-item">
                    <h3>Proyectos</h3>
                </div>
            </a>
            <a href="#certificates" @click="closeMenu">
                <div class="menu-item">
                    <h3>Certificados</h3>
                </div>
            </a>
            <router-link to="/contact" @click="closeMenu">
                <div class="menu-item contact-item">
                    <h3>Contacto</h3>
                </div>        
            </router-link>
        </div>
    </div>
</template>

<style scoped>

a {
    text-decoration: none;
    color: inherit;
}

img {
    transition: filter 0.3s ease;
}

.dark-mode .button-style-2 img {
    filter: invert(1);
}

.background {
    background: transparent;
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(3px);
    width: 85%;
    box-sizing: border-box;
    position: fixed;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    border: 1px solid color-mix(in srgb, var(--primary-color) 35%, transparent);
    border-radius: 999px;
    box-shadow: 
        0 10px 28px -18px var(--shadow-color),
        0 0 14px var(--shadow-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
}

.right-center {
    display: flex;
    align-items: center;
    gap: 5px;
}

.button-style-1, .button-style-2, .button-style-3 {
    cursor: pointer;
    display: inline-block;
    margin: 5px;
    padding: 10px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    vertical-align: middle;
}

.button-style-1 {
    transition: transform 0.15s ease;
    background-color: var(--primary-color);
    color: var(--background-color);
    font-size: 15px;
    padding-bottom: 3px;
    padding-top: 3px;
    box-shadow: 0 5px var(--shadow-color);
    transition: all 0.1s ease;
}

.button-style-1:hover {
    background-color: var(--background-color);
    color: var(--primary-color);
    border-color: var(--primary-color);
}

.button-style-1:active {
    transform: scale(0.85);
    transform: translateY(4px);
    box-shadow: 0 1px var(--shadow-color);
}

.button-style-2 {
    margin-top: 10px;
}

.separator {
    display: inline-block;
    width: 1px;
    height: 30px;
    background-color: var(--primary-color);
    margin: 0;
    vertical-align: middle;
}

.button-style-2 img{
    width: 28px;
    height: 28px;
    transition: all 0.3s ease;
}

.button-style-2 img:hover {
    transform: scale(1.2);
    filter: invert(0) drop-shadow(0 0 10px var(--primary-color));
}

.dark-mode .button-style-2 img:hover {
    filter: invert(1) drop-shadow(0 0 10px var(--primary-color));
}

.left-separation {
    display: flex;
    align-items: center;
    gap: 10px;
}

.button-style-3 {
    background-color: transparent;
    color: var(--primary-color);
    font-size: 16px;
    padding-bottom: 5px;
    padding-top: 5px;
    border: 1px solid var(--primary-color);
    transition: all 0.1s ease;
}

.button-style-3:hover {
    background-color: var(--primary-color);
    color: var(--background-color);
}

.button-style-3:active {
    transform: scale(0.85);

}

.hamburger-menu {
    display: none;
    flex-direction: column;
    cursor: pointer;
    gap: 6px;
    padding: 5px;
}

.hamburger-menu span {
    display: block;
    width: 25px;
    height: 3px;
    background-color: var(--primary-color);
    border-radius: 2px;
    transition: all 0.3s ease;
}

.hamburger-menu:hover span {
    background-color: var(--primary-color);
    filter: brightness(1.2);
}

.mobile-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: color-mix(in srgb, var(--shadow-color) 85%, transparent);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 20px 0;
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    animation: slideDown 0.3s ease;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.menu-item {
    padding: 12px 25px;
    color: var(--background-color);
    cursor: pointer;
    transition: all 0.3s ease;
    border-left: 3px solid transparent;
}

.menu-item:hover {
    background-color: color-mix(in srgb, var(--primary-color) 50%, transparent);
    border-left-color: var(--background-color);
    padding-left: 30px;
}

.menu-item h3 {
    margin: 0;
    font-size: 14px;
}

.contact-item {
    border-top: 1px solid color-mix(in srgb, var(--background-color) 30%, transparent);
}

/* responsive design */
@media (max-width: 768px) {
    .background {
        width: 90%;
        padding: 0 10px;
    }

    .button-style-1 {
        display: none;
    }

    .button-style-3 {
        display: none;
    }

    .button-style-2 {
        margin: 0;
    }

    .separator {
        display: none;
    }

    .hamburger-menu {
        display: flex;
    }

}
</style>