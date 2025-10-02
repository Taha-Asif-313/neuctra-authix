<template>
    <div ref="wrapperRef" :class="className" :style="wrapperStyle" role="menu" aria-label="User menu">
        <!-- Modern Avatar Button with User Info -->
        <div ref="buttonRef" :style="avatarButtonStyle" @click="toggleDropdown" @keydown="handleButtonKeydown"
            tabindex="0" role="button" :aria-haspopup="true" :aria-expanded="open" aria-label="Toggle user menu"
            @blur="handleButtonBlur">
            <img v-if="user?.avatarUrl" :src="user.avatarUrl" :alt="`${user.name}'s avatar`" :style="avatarImageStyle"
                loading="lazy" @error="handleAvatarError" />
            <img v-else :src="defaultAvatarUrl" alt="Default user avatar" :style="avatarImageStyle" loading="lazy" />

            <div v-if="!isMobile" :style="userInfoStyle">
                <div :style="userNameStyle" :title="user?.name">
                    {{ user?.name || 'Guest' }}
                </div>
                <div v-if="user?.email" :style="userEmailStyle" :title="user.email">
                    {{ user.email }}
                </div>
            </div>

            <ChevronDown :size="isMobile ? 14 : 16" :style="chevronStyle" aria-hidden="true" />
        </div>

        <!-- Modern Dropdown Menu -->
        <div v-if="open" :style="dropdownStyle" role="menu" aria-label="User options">
            <div v-if="loading" :style="loadingTextStyle" role="status" aria-live="polite">
                Loading user information...
            </div>

            <template v-else-if="user">
                <!-- User Profile Section -->
                <div :style="userSectionStyle">
                    <img v-if="user?.avatarUrl" :src="user.avatarUrl" :alt="`${user.name}'s profile picture`"
                        :style="dropdownAvatarStyle" loading="lazy" @error="handleDropdownAvatarError" />
                    <img v-else :src="dropdownDefaultAvatarUrl" :alt="`${user.name}'s default avatar`"
                        :style="dropdownAvatarStyle" loading="lazy" />
                    <div :style="dropdownUserInfoStyle">
                        <div :style="dropdownUserNameStyle" :title="user.name">
                            {{ user.name }}
                        </div>
                        <div :style="dropdownUserEmailStyle" :title="user.email">
                            {{ user.email }}
                        </div>
                    </div>
                </div>

                <!-- Menu Items -->
                <div :style="dropdownSectionStyle">
                    <!-- Profile Menu Item - Only show if enabled AND we have a profile URL -->
                    <button v-if="showProfileMenuItem && profileUrlToUse" :style="menuItemStyle"
                        @click="handleProfileClick" @mouseover="handleMenuItemMouseOver"
                        @mouseout="handleMenuItemMouseOut" @keydown="handleProfileKeydown" role="menuitem" tabindex="0">
                        <User :style="iconStyle" aria-hidden="true" />
                        <span :style="menuItemTextStyle">{{ profileLabel }}</span>
                    </button>

                    <!-- Settings Menu Item - Only show if enabled AND we have a settings URL -->
                    <button v-if="showSettingsMenuItem && settingsUrl" :style="menuItemStyle"
                        @click="handleSettingsClick" @mouseover="handleMenuItemMouseOver"
                        @mouseout="handleMenuItemMouseOut" @keydown="handleSettingsKeydown" role="menuitem"
                        tabindex="0">
                        <Settings :style="iconStyle" aria-hidden="true" />
                        <span :style="menuItemTextStyle">{{ settingsLabel }}</span>
                    </button>

                    <!-- View Profile Menu Item - Only show if enabled AND user has profile URL -->
                    <a v-if="showViewProfileMenuItem && user.profileUrl" :href="user.profileUrl" target="_blank"
                        rel="noopener noreferrer" :style="menuItemStyle" @mouseover="handleMenuItemMouseOver"
                        @mouseout="handleMenuItemMouseOut" role="menuitem" tabindex="0">
                        <Mail :style="iconStyle" aria-hidden="true" />
                        <span :style="menuItemTextStyle">{{ viewProfileLabel }}</span>
                    </a>
                </div>

                <!-- Logout Section -->
                <div :style="dropdownSectionStyle">
                    <button :style="logoutButtonStyle" @click="handleLogout" @mouseover="handleMenuItemMouseOver"
                        @mouseout="handleMenuItemMouseOut" @keydown="handleLogoutKeydown" role="menuitem" tabindex="0">
                        <LogOut :style="{ ...iconStyle, color: colors.error }" aria-hidden="true" />
                        <span :style="menuItemTextStyle">{{ logoutLabel }}</span>
                    </button>
                </div>
            </template>

            <div v-else :style="errorStateStyle" role="alert">
                <div :style="{ display: 'flex', alignItems: 'center', gap: '8px' }">
                    <AlertCircle :size="16" aria-hidden="true" />
                    <span>{{ error || 'Not signed in' }}</span>
                </div>
                <button v-if="error && error !== 'Not signed in'" :style="retryButtonStyle" @click="handleRetry"
                    @mouseover="handleRetryMouseOver" @mouseout="handleRetryMouseOut">
                    Try Again
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, CSSProperties } from 'vue'
import {
    Info,
    LogOut,
    Mail,
    User,
    Settings,
    ChevronDown,
    AlertCircle
} from 'lucide-vue-next'
import { getSdkConfig } from '../sdk/config.js'
import axios from 'axios'

interface UserInfo {
    id: string
    name: string
    email: string
    avatarUrl?: string
    profileUrl?: string
}

interface UserButtonProps {
    darkMode?: boolean
    primaryColor?: string
    onLogout: () => void
    propUser?: UserInfo | null
    className?: string
    // New props for custom URLs
    profileUrl?: string
    settingsUrl?: string
    // Props for customizing menu items
    showProfileMenuItem?: boolean
    showSettingsMenuItem?: boolean
    showViewProfileMenuItem?: boolean
    // Custom labels
    profileLabel?: string
    settingsLabel?: string
    viewProfileLabel?: string
    logoutLabel?: string
}

const props = withDefaults(defineProps<UserButtonProps>(), {
    darkMode: true,
    primaryColor: '#3b82f6',
    className: '',
    // New URL props with defaults
    profileUrl: undefined,
    settingsUrl: undefined,
    // Menu item visibility with defaults
    showProfileMenuItem: true,
    showSettingsMenuItem: true,
    showViewProfileMenuItem: true,
    // Custom labels with defaults
    profileLabel: 'My Profile',
    settingsLabel: 'Settings',
    viewProfileLabel: 'View Profile',
    logoutLabel: 'Sign Out'
})

const { baseUrl, apiKey, appId } = getSdkConfig()

// Reactive state
const open = ref(false)
const user = ref<UserInfo | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const alignRight = ref(false)
const isMobile = ref(false)

// Refs
const wrapperRef = ref<HTMLDivElement>()
const buttonRef = ref<HTMLDivElement>()

// Computed properties
const profileUrlToUse = computed(() => {
    return props.profileUrl || user.value?.profileUrl
})

const defaultAvatarUrl = computed(() => {
    return `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.value?.name || 'user'}`
})

const dropdownDefaultAvatarUrl = computed(() => {
    return `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.value?.name || 'user'}`
})

// Modern color scheme with accessibility
const colors = computed(() => {
    return props.darkMode
        ? {
            surface: '#000000',
            surfaceElevated: '#000000',
            surfaceHover: '#262626',
            border: '#262626',
            borderLight: '#404040',
            textPrimary: '#ffffff',
            textSecondary: '#a3a3a3',
            textTertiary: '#737373',
            accent: props.primaryColor,
            accentHover: `${props.primaryColor}e6`,
            error: '#ef4444',
            errorHover: '#dc2626',
            gradient: `linear-gradient(135deg, ${props.primaryColor}, ${props.primaryColor}dd)`,
        }
        : {
            surface: '#ffffff',
            surfaceElevated: '#fafafa',
            surfaceHover: '#f5f5f5',
            border: '#e5e5e5',
            borderLight: '#f0f0f0',
            textPrimary: '#171717',
            textSecondary: '#525252',
            textTertiary: '#a3a3a3',
            accent: props.primaryColor,
            accentHover: `${props.primaryColor}e6`,
            error: '#ef4444',
            errorHover: '#dc2626',
            gradient: `linear-gradient(135deg, ${props.primaryColor}, ${props.primaryColor}dd)`,
        }
})

// Responsive styles
const wrapperStyle: CSSProperties = {
    position: 'relative',
    display: 'inline-block',
}

const avatarButtonStyle = computed(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: isMobile.value ? '6px' : '8px',
    padding: isMobile.value ? '6px 10px 6px 6px' : '8px 12px 8px 8px',
    borderRadius: '24px',
    backgroundColor: colors.value.surface,
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    minWidth: isMobile.value ? 'auto' : '140px',
    maxWidth: isMobile.value ? '200px' : 'none',
    outline: 'none',
}))

const avatarImageStyle = computed(() => ({
    width: isMobile.value ? '28px' : '32px',
    height: isMobile.value ? '28px' : '32px',
    borderRadius: '50%',
    objectFit: 'cover' as const,
    border: `2px solid ${colors.value.borderLight}`,
    flexShrink: 0,
}))

const userInfoStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start',
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
}

const userNameStyle = computed(() => ({
    fontSize: isMobile.value ? '13px' : '14px',
    fontWeight: 600,
    color: colors.value.textPrimary,
    lineHeight: '1.2',
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: isMobile.value ? '80px' : '120px',
}))

const userEmailStyle = computed(() => ({
    fontSize: isMobile.value ? '11px' : '12px',
    color: colors.value.textTertiary,
    lineHeight: '1.2',
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: isMobile.value ? '80px' : '120px',
}))

const chevronStyle = computed(() => ({
    transition: 'transform 0.2s ease',
    transform: open.value ? 'rotate(180deg)' : 'rotate(0deg)',
    color: colors.value.textTertiary,
    flexShrink: 0,
}))

const dropdownStyle = computed(() => ({
    position: 'absolute' as const,
    top: '100%',
    marginTop: '8px',
    [alignRight.value ? 'left' : 'right']: '0',
    backgroundColor: colors.value.surfaceElevated,
    border: `1px solid ${colors.value.border}`,
    borderRadius: '12px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1)',
    width: 'min(280px, 90vw)',
    maxWidth: 'calc(100vw - 20px)',
    padding: '6px 6px 16px 6px',
    zIndex: 1000,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    overflow: 'hidden',
}))

const dropdownSectionStyle = {
    padding: '0px 16px',
}

const userSectionStyle = computed(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: isMobile.value ? '10px' : '12px',
    padding: isMobile.value ? '14px' : '16px',
}))

const dropdownAvatarStyle = computed(() => ({
    width: isMobile.value ? '40px' : '48px',
    height: isMobile.value ? '40px' : '48px',
    borderRadius: '50%',
    objectFit: 'cover' as const,
    border: `2px solid ${colors.value.borderLight}`,
    flexShrink: 0,
}))

const dropdownUserInfoStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    flex: 1,
    minWidth: 0,
}

const dropdownUserNameStyle = computed(() => ({
    fontSize: isMobile.value ? '15px' : '16px',
    fontWeight: 600,
    color: colors.value.textPrimary,
    lineHeight: '1.2',
    marginBottom: '2px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
}))

const dropdownUserEmailStyle = computed(() => ({
    fontSize: isMobile.value ? '13px' : '14px',
    color: colors.value.textSecondary,
    lineHeight: '1.2',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
}))

const menuItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    color: colors.value.textPrimary,
    textDecoration: 'none',
    border: 'none',
    background: 'none',
    width: '100%',
    fontSize: '14px',
    textAlign: 'left' as const,
    outline: 'none',
}

const menuItemTextStyle = {
    flex: 1,
}

const iconStyle = computed(() => ({
    width: '18px',
    height: '18px',
    color: colors.value.textSecondary,
    flexShrink: 0,
}))

const logoutButtonStyle = computed(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    background: 'none',
    border: 'none',
    width: '100%',
    fontSize: '14px',
    color: colors.value.error,
    textAlign: 'left' as const,
    outline: 'none',
}))

const loadingTextStyle = computed(() => ({
    padding: '20px 16px',
    textAlign: 'center' as const,
    color: colors.value.textSecondary,
    fontSize: '14px',
}))

const errorStateStyle = computed(() => ({
    padding: '20px 16px',
    textAlign: 'center' as const,
    color: colors.value.textSecondary,
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    flexDirection: 'column' as const,
}))

const retryButtonStyle = computed(() => ({
    marginTop: '8px',
    padding: '8px 16px',
    backgroundColor: colors.value.accent,
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 500,
    transition: 'background-color 0.2s ease',
}))

// Methods
const validateUser = async (userId: string) => {
    try {
        if (!userId) {
            throw new Error('Invalid user ID')
        }

        const { data } = await axios.get(
            `${baseUrl}/users/check-user/${userId}?appId=${appId}`,
            {
                headers: { 'x-api-key': apiKey },
                timeout: 10000,
            }
        )

        if (!data.success || !data.exists) {
            console.warn('User not found, clearing session...')
            localStorage.removeItem('userInfo')
            user.value = null
            error.value = 'Session expired'
        }
    } catch (err: any) {
        console.error('User validation failed:', err)
        const errorMessage =
            err.response?.status === 404
                ? 'User not found'
                : err.code === 'NETWORK_ERROR'
                    ? 'Network error'
                    : 'Validation failed'

        error.value = errorMessage
        if (err.response?.status === 404) {
            localStorage.removeItem('userInfo')
            user.value = null
        }
    }
}

const initUser = async () => {
    try {
        loading.value = true
        error.value = null

        if (props.propUser) {
            if (!props.propUser.id || !props.propUser.name || !props.propUser.email) {
                throw new Error('Invalid user data provided')
            }
            user.value = props.propUser
            await validateUser(props.propUser.id)
        } else {
            const stored = localStorage.getItem('userInfo')
            if (stored) {
                try {
                    const parsed: UserInfo = JSON.parse(stored)
                    if (!parsed.id || !parsed.name || !parsed.email) {
                        throw new Error('Invalid stored user data')
                    }
                    user.value = parsed
                    await validateUser(parsed.id)
                } catch (parseError) {
                    console.error('Failed to parse stored user data:', parseError)
                    localStorage.removeItem('userInfo')
                    error.value = 'Invalid user data'
                }
            }
        }
    } catch (err: any) {
        console.error('User initialization failed:', err)
        error.value = err.message || 'Failed to load user'
    } finally {
        loading.value = false
    }
}

const toggleDropdown = () => {
    open.value = !open.value
}

const handleButtonKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        toggleDropdown()
    }
}

const handleButtonBlur = (e: FocusEvent) => {
    const target = e.target as HTMLDivElement
    target.style.outline = 'none'
}

const handleMenuItemMouseOver = (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement
    target.style.backgroundColor = colors.value.surfaceHover
}

const handleMenuItemMouseOut = (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement
    target.style.backgroundColor = 'transparent'
}

const handleRetryMouseOver = (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement
    target.style.backgroundColor = colors.value.accentHover
}

const handleRetryMouseOut = (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement
    target.style.backgroundColor = colors.value.accent
}

const handleAvatarError = (e: Event) => {
    const target = e.target as HTMLImageElement
    target.src = defaultAvatarUrl.value
}

const handleDropdownAvatarError = (e: Event) => {
    const target = e.target as HTMLImageElement
    target.src = dropdownDefaultAvatarUrl.value
}

const handleProfileClick = () => {
    const url = profileUrlToUse.value
    if (url) {
        window.open(url, '_blank', 'noopener,noreferrer')
    }
}

const handleProfileKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleProfileClick()
    }
}

const handleSettingsClick = () => {
    if (props.settingsUrl) {
        window.open(props.settingsUrl, '_blank', 'noopener,noreferrer')
    }
}

const handleSettingsKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleSettingsClick()
    }
}

const handleLogout = () => {
    props.onLogout()
}

const handleLogoutKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleLogout()
    }
}

const handleRetry = () => {
    error.value = null
    loading.value = true
    const stored = localStorage.getItem('userInfo')
    if (stored) {
        try {
            const parsed: UserInfo = JSON.parse(stored)
            user.value = parsed
            validateUser(parsed.id)
        } catch {
            error.value = 'Invalid user data'
        }
    }
    loading.value = false
}

const updateDropdownPosition = () => {
    if (open.value && buttonRef.value) {
        const rect = buttonRef.value.getBoundingClientRect()
        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight

        const dropdownWidth = 280
        const dropdownHeight = 300
        const spaceOnRight = windowWidth - rect.right
        const spaceOnLeft = rect.left
        const spaceBelow = windowHeight - rect.bottom

        const shouldAlignRight = spaceOnRight >= dropdownWidth || spaceOnRight > spaceOnLeft
        alignRight.value = shouldAlignRight

        if (spaceBelow < dropdownHeight && rect.top > dropdownHeight) {
            // Would implement upward opening if needed
        }
    }
}

const handleClickOutside = (e: MouseEvent) => {
    if (
        wrapperRef.value &&
        !wrapperRef.value.contains(e.target as Node) &&
        !buttonRef.value?.contains(e.target as Node)
    ) {
        open.value = false
    }
}

const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
        open.value = false
    }
}

const handleScroll = () => {
    if (open.value) {
        open.value = false
    }
}

const checkMobile = () => {
    isMobile.value = window.innerWidth < 768
}

// Lifecycle
onMounted(() => {
    checkMobile()
    window.addEventListener('resize', checkMobile)
    initUser()
})

onUnmounted(() => {
    window.removeEventListener('resize', checkMobile)
})

// Watchers
watch(open, (newVal) => {
    if (newVal) {
        updateDropdownPosition()
        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleEscapeKey)
        window.addEventListener('scroll', handleScroll, { passive: true })
    } else {
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('keydown', handleEscapeKey)
        window.removeEventListener('scroll', handleScroll)
    }
})

watch(() => props.propUser, () => {
    initUser()
})
</script>