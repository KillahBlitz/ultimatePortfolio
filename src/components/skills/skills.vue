<script setup>
import './skills.css';

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
    "bash": "https://img.icons8.com/color/96/bash.png",
    "oracle": "https://img.icons8.com/color/96/oracle-logo.png",
    "powerbi": "https://img.icons8.com/color/96/power-bi-2021.png",
    "excel": "https://img.icons8.com/color/96/microsoft-excel-2025.png",
    "pandas": "https://img.icons8.com/color/96/pandas.png"
}

</script>

<template>
    <section class="tecnologies-container">
        <div class="head-continer">
            <h1 class="title-text">Skills y Lenguajes</h1>
        </div>
        <div class="tecnologies-card">
            <div class="techs-container">
                <div class="techs-card">
                    <h2 class="tittle-tech">Frontend</h2>
                    <div class="techs-grid">
                        <img :src="techs['html']" alt="hTML" class="tech-icon" />
                        <img :src="techs['css']" alt="CSS" class="tech-icon" />
                        <img :src="techs['javascript']" alt="JavaScript" class="tech-icon" />
                    </div>
                </div>
                <div class="techs-card">
                    <h2 class="tittle-tech">Backend</h2>
                    <div class="techs-grid">
                        <img :src="techs['python']" alt="Python" class="tech-icon" />
                        <img :src="techs['csharp']" alt="C#" class="tech-icon" />
                        <!--<img :src="techs['java']" alt="Java" class="tech-icon" />-->
                        <img :src="techs['php']" alt="PHP" class="tech-icon" />
                    </div>
                </div>
                <div class="techs-card">
                    <h2 class="tittle-tech">Bases de Datos</h2>
                    <div class="techs-grid">
                        <img :src="techs['mongo']" alt="MongoDB" class="tech-icon" />
                        <img :src="techs['mysql']" alt="MySQL" class="tech-icon" />
                        <img :src="techs['postgres']" alt="PostgreSQL" class="tech-icon" />
                        <img :src="techs['oracle']" alt="Oracle" class="tech-icon" />
                        <img :src="techs['sqlserver']" alt="SQLserver" class="tech-icon" />
                        
                    </div>
                </div>
                <!-- <div class="techs-card">
                    <h2 class="tittle-tech">Cloud</h2>
                    <div class="techs-grid">
                        <img :src="techs['aws']" alt="AWS" class="tech-icon" />
                        <img :src="techs['azure']" alt="Azure" class="tech-icon" />
                    </div> 
                </div>--> 
                <div class="techs-card">
                    <h2 class="tittle-tech">Análisis y ETL</h2>
                    <div class="techs-grid">
                        <img :src="techs['powerbi']" alt="Power BI" class="tech-icon" />
                        <img :src="techs['excel']" alt="Excel" class="tech-icon" />
                        <img :src="techs['pandas']" alt="Pandas" class="tech-icon" />
                    </div>
                </div>
                <div class="techs-card">
                    <h2 class="tittle-tech">Herramientas de Desarrollo</h2>
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
        <h2 class="goals-title">Roadmap de especialización</h2>
        <p class="goals-description">
          Me encuentro en constante especialización técnica, evolucionando mi perfil hacia la ingeniería de datos y el diseño de arquitecturas en la nube. 
          Mi enfoque actual es el desarrollo de procesos ETL, la creación de pipelines eficientes y la implementación de soluciones de IA que optimicen el 
          procesamiento de información a gran escala.
        </p>
        <div class="techs-container">
            <div class="techs-card-future">
                <h2 class="tittle-tech">Sigo preparándome para dominar las tecnologías líderes en el ecosistema de datos.</h2>
                <div class="techs-grid">
                    <img src="/aboutMe/roadmap.png" alt="Roadmap" class="roadmap" />
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
</style>