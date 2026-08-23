import { ref, computed } from 'vue';
import emailjs from '@emailjs/browser';


const form = ref(null);
const isLoading = ref(false);
const modalState = ref({
  visible: false,
  type: 'success',
  title: '',
  message: ''
});

const formData = ref({
  name: '',
  email: '',
  phone: '',
  company: '',
  message: ''
});

const errors = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
});

function sanitizeName(name) {
  return name.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ ]+/g, '').slice(0, 40);
}

function sanitizePhone(phone) {
  return phone.replace(/\D/g, '').slice(0, 15);
}

function validateName(name) {
  const v = name.trim();
  if (!v) return 'Please enter your name.';
  if (v.length < 2) return 'Name is too short.';
  if (v.length > 40) return 'Name cannot exceed 40 characters.';
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/;
  if (!nameRegex.test(v)) return 'Name contains invalid characters.';
  return '';
}

function validateEmail(email) {
  const v = email.trim();
  if (!v) return 'Please enter your email.';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(v)) return 'Please enter a valid email.';
  return '';
}

function validatePhone(phone) {
  const digits = phone.replace(/\D/g, '');
  if (!digits) return '';
  if (digits.length < 7 || digits.length > 15) {
    return 'Phone must contain 7-15 digits.';
  }
  return '';
}

function validateMessage(message) {
  const v = message.trim();
  if (!v) return 'Please write a message.';
  return '';
}

function clearAllErrors() {
  errors.value = { name: '', email: '', phone: '', message: '' };
}

function showModal(type, title, message) {
  modalState.value = { visible: true, type, title, message };
}

function closeModal() {
  modalState.value.visible = false;
}

function getEmailCredentials() {
  let publicKey = '';
  let serviceId = '';
  let templateId = '';

  try {
    const config = useRuntimeConfig();
    if (config?.public) {
      publicKey = config.public.emailjsPublicKey || '';
      serviceId = config.public.emailjsServiceId || '';
      templateId = config.public.emailjsTemplateId || '';
    }
  } catch {
  }

  if (!publicKey && typeof process !== 'undefined' && process.env) {
    publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY || process.env.NUXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';
  }
  if (!serviceId && typeof process !== 'undefined' && process.env) {
    serviceId = process.env.VITE_EMAILJS_SERVICE_ID || process.env.NUXT_PUBLIC_EMAILJS_SERVICE_ID || '';
  }
  if (!templateId && typeof process !== 'undefined' && process.env) {
    templateId = process.env.VITE_EMAILJS_TEMPLATE_ID || process.env.NUXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
  }

  return { publicKey, serviceId, templateId };
}

async function sendEmail(data) {
  try {
    const { publicKey, serviceId, templateId } = getEmailCredentials();

    if (!publicKey || !serviceId || !templateId) {
      console.error('EmailJS env vars missing');
      return { ok: false, message: 'EmailJS configuration missing.' };
    }

    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      phone: data.phone || 'Not provided',
      company: data.company || 'Not provided',
      message: data.message
    };

    await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    );

    return { ok: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('emailjs.send error', error);
    return { ok: false, message: String(error?.text || error?.message || error) };
  }
}

async function handleSubmit() {
  isLoading.value = true;
  clearAllErrors();

  const name = formData.value.name.trim();
  const email = formData.value.email.trim();
  const phoneRaw = formData.value.phone.trim();
  const message = formData.value.message.trim();

  const nameError = validateName(name);
  if (nameError) {
    errors.value.name = nameError;
    isLoading.value = false;
    return;
  }

  const emailError = validateEmail(email);
  if (emailError) {
    errors.value.email = emailError;
    isLoading.value = false;
    return;
  }

  const phoneDigits = phoneRaw.replace(/\D/g, '');
  if (phoneDigits) {
    const phoneError = validatePhone(phoneDigits);
    if (phoneError) {
      errors.value.phone = phoneError;
      isLoading.value = false;
      return;
    }
  }

  const messageError = validateMessage(message);
  if (messageError) {
    errors.value.message = messageError;
    isLoading.value = false;
    return;
  }

  const payload = {
    name,
    email,
    phone: phoneDigits || '',
    company: formData.value.company.trim(),
    message
  };

  const result = await sendEmail(payload);

  if (result.ok) {
    showModal('success', 'Success!', 'Your message has been sent successfully. We\'ll respond soon 👍');
    formData.value = { name: '', email: '', phone: '', company: '', message: '' };
  } else {
    showModal('error', 'Error', result.message || 'Error sending message');
  }

  isLoading.value = false;
}

function handleNameInput() {
  formData.value.name = sanitizeName(formData.value.name);
  const error = validateName(formData.value.name);
  errors.value.name = error;
}

function handleEmailInput() {
  const error = validateEmail(formData.value.email);
  errors.value.email = error;
}

function handlePhoneInput() {
  formData.value.phone = sanitizePhone(formData.value.phone);
  const error = validatePhone(formData.value.phone);
  errors.value.phone = error;
}

function handleMessageInput() {
  const error = validateMessage(formData.value.message);
  errors.value.message = error;
}

export function useContactForm() {
  const { data: profileData } = useFetch('/api/profile');
  const contactInfo = computed(() => ({
    email: profileData.value?.contact?.email || "jmonroy@kinasisdev.com",
    phone: profileData.value?.contact?.phone || "+52 55 8795 7504",
    location: profileData.value?.contact?.location || "Mexico City, Mexico"
  }));

  return {
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
  };
}