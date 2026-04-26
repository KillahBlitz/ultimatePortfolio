<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

const techs = {
    "github": "https://img.icons8.com/color-glass/96/github--v1.png",
    "vue": "https://img.icons8.com/color/96/vue-js.png",
    "react": "https://img.icons8.com/plasticine/96/react.png",
    "astro": "https://img.icons8.com/nolan/96/astro.png",
    "html": "https://img.icons8.com/color/96/html-5--v1.png",
    "css": "https://img.icons8.com/color/96/css3.png",
    "javascript": "https://img.icons8.com/color/96/javascript--v1.png",
    "node": "https://img.icons8.com/fluency/96/node-js.png",
    "csharp": "https://img.icons8.com/color/96/c-sharp-logo-2.png",
    "cpp": "https://img.icons8.com/color/96/c-plus-plus-logo.png",
    "python": "https://img.icons8.com/color/96/python--v1.png",
    "nginx": "https://img.icons8.com/external-tal-revivo-green-tal-revivo/96/external-mongodb-a-cross-platform-document-oriented-database-program-logo-green-tal-revivo.png",
    "mongo": "https://img.icons8.com/color/96/mongodb.png",
    "php": "https://img.icons8.com/external-tal-revivo-color-tal-revivo/96/external-hypertext-preprocessor-a-widely-used-open-source-general-purpose-scripting-language-logo-color-tal-revivo.png",
    "java": "https://img.icons8.com/color/96/java-coffee-cup-logo--v1.png",
    "cassandra": "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/apache-cassandra.png",
    "dynamo": "https://icon.icepanel.io/AWS/svg/Database/DynamoDB.svg",
    "mysql": "https://img.icons8.com/color/96/mysql-logo.png",
    "postgres": "https://img.icons8.com/color/96/postgreesql.png",
    "sqlserver": "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/microsoft-sql-server-light.png",
    "azure": "https://img.icons8.com/fluency/96/azure-1.png",
    "aws": "https://img.icons8.com/color/96/amazon-web-services.png",
    "gcp": "https://img.icons8.com/color/96/google-cloud.png",
    "docker": "https://img.icons8.com/color/96/docker.png",
    "kubernetes": "https://img.icons8.com/color/96/kubernetes.png",
    "figma": "https://img.icons8.com/color/96/figma--v1.png",
    "adobe": "https://img.icons8.com/color/96/adobe-xd--v1.png",
    "canva": "https://img.icons8.com/fluency/96/canva.png",
    "typescript": "https://img.icons8.com/color/96/typescript.png",
    "unittest": "https://img.icons8.com/fluency/96/org-unit.png",
    "selenium": "https://img.icons8.com/stickers/96/selenium-test-automation.png",
    "kotlin": "https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/96/external-kotlin-a-cross-platform-statically-typed-general-purpose-programming-language-with-type-inference-logo-shadow-tal-revivo.png",
    "rust": "https://img.icons8.com/color/96/rust-programming-language.png",
    "go": "https://img.icons8.com/ios-filled/96/go-programming-language.png",
    "flutter": "https://img.icons8.com/color/96/flutter.png",
    "pytorch": "https://img.icons8.com/fluency/96/pytorch.png",
    "neural": "https://img.icons8.com/fluency/96/mind-map.png",
    "atlassian": "https://img.icons8.com/color/96/atlassian-confluence.png",
    "slack": "https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/96/external-slack-replace-email-text-messaging-and-instant-messaging-for-your-team-logo-shadow-tal-revivo.png",
    "vscode": "https://img.icons8.com/color/96/visual-studio-code-2019.png",
    "vs": "https://img.icons8.com/color/96/visual-studio--v1.png",
    "postman": "https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/96/external-postman-is-the-only-complete-api-development-environment-logo-shadow-tal-revivo.png",
    "bash": "https://img.icons8.com/color/96/bash.png"
}

</script>

<template>
    <section class="tecnologies-container">
        <div class="head-continer">
            <h1 class="title-text">Skills and Lenguages.</h1>
        </div>
        <div class="tecnologies-card">
            <div class="techs-container">
                <div class="techs-card">
                    <h2 class="tittle-tech">Frontend</h2>
                    <div class="techs-grid">
                        <img :src="techs['react']" alt="React" class="tech-icon" />
                        <img :src="techs['vue']" alt="Vue.js" class="tech-icon" />
                        <img :src="techs['astro']" alt="Astro" class="tech-icon" />
                        <img :src="techs['html']" alt="hTML" class="tech-icon" />
                        <img :src="techs['css']" alt="CSS" class="tech-icon" />
                        <img :src="techs['javascript']" alt="JavaScript" class="tech-icon" />
                    </div>
                </div>
                <div class="techs-card">
                    <h2 class="tittle-tech">Backend</h2>
                    <div class="techs-grid">
                        <img :src="techs['python']" alt="Python" class="tech-icon" />
                        <img :src="techs['node']" alt="NodeJS" class="tech-icon" />
                        <img :src="techs['csharp']" alt="C#" class="tech-icon" />
                        <!--<img :src="techs['java']" alt="Java" class="tech-icon" />-->
                        <!--<img :src="techs['php']" alt="PHP" class="tech-icon" />-->
                    </div>
                </div>
                <div class="techs-card">
                    <h2 class="tittle-tech">DataBase</h2>
                    <div class="techs-grid">
                        <img :src="techs['mongo']" alt="MongoDB" class="tech-icon" />
                        <img :src="techs['mysql']" alt="MySQL" class="tech-icon" />
                        <img :src="techs['postgres']" alt="PostgreSQL" class="tech-icon" />
                        <img :src="techs['sqlserver']" alt="SQLserver" class="tech-icon" />
                    </div>
                </div>
                <div class="techs-card">
                    <h2 class="tittle-tech">Cloud</h2>
                    <div class="techs-grid">
                        <img :src="techs['aws']" alt="AWS" class="tech-icon" />
                        <!--<img :src="techs['azure']" alt="Azure" class="tech-icon" />-->
                        <img :src="techs['gcp']" alt="Google Cloud Platform" class="tech-icon" />
                    </div>
                </div>
                <div class="techs-card">
                    <h2 class="tittle-tech">Infraestructure</h2>
                    <div class="techs-grid">
                        <img :src="techs['docker']" alt="Docker" class="tech-icon" />
                        <img :src="techs['kubernetes']" alt="Kubernetes" class="tech-icon" />
                        <img :src="techs['bash']" alt="bash" class="tech-icon" />
                    </div>
                </div>
                <div class="techs-card">
                    <h2 class="tittle-tech">DevTools</h2>
                    <div class="techs-grid">
                        <img :src="techs['github']" alt="GitHub Actions" class="tech-icon" />
                        <img :src="techs['atlassian']" alt="Confluence" class="tech-icon" />
                        <img :src="techs['slack']" alt="slack" class="tech-icon" />   
                        <img :src="techs['vscode']" alt="vscode" class="tech-icon" />                       
                        <img :src="techs['vs']" alt="vstudio" class="tech-icon" />
                        <img :src="techs['postman']" alt="postman" class="tech-icon" />
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="goals-container">
        <h2 class="goals-title">In Progress.</h2>
        <p class="goals-description">
            I am continuously strengthening my skills in various programming languages, 
            with a particular focus on mobile development and building artificial intelligence solutions.
        </p>
        <div class="techs-container">
            <div class="techs-card-future">
                <h2 class="tittle-tech">I keep preparing myself.</h2>
                <div class="techs-grid">
                    <img :src="techs['flutter']" alt="Flutter" class="tech-icon" />
                    <img :src="techs['kotlin']" alt="Kotlin" class="tech-icon" />
                    <img :src="techs['go']" alt="GO" class="tech-icon" />
                    <img :src="techs['rust']" alt="Rust" class="tech-icon" />
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>

.head-continer {
    margin-top: 20px;
    text-align: center;
    margin-bottom: 20px;
}

.tecnologies-card {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.title-text {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--primary-color);
    transition: font-size 0.3s ease;
}
.description {
    text-align: justify;
    font-size: 1.2rem;
    color: var(--text-color);
}
.title-text:hover{
    font-size: 2.6rem;
    transition: font-size 0.3s ease;
}
.title-text:active{
    font-size: 2.4rem;
    transition: font-size 0.3s ease;
}

.loading-text,
.error-text {
    font-size: 1.1rem;
    margin-top: 2rem;
    text-align: center;
    color: var(--text-color);
}
.error-text {
    color: #ff6b6b;
}
.techs-container {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
}
.techs-card {
    background: var(--card-background);
    border-radius: 8px;
    padding: 1.5rem;
    width: 350px;
    box-shadow: 0 2px 4px var(--shadow-color);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    align-items: center;
    text-align: center;
}
.techs-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px var(--shadow-color);
}
.tittle-tech {
    font-size: 1.4rem;
    margin-bottom: 1rem;
    color: var(--primary-color);
}
.tech-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
}
.tech-icon {
    width: 80px;
    height: 80px;
    object-fit: contain;
    transition: transform 0.3s ease, filter 0.3s ease;
    margin: 10px;
}
.tech-icon:hover {
    transform: scale(1.1);
    filter: brightness(1.2);
}
.goals-container {
    text-align: center;
    height: 80%;
}
.goals-title {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: var(--primary-color);
}
.goals-description {
    font-size: 1.5rem;
    color: var(--text-color);
    max-width: 800px;
    margin: 0 auto;
    text-align: justify;
    margin-bottom: 10px;
}
.techs-card-future {
    background: var(--card-background);
    border-radius: 8px;
    padding: 1.5rem;
    width: 1200px;
    box-shadow: 0 2px 4px var(--shadow-color);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    align-items: center;
    text-align: center;
}
.techs-card-future:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px var(--shadow-color);
}
</style>