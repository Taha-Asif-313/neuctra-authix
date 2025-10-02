<template>
  <div
    v-if="isOpen"
    class="modal-overlay"
    :style="overlayStyle"
  >
    <div
      class="change-password-modal"
      :style="modalStyle"
    >
      <!-- Header -->
      <div class="modal-header">
        <div class="header-content">
          <div
            class="icon-container"
            :style="iconContainerStyle"
          >
            <Lock :size="20" />
          </div>
          <div>
            <h3 :style="titleStyle">Change Password</h3>
          </div>
        </div>
        <button
          @click="onClose"
          aria-label="Close password change modal"
          class="close-button"
          :style="closeButtonStyle"
          @mouseover="handleCloseHover"
          @mouseout="handleCloseLeave"
        >
          <X :size="20" />
        </button>
      </div>

      <!-- Form -->
      <form @submit="handleSubmit">
        <div
          v-for="field in passwordFields"
          :key="field.field"
          class="password-field"
        >
          <label
            :for="field.field"
            class="field-label"
            :style="labelStyle"
          >
            {{ field.label }}
          </label>
          <div class="input-wrapper">
            <div class="input-icon">
              <component :is="field.iconComponent" :size="18" />
            </div>
            <input
              :type="showPassword[field.field] ? 'text' : 'password'"
              :id="field.field"
              :name="field.field"
              :placeholder="`Enter ${field.label.toLowerCase()}`"
              v-model="formData[field.field]"
              @input="handleInput"
              class="password-input"
              :style="getInputStyle(field.field)"
              @focus="handleInputFocus"
              @blur="handleInputBlur(field.field, $event)"
            />
            <button
              type="button"
              @click="toggleVisibility(field.field)"
              class="visibility-toggle"
              :style="visibilityButtonStyle"
              @mouseover="handleVisibilityHover"
              @mouseout="handleVisibilityLeave"
            >
              <EyeOff v-if="showPassword[field.field]" :size="18" />
              <Eye v-else :size="18" />
            </button>
          </div>
          <div
            v-if="errors[field.field]"
            class="error-message"
            :style="errorStyle"
          >
            <span style="font-size: 16px">⚠</span>
            {{ errors[field.field] }}
          </div>
        </div>

        <!-- Actions -->
        <div
          class="modal-actions"
          :class="{ 'mobile-layout': isMobile }"
        >
          <button
            type="button"
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
            type="submit"
            :disabled="loading"
            class="submit-button"
            :style="submitButtonStyle"
            @mouseover="handleSubmitHover"
            @mouseout="handleSubmitLeave"
          >
            <Loader2
              v-if="loading"
              :size="16"
              class="spinner"
            />
            {{ loading ? 'Updating...' : 'Update Password' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Lock, X, Eye, EyeOff, Loader2, Key } from 'lucide-vue-next'
import axios from 'axios'

const props = defineProps({
  isOpen: Boolean,
  onClose: Function,
  onSuccess: Function,
  onError: Function,
  userId: String,
  colors: Object
})

const formData = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const errors = ref({})
const loading = ref(false)
const showPassword = ref({
  currentPassword: false,
  newPassword: false,
  confirmPassword: false
})
const isMobile = ref(false)

const passwordFields = [
  {
    field: 'currentPassword',
    label: 'Current Password',
    iconComponent: Key
  },
  {
    field: 'newPassword',
    label: 'New Password',
    iconComponent: Lock
  },
  {
    field: 'confirmPassword',
    label: 'Confirm Password',
    iconComponent: Lock
  }
]

// Styles
const overlayStyle = computed(() => ({
  position: 'fixed',
  inset: '0',
  background: 'rgba(0,0,0,0.7)',
  backdropFilter: 'blur(6px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
  zIndex: '1000'
}))

const modalStyle = computed(() => ({
  backgroundColor: props.colors.surface,
  border: `1px solid ${props.colors.border}`,
  borderRadius: '16px',
  maxWidth: '440px',
  width: '100%',
  padding: '24px',
  boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
  maxHeight: '90vh',
  overflowY: 'auto'
}))

const iconContainerStyle = computed(() => ({
  width: '40px',
  height: '40px',
  borderRadius: '10px',
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
  fontSize: '18px',
  fontWeight: '600',
  lineHeight: '1.4'
}))

const closeButtonStyle = computed(() => ({
  background: 'transparent',
  border: 'none',
  color: props.colors.textTertiary,
  cursor: 'pointer',
  padding: '8px',
  borderRadius: '8px',
  flexShrink: 0,
  width: '36px',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const labelStyle = computed(() => ({
  display: 'block',
  marginBottom: '8px',
  color: props.colors.textPrimary,
  fontSize: '14px',
  fontWeight: '500',
  lineHeight: '1.4'
}))

const getInputStyle = (field) => ({
  width: '100%',
  padding: '14px 48px 14px 44px',
  borderRadius: '10px',
  border: `1.5px solid ${errors.value[field] ? props.colors.error : props.colors.border}`,
  backgroundColor: 'transparent',
  color: props.colors.textPrimary,
  fontSize: '15px',
  outline: 'none',
  transition: 'all 0.2s ease',
  boxSizing: 'border-box'
})

const visibilityButtonStyle = computed(() => ({
  position: 'absolute',
  right: '14px',
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  color: props.colors.textTertiary,
  padding: '4px',
  borderRadius: '4px',
  width: '32px',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const errorStyle = computed(() => ({
  fontSize: '13px',
  color: props.colors.error,
  marginTop: '6px',
  display: 'flex',
  alignItems: 'center',
  gap: '6px'
}))

const cancelButtonStyle = computed(() => ({
  padding: '14px 24px',
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
  padding: '14px 24px',
  borderRadius: '10px',
  border: 'none',
  background: `linear-gradient(135deg, ${props.colors.accent}, ${props.colors.accent}E6)`,
  color: '#fff',
  fontSize: '14px',
  fontWeight: '600',
  cursor: loading.value ? 'not-allowed' : 'pointer',
  flex: isMobile.value ? 'none' : 1,
  minWidth: isMobile.value ? '100%' : '140px',
  opacity: loading.value ? 0.8 : 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  transition: 'all 0.2s ease',
  boxShadow: loading.value ? 'none' : `0 4px 12px ${props.colors.accent}40`
}))

// Methods
const checkMobile = () => {
  isMobile.value = window.innerWidth < 640
}

const handleInput = (event) => {
  const { name, value } = event.target
  formData.value[name] = value
  if (errors.value[name]) {
    errors.value[name] = ''
  }
}

const toggleVisibility = (field) => {
  showPassword.value[field] = !showPassword.value[field]
}

const handleInputFocus = (event) => {
  event.target.style.borderColor = props.colors.accent
  event.target.style.boxShadow = `0 0 0 3px ${props.colors.accent}20`
}

const handleInputBlur = (field, event) => {
  event.target.style.borderColor = errors.value[field] ? props.colors.error : props.colors.border
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

const handleVisibilityHover = (event) => {
  event.currentTarget.style.backgroundColor = props.colors.border
  event.currentTarget.style.color = props.colors.textPrimary
}

const handleVisibilityLeave = (event) => {
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
  if (!loading.value) {
    event.currentTarget.style.transform = 'translateY(-1px)'
    event.currentTarget.style.boxShadow = `0 6px 20px ${props.colors.accent}60`
  }
}

const handleSubmitLeave = (event) => {
  if (!loading.value) {
    event.currentTarget.style.transform = 'translateY(0)'
    event.currentTarget.style.boxShadow = `0 4px 12px ${props.colors.accent}40`
  }
}

const validate = () => {
  const newErrors = {}
  if (!formData.value.currentPassword) newErrors.currentPassword = 'Current password is required'
  if (!formData.value.newPassword) newErrors.newPassword = 'New password is required'
  else if (formData.value.newPassword.length < 6) newErrors.newPassword = 'Password must be at least 6 characters'
  if (formData.value.newPassword !== formData.value.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
  
  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleSubmit = async (event) => {
  event.preventDefault()
  if (!validate()) return

  loading.value = true
  try {
    // You'll need to implement getSdkConfig or pass it as a prop
    const { baseUrl, apiKey, appId } = getSdkConfig()
    
    const { data } = await axios.put(
      `${baseUrl}/users/change-password/${props.userId}`,
      {
        appId,
        currentPassword: formData.value.currentPassword,
        newPassword: formData.value.newPassword,
      },
      {
        headers: {
          'x-api-key': apiKey,
        },
      }
    )

    if (data.success) {
      props.onSuccess(data.message || 'Password updated successfully')
      formData.value = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }
      props.onClose()
    } else {
      props.onError(data.message || 'Failed to update password')
    }
  } catch (err) {
    props.onError(err.response?.data?.message || 'Something went wrong')
  } finally {
    loading.value = false
  }
}

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
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  gap: 12px;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.password-field {
  margin-bottom: 20px;
  position: relative;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: v-bind('colors.textTertiary');
  z-index: 2;
}

.modal-actions {
  display: flex;
  gap: 12px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: stretch;
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.change-password-modal::-webkit-scrollbar {
  width: 6px;
}

.change-password-modal::-webkit-scrollbar-track {
  background: transparent;
}

.change-password-modal::-webkit-scrollbar-thumb {
  background: v-bind('colors.border');
  border-radius: 3px;
}

.change-password-modal::-webkit-scrollbar-thumb:hover {
  background: v-bind('colors.textTertiary');
}

/* Mobile responsiveness */
@media (max-width: 480px) {
  .change-password-modal {
    padding: 20px 16px;
    margin: 0;
    border-radius: 12px 12px 0 0;
    max-height: 85vh;
  }
  
  .mobile-layout {
    flex-direction: column-reverse;
  }
}

@media (max-width: 360px) {
  .change-password-modal {
    padding: 16px 12px;
  }
}
</style>