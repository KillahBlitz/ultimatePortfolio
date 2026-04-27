<script setup>
import './certificates.css';
import { computed, ref } from 'vue';

const certificados = import.meta.glob('/public/certificates/certificado_*.png', { eager: true });
const numCertificados = computed(() => Object.keys(certificados).length);
const selectedCertificate = ref(null);

const openCertificate = (certificateNumber) => {
    selectedCertificate.value = certificateNumber;
};

const closeCertificate = () => {
    selectedCertificate.value = null;
};
</script>

<template>
    <div class="content">
        <content class="certificates">
            <h2>Licenses & Certifications</h2>
            <section class="licenses">
                <div class="licenses-box">
                    <h3>Licenses</h3>
                    <ul>
                        <li>
                            <a href="https://freecodecamp.org/certification/JacoboEmilianoMonroyCortines-0641/foundational-c-sharp-with-microsoft" target="_blank">
                                <img src="https://media.licdn.com/dms/image/v2/C4E0BAQGLKj3JHcof0w/company-logo_100_100/company-logo_100_100/0/1630639684997/free_code_camp_logo?e=1778716800&v=beta&t=PLSfV5h3VinjhL8THH2y3Lg7uSni0caOTlrn2H7U_ps" alt="FreeCodeCamp" />
                                <div class="text">
                                    <h5>FreeCodeCamp</h5>
                                    <h6>Foundational C sharp with Microsoft</h6> 
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.skills.google/public_profiles/21956ab4-f459-412c-8881-552a270ba8fd/badges/23671191" target="_blank">
                                <img src="https://media.licdn.com/dms/image/v2/D4E0BAQGv3cqOuUMY7g/company-logo_100_100/B4EZmhegXHGcAU-/0/1759350753990/google_logo?e=1778716800&v=beta&t=oyauLAhMKDwroENjxT3iSuFHhYNWyLar32I5PYYRS2g" alt="Google Skills" />
                                <div class="text">
                                    <h5>Google Skills</h5>
                                    <h6>Basic Fundamentals of DevOps in GCP</h6> 
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/learning/certificates/384a2f3391bbb1c3d13c810ded4e1b8f5185d41bd0dafd8dd966f08a63c97557" target="_blank">
                                <img src="https://media.licdn.com/dms/image/v2/D560BAQH32RJQCl3dDQ/company-logo_100_100/B56ZYQ0mrGGoAU-/0/1744038948046/microsoft_logo?e=1778716800&v=beta&t=yhCG_9tIy97plyj-EzhkTzFKeoOdfmz5Uc05X4kLbCs" alt="LinkedIn Learning" />
                                <div class="text">
                                    <h5>LinkedIn Learning</h5>
                                    <h6>Professional Foundations of Software Development</h6> 
                                </div>                                
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
            <section class="certifications">
                <div class="certifications-box">
                    <h3>Certificates</h3>
                    <div class="carousel-container">
                        <div class="certificate-box">
                            <img 
                                v-for="i in numCertificados" 
                                :key="i"
                                :src="`/certificates/certificado_${i}.png`" 
                                :alt="`Certificado ${i}`"
                                @click="openCertificate(i)"
                            />
                        </div>
                    </div>
                </div>
            </section>
            
            <!-- Modal para ver certificado en grande -->
            <div v-if="selectedCertificate" class="certificate-modal" @click="closeCertificate">
                <div class="certificate-modal-content" @click.stop>
                    <button class="certificate-modal-close" @click="closeCertificate">×</button>
                    <img 
                        :src="`/certificates/certificado_${selectedCertificate}.png`" 
                        :alt="`Certificado ${selectedCertificate}`"
                    />
                </div>
            </div>
            <section class="viewer">
                  <div class="cta-section">
                        <p class="cta-text">
                        If you want to see all my certifications and download my CV, you can click the buttons below.
                        </p>
                        <div class="cta-buttons">
                            <a href="https://drive.google.com/drive/folders/17wNozNMjEvSuC0H97HyaA2DuIXbwQHLE?usp=sharing" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                class="cta-button primary">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>
                                </svg>
                                View All Certificates
                            </a>
                            <a href="/CV/CV_JACOBO_MONROY_C.pdf" 
                                download 
                                class="cta-button secondary">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                <polyline points="7 10 12 15 17 10"/>
                                <line x1="12" y1="15" x2="12" y2="3"/>
                                </svg>
                                Download My CV
                            </a>
                        </div>
                    </div>
            </section>
        </content>
    </div>
</template>

<style scoped>
</style>