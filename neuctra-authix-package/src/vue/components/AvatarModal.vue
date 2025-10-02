<template>
  <div
    v-if="isOpen"
    class="modal-overlay"
    :style="overlayStyle"
    @click="handleOverlayClick"
  >
    <div
      class="avatar-modal-container"
      :style="modalStyle"
    >
      <!-- Header -->
      <div class="modal-header">
        <div class="header-content">
          <div
            class="icon-container"
            :style="iconContainerStyle"
          >
            <Camera :size="22" />
          </div>
          <div>
            <h3 :style="titleStyle">Update Avatar</h3>
          </div>
        </div>
        <button
          @click="onClose"
          aria-label="Close avatar modal"
          class="close-button"
          :style="closeButtonStyle"
          @mouseover="handleCloseHover"
          @mouseout="handleCloseLeave"
        >
          <X :size="20" />
        </button>
      </div>

      <!-- Body -->
      <div class="modal-body">
        <!-- URL Input -->
        <div class="input-container">
          <label
            for="avatar-url"
            class="input-label"
            :style="labelStyle"
          >
            <Link2 :size="16" />
            Avatar URL
          </label>
          <div class="input-wrapper">
            <input
              type="url"
              id="avatar-url"
              placeholder="https://example.com/your-avatar.jpg"
              v-model="newAvatar"
              :disabled="loading"
              class="url-input"
              :style="inputStyle"
              @focus="handleInputFocus"
              @blur="handleInputBlur"
            />
            <div class="input-icon">
              <Image :size="18" />
            </div>
          </div>

          <!-- Validation Message -->
          <div
            v-if="validation.message"
            class="validation-message"
            :style="validationStyle"
          >
            <CheckCircle v-if="validation.type === 'success'" :size="14" />
            <AlertCircle v-else :size="14" />
            {{ validation.message }}
          </div>
        </div>

        <!-- Preview -->
        <div
          v-if="newAvatar && validation.type === 'success'"
          class="preview-container"
          :style="previewContainerStyle"
        >
          <p class="preview-label" :style="previewLabelStyle">
            Preview
          </p>
          <img
            :src="newAvatar"
            alt="Avatar preview"
            class="preview-image"
            :style="previewImageStyle"
            @error="handleImageError"
          />
        </div>
      </div>

      <!-- Actions -->
      <div
        class="modal-actions"
        :class="{ 'mobile-layout': isMobile }"
      >
        <button
          @click="onClose"
          :disabled="loading"
          class="cancel-button"
          :style="cancelButtonStyle"
          @mouseover="handleCancelHover"
          @mouseout="handleCancelLeave"
        >
          Cancel
        </button>
        <button
          @click="handleSubmit"
          :disabled="loading || !validation.isValid"
          class="submit-button"
          :style="submitButtonStyle"
          @mouseover="handleSubmitHover"
          @mouseout="handleSubmitLeave"
        >
          <Camera v-if="!loading" :size="16" />
          <Loader2
            v-else
            :size="16"
            class="spinner"
          />
          {{ loading ? 'Updating...' : 'Update Avatar' }}
        </button>
      </div>
    </div>

    <!-- Inline CSS for animations -->
    <style>
      {{
        `
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .avatar-modal-container {
          animation: modalSlideIn 0.3s ease-out;
        }
        
        .spinner {
          animation: spin 1s linear infinite;
        }
        
        /* Mobile responsiveness */
        @media (max-width: 480px) {
          .avatar-modal-container {
            padding: 20px 16px;
            margin: 0;
            border-radius: 16px 16px 0 0;
            max-height: 90vh;
            overflow-y: auto;
          }
          
          .mobile-layout {
            flex-direction: column-reverse;
          }
        }
        
        @media (max-width: 360px) {
          .avatar-modal-container {
            padding: 16px 12px;
          }
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .avatar-modal-container {
            animation: none;
          }
          
          .spinner {
            animation: none;
          }
        }
        `
      }}
    </style>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { Camera, X, Link2, Image, CheckCircle, AlertCircle, Loader2 } from 'lucide-vue-next'

const props = defineProps({
  isOpen: Boolean,
  onClose: Function,
  onUpdate: Function,
  colors: Object
})

const newAvatar = ref('')
const loading = ref(false)
const isMobile = ref(false)
const validation = ref({
  isValid: false,
  message: '',
  type: null
})

// Styles
const overlayStyle = computed(() => ({
  position: 'fixed',
  inset: '0',
  background: 'rgba(0,0,0,0.8)',
  backdropFilter: 'blur(8px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
  zIndex: '1000'
}))

const modalStyle = computed(() => ({
  backgroundColor: props.colors.surface,
  border: `1px solid ${props.colors.border}`,
  borderRadius: '20px',
  width: '100%',
  maxWidth: '480px',
  padding: '24px',
  boxShadow: '0 32px 64px rgba(0,0,0,0.4)'
}))

const iconContainerStyle = computed(() => ({
  width: '44px',
  height: '44px',
  borderRadius: '12px',
  background: `linear-gradient(135deg, ${props.colors.accent}20, ${props.colors.accent}40)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: props.colors.accent,
  flexShrink: 0
}))

const titleStyle = computed(() => ({
  color: props.colors.textPrimary,
  margin: '0',
  fontSize: '20px',
  fontWeight: '700',
  lineHeight: '1.3'
}))

const closeButtonStyle = computed(() => ({
  background: 'transparent',
  border: 'none',
  color: props.colors.textTertiary,
  cursor: 'pointer',
  padding: '8px',
  borderRadius: '8px',
  width: '36px',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  transition: 'all 0.2s ease'
}))

const labelStyle = computed(() => ({
  display: 'flex',
  marginBottom: '8px',
  color: props.colors.textPrimary,
  fontSize: '14px',
  fontWeight: '500',
  alignItems: 'center',
  gap: '6px'
}))

const inputStyle = computed(() => ({
  width: '100%',
  padding: '14px 16px 14px 44px',
  borderRadius: '12px',
  border: `1.5px solid ${
    validation.value.type === 'error'
      ? props.colors.error
      : validation.value.type === 'success'
      ? props.colors.success
      : props.colors.border
  }`,
  backgroundColor: 'transparent',
  color: props.colors.textPrimary,
  fontSize: '15px',
  outline: 'none',
  transition: 'all 0.2s ease',
  boxSizing: 'border-box'
}))

const validationStyle = computed(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  marginTop: '8px',
  fontSize: '13px',
  color:
    validation.value.type === 'success'
      ? props.colors.success
      : validation.value.type === 'error'
      ? props.colors.error
      : props.colors.textTertiary
}))

const previewContainerStyle = computed(() => ({
  padding: '16px',
  backgroundColor: `${props.colors.success}10`,
  border: `1px solid ${props.colors.success}20`,
  borderRadius: '12px',
  textAlign: 'center'
}))

const previewLabelStyle = computed(() => ({
  color: props.colors.textSecondary,
  fontSize: '13px',
  fontWeight: '500',
  margin: '0 0 12px 0'
}))

const previewImageStyle = computed(() => ({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  objectFit: 'cover',
  border: `2px solid ${props.colors.success}40`,
  margin: '0 auto'
}))

const cancelButtonStyle = computed(() => ({
  padding: '10px 24px',
  borderRadius: '10px',
  border: `1.5px solid ${props.colors.border}`,
  background: 'transparent',
  color: props.colors.textPrimary,
  fontSize: '14px',
  fontWeight: '500',
  cursor: loading.value ? 'not-allowed' : 'pointer',
  flex: isMobile.value ? 'none' : 1,
  minWidth: isMobile.value ? '100%' : '120px',
  opacity: loading.value ? 0.6 : 1,
  transition: 'all 0.2s ease'
}))

const submitButtonStyle = computed(() => ({
  padding: '10px 24px',
  borderRadius: '10px',
  border: 'none',
  background: `linear-gradient(135deg, ${props.colors.accent}, ${props.colors.accent}E6)`,
  color: '#fff',
  fontSize: '14px',
  fontWeight: '600',
  cursor: loading.value || !validation.value.isValid ? 'not-allowed' : 'pointer',
  flex: isMobile.value ? 'none' : 1,
  minWidth: isMobile.value ? '100%' : '140px',
  opacity: loading.value || !validation.value.isValid ? 0.6 : 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  transition: 'all 0.2s ease',
  boxShadow:
    loading.value || !validation.value.isValid
      ? 'none'
      : `0 4px 12px ${props.colors.accent}40`
}))

// Methods
const checkMobile = () => {
  isMobile.value = window.innerWidth < 640
}

const handleOverlayClick = (event) => {
  if (event.target === event.currentTarget) {
    props.onClose()
  }
}

const handleInputFocus = (event) => {
  event.target.style.borderColor = props.colors.accent
  event.target.style.boxShadow = `0 0 0 3px ${props.colors.accent}20`
}

const handleInputBlur = (event) => {
  event.target.style.borderColor = 
    validation.value.type === 'error'
      ? props.colors.error
      : validation.value.type === 'success'
      ? props.colors.success
      : props.colors.border
  event.target.style.boxShadow = 'none'
}

const handleCloseHover = (event) => {
  event.currentTarget.style.backgroundColor = props.colors.border
  event.currentTarget.style.color = props.colors.textPrimary
}

const handleCloseLeave = (event) => {
  event.currentTarget.style.backgroundColor = 'transparent'
  event.currentTarget.style.color = props.colors.textTertiary
}

const handleCancelHover = (event) => {
  if (!loading.value) {
    event.currentTarget.style.backgroundColor = props.colors.border
    event.currentTarget.style.transform = 'translateY(-1px)'
  }
}

const handleCancelLeave = (event) => {
  if (!loading.value) {
    event.currentTarget.style.backgroundColor = 'transparent'
    event.currentTarget.style.transform = 'translateY(0)'
  }
}

const handleSubmitHover = (event) => {
  if (!loading.value && validation.value.isValid) {
    event.currentTarget.style.transform = 'translateY(-1px)'
    event.currentTarget.style.boxShadow = `0 6px 20px ${props.colors.accent}60`
  }
}

const handleSubmitLeave = (event) => {
  if (!loading.value && validation.value.isValid) {
    event.currentTarget.style.transform = 'translateY(0)'
    event.currentTarget.style.boxShadow = `0 4px 12px ${props.colors.accent}40`
  }
}

const handleImageError = (event) => {
  event.currentTarget.style.display = 'none'
}

const handleSubmit = async () => {
  if (!newAvatar.value || !validation.value.isValid) return

  loading.value = true
  try {
    const success = await props.onUpdate(newAvatar.value)
    if (success) {
      newAvatar.value = ''
      props.onClose()
    }
  } finally {
    loading.value = false
  }
}

// Watchers
watch(newAvatar, (value) => {
  if (!value.trim()) {
    validation.value = { isValid: false, message: '', type: null }
    return
  }

  try {
    const url = new URL(value)
    const isValidImage = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url.pathname)

    if (isValidImage) {
      validation.value = {
        isValid: true,
        message: 'Valid image URL',
        type: 'success'
      }
    } else {
      validation.value = {
        isValid: false,
        message: 'URL should point to an image file',
        type: 'warning'
      }
    }
  } catch {
    validation.value = {
      isValid: false,
      message: 'Please enter a valid URL',
      type: 'error'
    }
  }
})

// Lifecycle
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 24px;
  gap: 16px;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-container {
  margin-bottom: 0;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: v-bind('colors.textTertiary');
}

.modal-actions {
  display: flex;
  gap: 12px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: stretch;
  margin-top: 24px;
}
</style>