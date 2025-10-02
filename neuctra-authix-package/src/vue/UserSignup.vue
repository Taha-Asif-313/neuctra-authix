<template>
  <div :style="containerStyle">
    <div :style="cardStyle">
      <!-- Header -->
      <div :style="headerStyle">
        <img
          v-if="logoUrl"
          :src="logoUrl"
          alt="Logo"
          :style="logoStyle"
        />
        <User
          v-else
          :size="40"
          :color="primaryColor"
          :style="userIconStyle"
        />
        <h2 :style="titleStyle">
          {{ title }}
        </h2>
        <p :style="subtitleStyle">
          {{ subtitle }}
        </p>
      </div>

      <!-- Avatar Preview -->
      <div
        v-if="showAvatar && formData.avatarUrl"
        :style="avatarPreviewStyle"
      >
        <img
          :src="formData.avatarUrl"
          alt="Avatar Preview"
          :style="avatarImageStyle"
          @error="handleAvatarError"
        />
      </div>

      <!-- Signup Form -->
      <form
        @submit.prevent="handleSignup"
        :style="formStyle"
      >
        <!-- Name -->
        <div :style="fieldStyle">
          <label
            for="signup-name"
            :style="labelStyle"
          >
            Full Name
          </label>
          <div :style="inputWrapperStyle">
            <User
              :size="20"
              :style="inputIconStyle"
            />
            <input
              id="signup-name"
              type="text"
              placeholder="Enter your full name"
              v-model="formData.name"
              @input="clearError('name')"
              :style="getNameInputStyle"
            />
          </div>
          <span
            v-if="errors.name"
            :style="errorTextStyle"
          >
            {{ errors.name }}
          </span>
        </div>

        <!-- Email -->
        <div :style="fieldStyle">
          <label
            for="signup-email"
            :style="labelStyle"
          >
            Email Address
          </label>
          <div :style="inputWrapperStyle">
            <Mail
              :size="20"
              :style="inputIconStyle"
            />
            <input
              id="signup-email"
              type="email"
              placeholder="Enter your email address"
              v-model="formData.email"
              @input="clearError('email')"
              :style="getEmailInputStyle"
            />
          </div>
          <span
            v-if="errors.email"
            :style="errorTextStyle"
          >
            {{ errors.email }}
          </span>
        </div>

        <!-- Password -->
        <div :style="fieldStyle">
          <label
            for="signup-password"
            :style="labelStyle"
          >
            Password
          </label>
          <div :style="inputWrapperStyle">
            <Lock
              :size="20"
              :style="inputIconStyle"
            />
            <input
              id="signup-password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Create a secure password"
              v-model="formData.password"
              @input="clearError('password')"
              :style="getPasswordInputStyle"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              :style="toggleButtonStyle"
            >
              <EyeOff v-if="showPassword" :size="20" />
              <Eye v-else :size="20" />
            </button>
          </div>
          <span
            v-if="errors.password"
            :style="errorTextStyle"
          >
            {{ errors.password }}
          </span>
        </div>

        <!-- Avatar URL - Optional -->
        <div
          v-if="showAvatar"
          :style="fieldStyle"
        >
          <label
            for="signup-avatar"
            :style="labelStyle"
          >
            Avatar URL (Optional)
          </label>
          <div :style="inputWrapperStyle">
            <Image
              :size="20"
              :style="inputIconStyle"
            />
            <input
              id="signup-avatar"
              type="url"
              placeholder="Paste your avatar image URL"
              v-model="formData.avatarUrl"
              :style="inputStyle"
            />
          </div>
        </div>

        <!-- Links -->
        <div :style="linksStyle">
          <a
            v-if="loginUrl"
            :href="loginUrl"
            :style="linkStyle"
          >
            Already have an account?
          </a>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          :disabled="loading"
          :style="submitButtonStyle"
        >
          <Loader
            v-if="loading"
            :size="18"
            :style="loaderStyle"
          />
          {{ loading ? 'Creating Account...' : 'Create Account' }}
        </button>
      </form>

      <!-- Messages -->
      <div
        v-if="message"
        :style="getMessageStyle(message.type)"
      >
        <CheckCircle
          v-if="message.type === 'success'"
          :size="20"
        />
        <AlertCircle
          v-else
          :size="20"
        />
        <span>{{ message.text }}</span>
      </div>

      <!-- Footer -->
      <div :style="footerStyle">
        {{ footerText }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, type CSSProperties } from 'vue'
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  CheckCircle,
  AlertCircle,
  Loader,
  Image,
} from 'lucide-vue-next'
import { signupUser } from '../api/signup.js'
import { getSdkConfig } from '../sdk/config.js'

interface SignupFormProps {
  // Customization options
  logoUrl?: string
  title?: string
  subtitle?: string
  footerText?: string
  primaryColor?: string
  gradient?: string
  darkMode?: boolean

  // Only avatar is optional
  showAvatar?: boolean

  loginUrl?: string
  onSuccess?: (user: any) => void
  onError?: (error: any) => void
}

interface FormData {
  name: string
  email: string
  password: string
  avatarUrl?: string
}

const props = withDefaults(defineProps<SignupFormProps>(), {
  title: 'Create Your Account',
  subtitle: 'Join our platform today',
  footerText: 'Secure authentication powered by Neuctra Authix',
  primaryColor: '#00C214',
  gradient: 'linear-gradient(135deg, #22c55e, #00C214)',
  darkMode: true,
  showAvatar: false,
})

const { baseUrl, apiKey, appId } = getSdkConfig()

// State
const formData = ref<FormData>({
  name: '',
  email: '',
  password: '',
  ...(props.showAvatar && { avatarUrl: '' }),
})
const showPassword = ref(false)
const loading = ref(false)
const message = ref<{
  type: 'success' | 'error'
  text: string
} | null>(null)
const errors = ref<{
  name?: string
  email?: string
  password?: string
}>({})

// Responsive
const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

// Theme
const textColor = computed(() => (props.darkMode ? '#ffffff' : '#111827'))
const subTextColor = computed(() => (props.darkMode ? '#a1a1aa' : '#6b7280'))
const inputBg = computed(() => (props.darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'))
const inputBorder = computed(() => (props.darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'))

// Handlers
const clearError = (field: keyof typeof errors.value) => {
  if (errors.value[field]) {
    errors.value = { ...errors.value, [field]: undefined }
  }
}

const validateForm = () => {
  const newErrors: { name?: string; email?: string; password?: string } = {}
  
  if (!formData.value.name.trim()) {
    newErrors.name = 'Name is required'
  }
  
  if (!formData.value.email.trim()) {
    newErrors.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
    newErrors.email = 'Invalid email address'
  }
  
  if (!formData.value.password) {
    newErrors.password = 'Password is required'
  } else if (formData.value.password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters'
  }
  
  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleSignup = async (e: Event) => {
  e.preventDefault()
  if (!validateForm()) return

  loading.value = true
  message.value = null

  try {
    const userData = {
      ...formData.value,
      appId: appId,
    }

    const user = await signupUser(userData, { baseUrl, apiKey })
    message.value = { type: 'success', text: 'Account created successfully!' }
    props.onSuccess?.(user)
  } catch (err: any) {
    const errorMsg = err.message || 'Signup failed. Please try again.'
    message.value = { type: 'error', text: errorMsg }
    props.onError?.(err)
  } finally {
    loading.value = false
  }
}

const handleAvatarError = (e: Event) => {
  const target = e.target as HTMLImageElement
  target.style.display = 'none'
}

const getMessageStyle = (type: 'success' | 'error'): CSSProperties => ({
  marginTop: '16px',
  padding: '12px',
  borderRadius: '12px',
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  backgroundColor: type === 'success'
    ? `${props.primaryColor}15`
    : 'rgba(239,68,68,0.1)',
  border: type === 'success'
    ? `1px solid ${props.primaryColor}30`
    : '1px solid rgba(239,68,68,0.3)',
  color: type === 'success' ? props.primaryColor : '#ef4444',
})

// Styles with proper TypeScript typing
const containerStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const cardStyle = computed((): CSSProperties => ({
  minWidth: isMobile.value ? '320px' : '340px',
  width: '100%',
  maxWidth: '390px',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '10px',
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  backgroundColor: props.darkMode ? '#000000' : '#ffffff',
  padding: isMobile.value ? '30px 24px' : '32px 28px',
}))

const headerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '20px',
}

const logoStyle: CSSProperties = {
  height: '50px',
  width: '50px',
  marginBottom: '10px',
}

const userIconStyle: CSSProperties = {
  marginBottom: '10px',
}

const titleStyle = computed((): CSSProperties => ({
  fontSize: '24px',
  fontWeight: 700,
  color: textColor.value,
  margin: '0',
}))

const subtitleStyle = computed((): CSSProperties => ({
  fontSize: '14px',
  color: subTextColor.value,
  margin: '6px 0 0 0',
}))

const avatarPreviewStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '16px',
}

const avatarImageStyle: CSSProperties = {
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  objectFit: 'cover',
  border: `2px solid ${props.primaryColor}30`,
}

const formStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
}

const fieldStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
}

const inputWrapperStyle: CSSProperties = {
  position: 'relative',
}

const inputIconStyle = computed((): CSSProperties => ({
  position: 'absolute',
  left: '14px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: subTextColor.value,
}))

const inputStyle = computed((): CSSProperties => ({
  width: '100%',
  padding: isMobile.value ? '14px 14px 14px 44px' : '16px 16px 16px 44px',
  backgroundColor: inputBg.value,
  border: `1px solid ${inputBorder.value}`,
  borderRadius: '12px',
  color: textColor.value,
  fontSize: isMobile.value ? '15px' : '15px',
  outline: 'none',
  transition: 'all 0.2s ease',
  boxSizing: 'border-box',
}))

const getNameInputStyle = computed((): CSSProperties => ({
  ...inputStyle.value,
  borderColor: errors.value.name ? '#ef4444' : inputBorder.value,
}))

const getEmailInputStyle = computed((): CSSProperties => ({
  ...inputStyle.value,
  borderColor: errors.value.email ? '#ef4444' : inputBorder.value,
}))

const getPasswordInputStyle = computed((): CSSProperties => ({
  ...inputStyle.value,
  borderColor: errors.value.password ? '#ef4444' : inputBorder.value,
}))

const toggleButtonStyle: CSSProperties = {
  position: 'absolute',
  right: '14px',
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'transparent',
  border: 'none',
  color: subTextColor.value,
  cursor: 'pointer',
  padding: '4px',
}

const linksStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '13px',
  marginTop: '6px',
}

const linkStyle = computed((): CSSProperties => ({
  color: props.primaryColor,
  textDecoration: 'none',
  fontWeight: 500,
}))

const submitButtonStyle = computed((): CSSProperties => ({
  padding: '12px',
  background: props.gradient,
  color: '#fff',
  border: 'none',
  borderRadius: '10px',
  fontWeight: 600,
  cursor: loading.value ? 'not-allowed' : 'pointer',
  opacity: loading.value ? 0.7 : 1,
  marginTop: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
}))

const loaderStyle: CSSProperties = {
  animation: 'spin 1s linear infinite',
}

const labelStyle = computed((): CSSProperties => ({
  fontSize: '14px',
  fontWeight: 500,
  color: textColor.value,
}))

const errorTextStyle: CSSProperties = {
  color: '#ef4444',
  fontSize: '12px',
  marginTop: '2px',
}

const footerStyle = computed((): CSSProperties => ({
  textAlign: 'center',
  fontSize: '12px',
  color: subTextColor.value,
  marginTop: '20px',
  padding: '0 4px',
}))
</script>

<style>
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>