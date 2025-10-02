<template>
  <div
    v-if="isOpen"
    class="modal-overlay"
    :style="overlayStyle"
    @click="handleOverlayClick"
  >
    <div
      class="delete-modal-container"
      :style="modalStyle"
    >
      <component :is="currentStepComponent" />
    </div>

    <!-- Inline CSS for animations -->
    <style>
      {{
        `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
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
        
        .delete-modal-container {
          animation: scaleIn 0.3s ease-out;
        }
        
        .spinner {
          animation: spin 1s linear infinite;
        }
        
        /* Mobile responsiveness */
        @media (max-width: 480px) {
          .delete-modal-container {
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
          .delete-modal-container {
            padding: 16px 12px;
          }
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .delete-modal-container {
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { 
  Trash2, 
  X, 
  AlertTriangle, 
  CheckCircle2, 
  Loader2, 
  Database, 
  UserX, 
  LogOut, 
  Shield 
} from 'lucide-vue-next'
import axios from 'axios'

const props = defineProps({
  isOpen: Boolean,
  onClose: Function,
  onSuccess: Function,
  onError: Function,
  userId: String,
  token: String,
  colors: Object
})

const loading = ref(false)
const confirmationText = ref('')
const step = ref('warning')
const isMobile = ref(false)

// Computed
const isConfirmed = computed(() => confirmationText.value.toLowerCase() === 'delete my account')

const currentStepComponent = computed(() => {
  switch (step.value) {
    case 'warning': return WarningStep
    case 'confirmation': return ConfirmationStep
    case 'processing': return ProcessingStep
    case 'success': return SuccessStep
    default: return WarningStep
  }
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
  zIndex: '10000',
  animation: 'fadeIn 0.3s ease-out'
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

// Methods
const checkMobile = () => {
  isMobile.value = window.innerWidth < 640
}

const handleOverlayClick = (event) => {
  if (event.target === event.currentTarget && step.value !== 'processing' && step.value !== 'success') {
    props.onClose()
  }
}

const handleDelete = async () => {
  loading.value = true
  step.value = 'processing'

  try {
    // You'll need to implement getSdkConfig or pass it as a prop
    const { baseUrl, apiKey, appId } = getSdkConfig()
    
    const { data } = await axios.delete(`${baseUrl}/users/delete/${props.userId}`, {
      data: { appId },
      headers: {
        'x-api-key': apiKey,
      },
    })

    if (data.success) {
      props.onSuccess(data.message || 'Account deleted successfully')
      step.value = 'success'

      // Redirect after showing success state
      setTimeout(() => {
        localStorage.removeItem('userInfo')
        localStorage.removeItem('userToken')
        window.location.href = '/'
      }, 2000)
    } else {
      props.onError(data.message || 'Failed to delete account')
      step.value = 'warning'
    }
  } catch (err) {
    props.onError(err.response?.data?.message || 'Something went wrong')
    step.value = 'warning'
  } finally {
    loading.value = false
  }
}

// Step Components
const WarningStep = {
  setup() {
    const handleContinue = () => {
      step.value = 'confirmation'
    }

    return {
      handleContinue,
      isMobile,
      props
    }
  },
  template: `
    <div>
      <!-- Header -->
      <div class="modal-header">
        <div class="header-content">
          <div
            class="icon-container"
            :style="{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              flexShrink: 0
            }"
          >
            <Trash2 :size="20" />
          </div>
          <div>
            <h3 :style="{
              color: props.colors.textPrimary,
              margin: 0,
              fontSize: '20px',
              fontWeight: 700,
              lineHeight: '1.3'
            }">
              Delete Account
            </h3>
          </div>
        </div>
        <button
          @click="props.onClose"
          aria-label="Close modal"
          class="close-button"
          :style="{
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
          }"
          @mouseover="(e) => {
            e.currentTarget.style.backgroundColor = props.colors.border;
            e.currentTarget.style.color = props.colors.textPrimary;
          }"
          @mouseout="(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = props.colors.textTertiary;
          }"
        >
          <X :size="20" />
        </button>
      </div>

      <!-- Warning Content -->
      <div
        class="warning-content"
        :style="{
          display: 'flex',
          gap: '16px',
          padding: '20px',
          background: \`\${props.colors.error}15\`,
          border: \`1px solid \${props.colors.error}30\`,
          borderRadius: '12px',
          marginBottom: '20px'
        }"
      >
        <div
          :style="{
            color: props.colors.error,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'flex-start'
          }"
        >
          <AlertTriangle :size="24" />
        </div>
        <div style="flex: 1">
          <h4 :style="{
            color: props.colors.textPrimary,
            margin: '0 0 12px 0',
            fontSize: '16px',
            fontWeight: 600
          }">
            Before you proceed...
          </h4>
          <div
            :style="{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }"
          >
            <div
              v-for="(item, index) in [
                { icon: Database, text: 'All your data will be permanently deleted' },
                { icon: UserX, text: 'This action cannot be reversed' },
                { icon: LogOut, text: 'You will lose access to all services' }
              ]"
              :key="index"
              :style="{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '14px',
                color: props.colors.textSecondary
              }"
            >
              <div :style="{ color: props.colors.error, flexShrink: 0 }">
                <component :is="item.icon" :size="16" />
              </div>
              <span>{{ item.text }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div
        class="modal-actions"
        :class="{ 'mobile-layout': isMobile }"
      >
        <button
          @click="props.onClose"
          class="cancel-button"
          :style="{
            padding: '10px 24px',
            borderRadius: '10px',
            border: \`1.5px solid \${props.colors.border}\`,
            background: 'transparent',
            color: props.colors.textPrimary,
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            flex: isMobile ? 'none' : 1,
            minWidth: isMobile ? '100%' : '120px',
            transition: 'all 0.2s ease'
          }"
          @mouseover="(e) => {
            e.currentTarget.style.backgroundColor = props.colors.border;
            e.currentTarget.style.transform = 'translateY(-1px)';
          }"
          @mouseout="(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.transform = 'translateY(0)';
          }"
        >
          Cancel
        </button>
        <button
          @click="handleContinue"
          class="delete-button"
          :style="{
            padding: '10px 24px',
            borderRadius: '10px',
            border: 'none',
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            color: 'white',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            flex: isMobile ? 'none' : 1,
            minWidth: isMobile ? '100%' : '140px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)'
          }"
          @mouseover="(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.5)';
          }"
          @mouseout="(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.4)';
          }"
        >
          <Trash2 :size="16" />
          Continue to Delete
        </button>
      </div>
    </div>
  `
}

const ConfirmationStep = {
  setup() {
    const handleGoBack = () => {
      step.value = 'warning'
      confirmationText.value = ''
    }

    return {
      handleGoBack,
      confirmationText,
      isConfirmed,
      handleDelete,
      loading,
      isMobile,
      props
    }
  },
  template: `
    <div>
      <!-- Header -->
      <div
        :style="{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '24px'
        }"
      >
        <div
          :style="{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            flexShrink: 0
          }"
        >
          <AlertTriangle :size="24" />
        </div>
        <div style="flex: 1">
          <h3 :style="{
            color: props.colors.textPrimary,
            margin: 0,
            fontSize: '20px',
            fontWeight: 700,
            lineHeight: '1.3'
          }">
            Confirm Deletion
          </h3>
        </div>
      </div>

      <!-- Confirmation Content -->
      <div style="marginBottom: '24px'">
        <p :style="{
          color: props.colors.textSecondary,
          marginBottom: '16px',
          fontSize: '14px',
          lineHeight: '1.5'
        }">
          Type <strong :style="{ color: props.colors.textPrimary }">"delete my account"</strong> to confirm:
        </p>

        <input
          type="text"
          v-model="confirmationText"
          placeholder="delete my account"
          :style="{
            width: '100%',
            padding: '14px 16px',
            borderRadius: '10px',
            border: \`2px solid \${isConfirmed ? props.colors.success : props.colors.error}\`,
            backgroundColor: 'transparent',
            color: props.colors.textPrimary,
            fontSize: '15px',
            outline: 'none',
            transition: 'all 0.2s ease',
            boxSizing: 'border-box'
          }"
          @focus="(e) => {
            e.target.style.boxShadow = \`0 0 0 3px \${props.colors.accent}20\`;
          }"
          @blur="(e) => {
            e.target.style.boxShadow = 'none';
          }"
          autofocus
        />

        <div
          v-if="isConfirmed"
          :style="{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '10px',
            color: props.colors.success,
            fontSize: '14px',
            fontWeight: 500
          }"
        >
          <CheckCircle2 :size="16" />
          <span>Confirmation accepted</span>
        </div>
      </div>

      <!-- Actions -->
      <div
        class="modal-actions"
        :class="{ 'mobile-layout': isMobile }"
      >
        <button
          @click="handleGoBack"
          class="back-button"
          :style="{
            padding: '10px 24px',
            borderRadius: '10px',
            border: \`1.5px solid \${props.colors.border}\`,
            background: 'transparent',
            color: props.colors.textPrimary,
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            flex: isMobile ? 'none' : 1,
            minWidth: isMobile ? '100%' : '120px',
            transition: 'all 0.2s ease'
          }"
          @mouseover="(e) => {
            e.currentTarget.style.backgroundColor = props.colors.border;
            e.currentTarget.style.transform = 'translateY(-1px)';
          }"
          @mouseout="(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.transform = 'translateY(0)';
          }"
        >
          Go Back
        </button>
        <button
          @click="handleDelete"
          :disabled="!isConfirmed || loading"
          class="confirm-delete-button"
          :style="{
            padding: '10px 24px',
            borderRadius: '10px',
            border: 'none',
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            color: 'white',
            fontSize: '14px',
            fontWeight: 600,
            cursor: !isConfirmed || loading ? 'not-allowed' : 'pointer',
            flex: isMobile ? 'none' : 1,
            minWidth: isMobile ? '100%' : '140px',
            opacity: !isConfirmed || loading ? 0.6 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
            boxShadow: !isConfirmed || loading ? 'none' : '0 4px 12px rgba(239, 68, 68, 0.4)'
          }"
          @mouseover="(e) => {
            if (isConfirmed && !loading) {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.5)';
            }
          }"
          @mouseout="(e) => {
            if (isConfirmed && !loading) {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.4)';
            }
          }"
        >
          <Trash2 :size="16" />
          Yes, Delete My Account
        </button>
      </div>
    </div>
  `
}

const ProcessingStep = {
  setup() {
    return {
      props
    }
  },
  template: `
    <div>
      <!-- Header -->
      <div
        :style="{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '24px'
        }"
      >
        <div
          :style="{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6b7280, #4b5563)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            flexShrink: 0
          }"
        >
          <Loader2
            :size="20"
            class="spinner"
          />
        </div>
        <div style="flex: 1">
          <h3 :style="{
            color: props.colors.textPrimary,
            margin: 0,
            fontSize: '20px',
            fontWeight: 700,
            lineHeight: '1.3'
          }">
            Deleting Account
          </h3>
          <p :style="{
            color: props.colors.textTertiary,
            margin: '4px 0 0 0',
            fontSize: '14px',
            lineHeight: '1.4'
          }">
            Please wait while we process your request
          </p>
        </div>
      </div>

      <!-- Processing Content -->
      <div style="marginBottom: '20px'">
        <div
          :style="{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }"
        >
          <div
            v-for="(stepItem, index) in [
              { text: 'Removing your data', active: true },
              { text: 'Closing active sessions', active: false },
              { text: 'Finalizing deletion', active: false }
            ]"
            :key="index"
            :style="{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              borderRadius: '8px',
              transition: 'all 0.2s ease',
              backgroundColor: stepItem.active ? \`\${props.colors.accent}10\` : 'transparent'
            }"
          >
            <div
              :style="{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: stepItem.active ? props.colors.accent : props.colors.textTertiary,
                transition: 'all 0.3s ease',
                boxShadow: stepItem.active ? \`0 0 0 4px \${props.colors.accent}20\` : 'none'
              }"
            />
            <span :style="{
              fontSize: '14px',
              color: stepItem.active ? props.colors.textPrimary : props.colors.textSecondary,
              fontWeight: stepItem.active ? 500 : 400
            }">
              {{ stepItem.text }}
            </span>
          </div>
        </div>
      </div>

      <div
        :style="{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '16px',
          background: \`\${props.colors.accent}10\`,
          borderRadius: '10px',
          fontSize: '14px',
          color: props.colors.textSecondary
        }"
      >
        <Shield
          :size="18"
          :style="{ color: props.colors.accent, flexShrink: 0 }"
        />
        <span>You will be redirected to the login page shortly</span>
      </div>
    </div>
  `
}

const SuccessStep = {
  setup() {
    return {
      props
    }
  },
  template: `
    <div>
      <!-- Header -->
      <div
        :style="{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '24px'
        }"
      >
        <div
          :style="{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            flexShrink: 0
          }"
        >
          <CheckCircle2 :size="20" />
        </div>
        <div style="flex: 1">
          <h3 :style="{
            color: props.colors.textPrimary,
            margin: 0,
            fontSize: '20px',
            fontWeight: 700,
            lineHeight: '1.3'
          }">
            Account Deleted
          </h3>
          <p :style="{
            color: props.colors.textTertiary,
            margin: '4px 0 0 0',
            fontSize: '14px',
            lineHeight: '1.4'
          }">
            Your account has been successfully deleted
          </p>
        </div>
      </div>

      <!-- Success Content -->
      <div
        :style="{
          textAlign: 'center',
          padding: '20px',
          background: \`\${props.colors.success}10\`,
          border: \`1px solid \${props.colors.success}20\`,
          borderRadius: '12px',
          marginBottom: '24px'
        }"
      >
        <CheckCircle2
          :size="48"
          :style="{
            color: props.colors.success,
            marginBottom: '12px',
            display: 'block',
            margin: '0 auto 12px auto'
          }"
        />
        <p :style="{
          color: props.colors.textPrimary,
          fontSize: '16px',
          fontWeight: 600,
          margin: '0 0 8px 0'
        }">
          Goodbye!
        </p>
        <p :style="{
          color: props.colors.textSecondary,
          fontSize: '14px',
          margin: 0,
          lineHeight: '1.5'
        }">
          Your account and all associated data have been permanently
          removed from our systems.
        </p>
      </div>

      <div
        :style="{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '16px',
          background: \`\${props.colors.accent}10\`,
          borderRadius: '10px',
          fontSize: '14px',
          color: props.colors.textSecondary,
          justifyContent: 'center'
        }"
      >
        <Loader2
          :size="16"
          class="spinner"
          :style="{ color: props.colors.accent }"
        />
        <span>Redirecting to login page...</span>
      </div>
    </div>
  `
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
  align-items: center;
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

.modal-actions {
  display: flex;
  gap: 12px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: stretch;
}
</style>