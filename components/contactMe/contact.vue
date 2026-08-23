<script setup>
import './contact.css'
import { useContactForm } from './contact.js'

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
} = useContactForm()
</script>

<template>
  <section id="contact-section" class="contact-root">
    <div class="liquid-glass-panel banner-contact">
      <h1 id="contact-title">Interested in my profile?</h1>
      <h2>Let's work together to build high-impact tech solutions.</h2>
    </div>

    <div class="contact-container">
      <div class="contact-content">
        <aside class="contact-info">
          <div class="liquid-glass-card info-box">
            <div class="info-icon">📧</div>
            <div>
              <h4>Email</h4>
              <p class="muted">{{ contactInfo.email }}</p>
            </div>
          </div>

          <div class="liquid-glass-card info-box">
            <div class="info-icon">📞</div>
            <div>
              <h4>Phone</h4>
              <p class="muted phone-number">{{ contactInfo.phone }}</p>
            </div>
          </div>

          <div class="liquid-glass-card info-box">
            <div class="info-icon">📍</div>
            <div>
              <h4>Location</h4>
              <p class="muted">{{ contactInfo.location }}</p>
            </div>
          </div>
        </aside>

        <form ref="form" class="liquid-glass-panel contact-form" @submit.prevent="handleSubmit">
          <h3>Tell me about your idea or project</h3>

          <div class="form-grid">
            <div class="field-group">
              <input
                v-model="formData.name"
                type="text"
                name="name"
                required
                placeholder="Name *"
                maxlength="40"
                autocomplete="name"
                class="liquid-glass-input"
                :class="{ 'input-error': errors.name }"
                @input="handleNameInput"
              />
              <p class="field-error">{{ errors.name }}</p>
            </div>

            <div class="field-group">
              <input
                v-model="formData.email"
                type="email"
                name="email"
                required
                placeholder="Email *"
                maxlength="50"
                autocomplete="email"
                class="liquid-glass-input"
                :class="{ 'input-error': errors.email }"
                @input="handleEmailInput"
              />
              <p class="field-error">{{ errors.email }}</p>
            </div>

            <div class="field-group">
              <input
                v-model="formData.phone"
                type="tel"
                name="phone"
                placeholder="Phone (Optional)"
                maxlength="15"
                autocomplete="tel"
                class="liquid-glass-input"
                :class="{ 'input-error': errors.phone }"
                @input="handlePhoneInput"
              />
              <p class="field-error">{{ errors.phone }}</p>
            </div>

            <div class="field-group">
              <input
                v-model="formData.company"
                type="text"
                name="company"
                placeholder="Company / Organization"
                maxlength="60"
                autocomplete="organization"
                class="liquid-glass-input"
              />
            </div>
          </div>

          <div class="field-group">
            <textarea
              v-model="formData.message"
              name="message"
              rows="5"
              required
              placeholder="Describe your project, requirements, or the goals you want to achieve..."
              class="liquid-glass-input"
              :class="{ 'input-error': errors.message }"
              @input="handleMessageInput"
            ></textarea>
            <p class="field-error">{{ errors.message }}</p>
          </div>

          <div class="form-actions">
            <button
              type="submit"
              class="liquid-glass-btn-primary send-btn"
              :disabled="isLoading"
            >
              {{ isLoading ? 'Sending...' : 'Send Message' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="modalState.visible" class="modal-overlay" @click="closeModal">
      <div class="liquid-glass-panel modal-content" @click.stop>
        <div class="modal-icon" :class="modalState.type">
          <span>{{ modalState.type === 'success' ? '✅' : '❌' }}</span>
        </div>
        <h4>{{ modalState.title }}</h4>
        <p>{{ modalState.message }}</p>
        <button class="liquid-glass-btn-primary" @click="closeModal">Close</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
