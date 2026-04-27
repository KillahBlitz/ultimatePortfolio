<script setup>
import './contact.css';
import { useContactForm } from './contact.js';

const {
  contactInfo,
  form,
  isLoading,
  modalState,
  formData,
  errors,
  handleSubmit,
  handleNameInput,
  handleEmailInput,
  handlePhoneInput,
  handleMessageInput,
  closeModal
} = useContactForm();
</script>

<template>
  <section id="contact-section" class="contact-root">
    <div class="banner-contact">
      <h1 id="contact-title">¿Te interesa mi perfil?</h1>
      <h2>Contáctame y platiquemos sobre cómo puedo integrarme a tu equipo.</h2>
    </div>

    <div class="contact-container">
      <div class="contact-content">
        <aside class="contact-info">
          <div class="info-box">
            <div class="info-icon">📧</div>
            <div>
              <h4>Correo electrónico</h4>
              <p class="muted">{{ contactInfo.email }}</p>
            </div>
          </div>

          <div class="info-box">
            <div class="info-icon">📞</div>
            <div>
              <h4>Número de teléfono</h4>
              <p class="muted phone-number">{{ contactInfo.phone }}</p>
            </div>
          </div>

          <div class="info-box">
            <div class="info-icon">📍</div>
            <div>
              <h4>Ubicación</h4>
              <p class="muted">{{ contactInfo.location }}</p>
            </div>
          </div>
        </aside>

        <form ref="form" class="contact-form" @submit.prevent="handleSubmit">
          <h3>Enviame un mensaje</h3>

          <div class="form-grid">
            <div>
              <input
                v-model="formData.name"
                type="text"
                name="name"
                required
                placeholder="Nombre *"
                maxlength="40"
                autocomplete="name"
                :class="{ 'input-error': errors.name }"
                @input="handleNameInput"
              />
              <p class="field-error">{{ errors.name }}</p>
            </div>

            <div>
              <input
                v-model="formData.email"
                type="email"
                name="email"
                required
                placeholder="Correo electrónico *"
                maxlength="50"
                autocomplete="email"
                :class="{ 'input-error': errors.email }"
                @input="handleEmailInput"
              />
              <p class="field-error">{{ errors.email }}</p>
            </div>

            <div>
              <input
                v-model="formData.phone"
                type="tel"
                name="phone"
                placeholder="Número de teléfono"
                maxlength="15"
                autocomplete="tel"
                :class="{ 'input-error': errors.phone }"
                @input="handlePhoneInput"
              />
              <p class="field-error">{{ errors.phone }}</p>
            </div>

            <div>
              <input
                v-model="formData.company"
                type="text"
                name="company"
                placeholder="Empresa"
                maxlength="60"
                autocomplete="organization"
              />
            </div>
          </div>

          <textarea
            v-model="formData.message"
            name="message"
            rows="6"
            required
            placeholder="¿Tienes alguna duda o propuesta? Déjala aquí y me pondré en contacto contigo."
            :class="{ 'input-error': errors.message }"
            @input="handleMessageInput"
          ></textarea>
          <p class="field-error">{{ errors.message }}</p>

          <div class="form-actions">
            <button
              ref="sendBtn"
              type="submit"
              class="send-btn"
              :disabled="isLoading"
              :class="{ 'sending': isLoading }"
            >
              {{ isLoading ? 'Enviando...' : 'Enviar mensaje' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="modalState.visible" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-icon" :class="modalState.type">
          <span>{{ modalState.type === 'success' ? '✅' : '❌' }}</span>
        </div>
        <h4>{{ modalState.title }}</h4>
        <p>{{ modalState.message }}</p>
        <button class="modal-btn" @click="closeModal">Close</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
