<script setup>
import './experience.css';
import { ref } from 'vue';

const activeEducationIndex = ref(null);
const activeExperienceIndex = ref(null);

const educationItems = [
    {
        image: '/education/esime.jpg',
        title: 'National Polytechnic Institute',
        subtitle: 'Higher School of Mechanical and Electrical Engineering: Culhuacán Unit.',
        date: 'Juan 2022 - Dec 2026',
        description: 'Computer Engineering student focused on software development and modern technologies.'
    },
    {
        image: '/education/udemy.png',
        title: 'Udemy',
        subtitle: 'Online Learning Platform.',
        date: 'March 2023 - Present',
        description: 'Focused on web development, modern frameworks, and backend technologies.'
    },
    {
        image: '/education/microsoftlearn.png',
        title: 'Microsoft Learn',
        subtitle: 'Online Learning Platform.',
        date: 'April 2025 - Present',
        description: 'Learning cloud technologies, Azure services, and modern development practices.'
    }
];

const experienceItems = [
    {
        image: '/professional_info/picaio.jpg',
        title: 'Picaio.',
        position: 'Jr Backend Engineer.',
        dates: 'Aug 2025 - Present',
        responsibilities: [
            'I performed maintenance on legacy code regarding data reconciliation, working with microservices in Python with CI/CD, working with standard software workflow and KANBAN.',
            'I worked with LLM models for data extraction using text inferred from machine learning, using schemas in JSON.'
        ]
    },
    {
        image: '/professional_info/consultorio.jpg',
        title: 'Reynoso Medical Clinic.',
        position: 'Desktop App developer.',
        dates: 'Dec 2025 - Jan 2026',
        responsibilities: [
            'I created a Windows desktop application using WPF with XAML and C#. It managed patient data and the consultations they had attended.'
        ]
    },
    {
        image: '/professional_info/huvytas.jpg',
        title: 'Huvytas Ecommerce.',
        position: 'Fullstack Developer.',
        dates: 'July 2025 - Aug 2025',
        responsibilities: [
            'With a development team, we created a payment page with an initial product, providing visual development, business logic, and data storage.',
            'Develop a microservices architecture, develop frontend with Vue and backend with Python with deployments on AWS Amplify, AWS Lambda, DynamoDB and AWS Apigateway.'
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
                <h2>Professional Experience</h2>
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
                <h2>Education & Learning</h2>
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