<template>
  <div class="profile-container" :style="{ color: colors.textPrimary }">
    <!-- Notification -->
    <div
      v-if="notification"
      :class="['notification', notification.type]"
      :style="notificationStyle"
      role="alert"
      aria-live="polite"
    >
      <CheckCircle v-if="notification.type === 'success'" :size="20" />
      <AlertCircle v-else :size="20" />
      {{ notification.message }}
    </div>

    <div class="profile-main-container">
      <div class="profile-grid">
        <!-- Left Column - Avatar & Actions -->
        <aside class="profile-sidebar">
          <section class="profile-card avatar-section" :style="{ backgroundColor: colors.surface }">
            <div class="avatar-container">
              <img
                :src="avatarSrc"
                :alt="`Profile avatar of ${user?.name}`"
                class="avatar-image"
                :style="{ borderColor: colors.border }"
                width="128"
                height="128"
                loading="eager"
              />
              <button
                @click="avatarModal = true"
                class="avatar-edit-btn"
                :style="{ backgroundColor: colors.accent }"
                aria-label="Change profile picture"
              >
                <Camera :size="16" />
              </button>
            </div>
            <h2 class="avatar-name">{{ user?.name }}</h2>
            <p :style="{ color: colors.textTertiary }">{{ user?.email }}</p>
          </section>

          <nav class="action-buttons">
            <template v-if="editMode">
              <button
                @click="editMode = false"
                class="btn btn-outline"
                :style="{
                  backgroundColor: colors.surfaceLight,
                  borderColor: colors.border,
                  color: colors.textPrimary,
                }"
              >
                <X :size="16" />
                Cancel
              </button>
              <button
                @click="handleSave"
                :disabled="saving"
                class="btn btn-primary"
                :style="{
                  background: `linear-gradient(to right, ${colors.accent}, ${colors.accentHover})`,
                  opacity: saving ? 0.7 : 1,
                }"
              >
                <Loader2 v-if="saving" :size="16" class="spinner" />
                <Save v-else :size="16" />
                {{ saving ? 'Saving...' : 'Save Changes' }}
              </button>
            </template>
            <template v-else>
              <button
                @click="editMode = true"
                class="btn btn-primary"
                :style="{ background: `linear-gradient(to right, ${colors.accent}, ${colors.accentHover})` }"
              >
                <Edit3 :size="16" />
                Edit Profile
              </button>
              <button @click="showChangePassword = true" class="btn btn-secondary">
                <Key :size="14" />
                Change Password
              </button>
              <button
                @click="showDeleteAccount = true"
                class="btn btn-danger"
                :style="dangerButtonStyle"
                @mouseenter="onDangerHover"
                @mouseleave="onDangerLeave"
              >
                <Trash2 :size="16" />
                Delete Account
              </button>
            </template>
          </nav>
        </aside>

        <!-- Right Column - User Details -->
        <main class="profile-content">
          <section class="profile-card" :style="{ backgroundColor: colors.surface }">
            <h2 class="section-title">
              <User :size="20" />
              Personal Information
            </h2>

            <div class="fields-grid">
              <div v-for="field in userFields" :key="field.name" class="field-group">
                <label class="field-label">
                  <component :is="field.icon" :size="16" />
                  {{ field.label }}
                </label>
                <input
                  v-if="editMode"
                  :type="field.type"
                  :name="field.name"
                  v-model="user[field.name]"
                  class="field-input"
                  :style="{ borderColor: colors.border, color: colors.textPrimary }"
                  :placeholder="`Enter ${field.label.toLowerCase()}`"
                  :aria-label="field.label"
                  @focus="onInputFocus"
                  @blur="onInputBlur"
                />
                <div v-else class="field-value" :style="{ color: colors.textPrimary }">
                  {{ field.value }}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>

    <!-- Modals -->
    <AvatarModal
      v-if="avatarModal"
      :is-open="avatarModal"
      :colors="colors"
      @close="avatarModal = false"
      @update="handleAvatarUpdate"
    />

    <ChangePasswordModal
      v-if="showChangePassword"
      :is-open="showChangePassword"
      :user-id="user?.id"
      :colors="colors"
      @close="showChangePassword = false"
      @success="onPasswordSuccess"
      @error="onPasswordError"
    />

    <DeleteAccountModal
      v-if="showDeleteAccount"
      :is-open="showDeleteAccount"
      :user-id="user?.id"
      :token="token"
      :colors="colors"
      @close="showDeleteAccount = false"
      @success="onDeleteSuccess"
      @error="onDeleteError"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';
import {
  Edit3, Save, X, Trash2, User, Mail, Phone, MapPin, Camera,
  CheckCircle, AlertCircle, Loader2, Key
} from 'lucide-vue-next';
import AvatarModal from './components/AvatarModal.vue';
import ChangePasswordModal from './components/ChangePasswordModal.vue';
import DeleteAccountModal from './components/DeleteAccountModal.vue';
import { getSdkConfig } from '../sdk/config.js';

const props = defineProps({
  token: { type: String, required: true },
  user: { type: Object, default: null },
  darkMode: { type: Boolean, default: true },
  primaryColor: { type: String, default: '#00C214' }
});

const { baseUrl, apiKey, appId } = getSdkConfig();

const user = ref(null);
const loading = ref(true);
const editMode = ref(false);
const saving = ref(false);
const avatarModal = ref(false);
const showChangePassword = ref(false);
const showDeleteAccount = ref(false);
const notification = ref(null);
const dangerBtnHovered = ref(false);

const adjustColor = (hex, percent) => {
  let num = parseInt(hex.replace('#', ''), 16);
  let r = Math.min(255, Math.max(0, (num >> 16) + percent));
  let g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + percent));
  let b = Math.min(255, Math.max(0, (num & 0x0000ff) + percent));
  return `#${(b | (g << 8) | (r << 16)).toString(16).padStart(6, '0')}`;
};

const colors = computed(() => {
  const p = props.primaryColor;
  return props.darkMode ? {
    background: '#000000',
    surface: '#18181b',
    surfaceLight: '#27272a',
    surfaceLighter: '#3f3f46',
    textPrimary: '#ffffff',
    textSecondary: '#d4d4d8',
    textTertiary: '#a1a1aa',
    accent: p,
    accentHover: adjustColor(p, -15),
    success: '#10b981',
    error: '#ef4444',
    border: '#27272a',
  } : {
    background: '#ffffff',
    surface: '#fafafa',
    surfaceLight: '#f4f4f5',
    surfaceLighter: '#e4e4e7',
    textPrimary: '#18181b',
    textSecondary: '#52525b',
    textTertiary: '#71717a',
    accent: p,
    accentHover: adjustColor(p, -15),
    success: '#10b981',
    error: '#ef4444',
    border: '#e4e4e7',
  };
});

const avatarSrc = computed(() => {
  return user.value?.avatarUrl || 
    `https://api.dicebear.com/9.x/glass/svg?seed=${encodeURIComponent(user.value?.name || 'user')}`;
});

const userFields = computed(() => [
  { label: 'Full Name', value: user.value?.name, name: 'name', type: 'text', icon: User },
  { label: 'Email Address', value: user.value?.email, name: 'email', type: 'email', icon: Mail },
  { label: 'Phone Number', value: user.value?.phone || 'Not set', name: 'phone', type: 'tel', icon: Phone },
  { label: 'Address', value: user.value?.address || 'Not provided', name: 'address', type: 'text', icon: MapPin },
]);

const notificationStyle = computed(() => {
  if (!notification.value) return {};
  const isDark = props.darkMode;
  const isSuccess = notification.value.type === 'success';
  return {
    zIndex: 10000,
    backgroundColor: isSuccess
      ? (isDark ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.05)')
      : (isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.05)'),
    borderColor: isSuccess
      ? (isDark ? 'rgba(16, 185, 129, 0.3)' : 'rgba(16, 185, 129, 0.2)')
      : (isDark ? 'rgba(239, 68, 68, 0.3)' : 'rgba(239, 68, 68, 0.2)'),
    color: isSuccess
      ? (isDark ? '#34d399' : '#059669')
      : (isDark ? '#f87171' : '#dc2626'),
  };
});

const dangerButtonStyle = computed(() => ({
  backgroundColor: props.darkMode
    ? (dangerBtnHovered.value ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.1)')
    : (dangerBtnHovered.value ? 'rgba(239, 68, 68, 0.25)' : 'rgba(239, 68, 68, 0.15)'),
  color: colors.value.error,
  border: `1px solid ${props.darkMode ? 'rgba(239, 68, 68, 0.4)' : 'rgba(239, 68, 68, 0.3)'}`,
  padding: '8px 14px',
  borderRadius: '8px',
  fontWeight: 500,
  transition: 'all 0.2s ease',
}));

const showNotification = (type, message) => {
  notification.value = { type, message };
  setTimeout(() => { notification.value = null; }, 3000);
};

const handleAvatarUpdate = async (newAvatarUrl) => {
  if (!user.value) return false;
  try {
    const updateData = { ...user.value, avatarUrl: newAvatarUrl };
    const { data } = await axios.put(
      `${baseUrl}/users/update/${user.value.id}`,
      updateData,
      { headers: { 'x-api-key': apiKey } }
    );

    if (data.success) {
      user.value = updateData;
      localStorage.setItem('userInfo', JSON.stringify({ ...updateData, token: props.token }));
      showNotification('success', 'Avatar updated successfully!');
      return true;
    } else {
      showNotification('error', data.message || 'Failed to update avatar');
      return false;
    }
  } catch (error) {
    console.error('Avatar update error:', error);
    showNotification('error', 'Failed to update avatar');
    return false;
  }
};

const handleSave = async () => {
  if (!user.value) return;
  saving.value = true;
  try {
    const { data } = await axios.put(
      `${baseUrl}/users/update/${user.value.id}`,
      user.value,
      { headers: { 'x-api-key': apiKey } }
    );

    if (data.success) {
      user.value = data.user;
      editMode.value = false;
      localStorage.setItem('userInfo', JSON.stringify({ ...data.user, token: props.token }));
      showNotification('success', 'Profile updated successfully');
    } else {
      showNotification('error', data.message);
    }
  } catch (err) {
    console.error(err);
    showNotification('error', 'Update failed');
  } finally {
    saving.value = false;
  }
};

const validateUser = async (userId) => {
  try {
    const { data } = await axios.get(
      `${baseUrl}/users/check-user/${userId}?appId=${appId}`,
      { headers: { 'x-api-key': apiKey } }
    );

    if (!data.success || !data.exists) {
      console.warn('User not found, clearing session...');
      localStorage.removeItem('userInfo');
      user.value = null;
    }
  } catch (err) {
    console.error('User check failed:', err);
    localStorage.removeItem('userInfo');
    user.value = null;
  }
};

const onPasswordSuccess = (msg) => showNotification('success', msg);
const onPasswordError = (msg) => showNotification('error', msg);
const onDeleteSuccess = (msg) => showNotification('success', msg);
const onDeleteError = (msg) => showNotification('error', msg);

const onDangerHover = () => { dangerBtnHovered.value = true; };
const onDangerLeave = () => { dangerBtnHovered.value = false; };

const onInputFocus = (e) => {
  e.target.style.borderColor = colors.value.accent;
  e.target.style.boxShadow = `0 0 0 3px ${colors.value.accent}20`;
};

const onInputBlur = (e) => {
  e.target.style.borderColor = colors.value.border;
  e.target.style.boxShadow = 'none';
};

onMounted(() => {
  if (props.user) {
    user.value = props.user;
    loading.value = false;
    validateUser(props.user.id);
  } else {
    const stored = localStorage.getItem('userInfo');
    if (stored) {
      const parsed = JSON.parse(stored);
      user.value = parsed;
      loading.value = false;
      validateUser(parsed.id);
    } else {
      loading.value = false;
    }
  }
});

watch(() => props.user, (newUser) => {
  if (newUser) {
    user.value = newUser;
  }
});
</script>

<style scoped>
.profile-container {
  width: 100%;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.5;
}

.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 12px 24px;
  border-radius: 12px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(8px);
  border: 1px solid;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  max-width: 400px;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.profile-main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.profile-grid {
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr;
}

.profile-sidebar {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.profile-content {
  min-width: 0;
}

.profile-card {
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.avatar-section {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar-container {
  position: relative;
  display: inline-block;
  margin-bottom: 16px;
}

.avatar-image {
  width: 128px;
  height: 128px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
  border: 3px solid;
}

.avatar-edit-btn {
  position: absolute;
  bottom: 8px;
  right: 8px;
  color: white;
  padding: 8px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-edit-btn:hover {
  transform: scale(1.1);
}

.avatar-name {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 4px 0;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.btn {
  padding: 8px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-decoration: none;
  min-height: 44px;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-secondary {
  background-color: #27272a;
  color: white;
}

.btn-secondary:hover {
  background-color: #3f3f46;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 24px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.fields-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label {
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
}

.field-input {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid;
  background: transparent;
  color: inherit;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s ease;
  min-height: 44px;
  width: 100%;
  box-sizing: border-box;
}

.field-value {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid transparent;
  font-size: 14px;
  min-height: 44px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (min-width: 768px) {
  .fields-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .field-group:nth-last-child(1):nth-child(odd) {
    grid-column: 1 / -1;
  }
}

@media (min-width: 1024px) {
  .profile-grid {
    grid-template-columns: 1fr 2fr;
    gap: 32px;
  }
}
</style>