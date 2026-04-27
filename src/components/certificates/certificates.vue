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
            <h2>Certificados</h2>
            <section class="certifications">
                <div class="certifications-box">
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
                        Si quieres ver todos mis certificados y descargar mi CV, puedes hacer clic en los botones de abajo.
                        </p>
                        <div class="cta-buttons">
                            <a href="https://drive.google.com/drive/folders/1uFcN0-vwGlwW00cyJnPZxX8cC2chlM2C?usp=sharing" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                class="cta-button primary">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>
                                </svg>
                                View All Certificates
                            </a>
                            <a href="/CV/CV_Blanco_C._Karen_P..pdf" 
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