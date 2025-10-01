<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import axios from "axios";
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    User,
    KeyRound,
    Loader,
    CheckCircle,
    AlertCircle,
} from "lucide-vue-next";
import { loginUser } from "../api/login.js";
import { getSdkConfig } from "../sdk/config.js";

interface AuthFormProps {
    logoUrl?: string;
    title?: string;
    subtitle?: string;
    footerText?: string;
    primaryColor?: string;
    gradient?: string;
    darkMode?: boolean;
    signupUrl?: string;
    onSuccess?: (user: any) => void;
    onError?: (error: any) => void;
}

const props = withDefaults(defineProps<AuthFormProps>(), {
    title: "Sign In to Your Account",
    subtitle: "Welcome back! Please enter your details",
    footerText: "Secure authentication powered by Neuctra Authix",
    primaryColor: "#00C214",
    gradient: "linear-gradient(135deg, #22c55e, #00C214)",
    darkMode: true,
});

// SDK Config
const { baseUrl, apiKey, appId } = getSdkConfig();

// State
const mode = ref<"login" | "forgot">("login");
const step = ref(1);
const showPassword = ref(false);
const loading = ref(false);
const message = ref<{ type: "success" | "error"; text: string } | null>(null);

// Login states
const email = ref("");
const password = ref("");

// Forgot/reset states
const formData = reactive({
    email: "",
    otp: "",
    newPassword: "",
    appId,
});

// Responsive
const containerWidth = ref("100%");
const isMobile = ref(window.innerWidth < 768);

const updateResponsive = () => {
    const width = window.innerWidth;
    isMobile.value = width < 768;
    
    if (width < 480) {
        containerWidth.value = "95%";
    } else if (width < 768) {
        containerWidth.value = "420px";
    } else if (width < 1024) {
        containerWidth.value = "390px";
    } else {
        containerWidth.value = "390px";
    }
};

onMounted(() => {
    updateResponsive();
    window.addEventListener("resize", updateResponsive);
});

// Theme
const textColor = computed(() => (props.darkMode ? "#ffffff" : "#111827"));
const subTextColor = computed(() => (props.darkMode ? "#a1a1aa" : "#6b7280"));
const inputBg = computed(() =>
    props.darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)"
);
const inputBorder = computed(() =>
    props.darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
);

// Handlers
const handleLogin = async (e: Event) => {
    e.preventDefault();
    loading.value = true;
    message.value = null;

    try {
        const user = await loginUser(
            { email: email.value, password: password.value, appId },
            { baseUrl, apiKey }
        );
        message.value = { type: "success", text: `Welcome ${user.name}` };
        props.onSuccess?.(user);
    } catch (err: any) {
        const errorMsg = err.message || "Login failed";
        message.value = { type: "error", text: errorMsg };
        props.onError?.(err);
    } finally {
        loading.value = false;
    }
};

const handleSendOTP = async (e: Event) => {
    e.preventDefault();
    loading.value = true;
    message.value = null;
    try {
        const res = await axios.post(
            `${baseUrl}/users/forgot-password`,
            { email: formData.email, appId },
            { headers: { "x-api-key": apiKey } }
        );
        if (res.data.success) {
            step.value = 2;
            message.value = { type: "success", text: "OTP sent to your email" };
        } else {
            message.value = {
                type: "error",
                text: res.data.message || "Failed to send OTP",
            };
        }
    } catch (err: any) {
        message.value = {
            type: "error",
            text: err.response?.data?.message || "Something went wrong",
        };
    } finally {
        loading.value = false;
    }
};

const handleResetPassword = async (e: Event) => {
    e.preventDefault();
    loading.value = true;
    message.value = null;
    try {
        const res = await axios.post(
            `${baseUrl}/users/reset-password`,
            formData,
            { headers: { "x-api-key": apiKey } }
        );
        if (res.data.success) {
            message.value = { type: "success", text: "Password reset successfully!" };
            step.value = 1;
            formData.email = "";
            formData.otp = "";
            formData.newPassword = "";
            mode.value = "login";
        } else {
            message.value = { type: "error", text: res.data.message || "Reset failed" };
        }
    } catch (err: any) {
        message.value = {
            type: "error",
            text: err.response?.data?.message || "Something went wrong",
        };
    } finally {
        loading.value = false;
    }
};

// Common Input Style
const inputStyle = computed(() => ({
    width: "100%",
    padding: isMobile.value ? "14px 14px 14px 44px" : "16px 16px 16px 44px",
    backgroundColor: inputBg.value,
    border: `1px solid ${inputBorder.value}`,
    borderRadius: "12px",
    color: textColor.value,
    fontSize: isMobile.value ? "15px" : "15px",
    outline: "none",
    transition: "all 0.2s ease",
}));
</script>

<template>
    <div :style="{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        padding: isMobile ? '20px 16px' : '40px 20px',
        width: '100%',
        boxSizing: 'border-box'
    }">
        <div :style="{
            width: containerWidth,
            maxWidth: '420px',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '12px',
            fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
            backgroundColor: props.darkMode ? '#000000' : '#ffffff',
            padding: isMobile ? '28px 20px' : '32px 28px',
            boxSizing: 'border-box',
            margin: '0 auto'
        }">
            <!-- Header -->
            <div :style="{
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                marginBottom: isMobile ? '24px' : '28px',
                textAlign: 'center'
            }">
                <img v-if="props.logoUrl" :src="props.logoUrl" alt="Logo"
                    :style="{
                        height: isMobile ? '56px' : '60px', 
                        width: isMobile ? '56px' : '60px', 
                        marginBottom: isMobile ? '12px' : '16px'
                    }" />
                <User v-else :size="isMobile ? 36 : 40" :color="props.primaryColor" 
                    :style="{ marginBottom: isMobile ? '12px' : '16px' }" />

                <h2 :style="{ 
                    fontSize: isMobile ? '22px' : '24px', 
                    fontWeight: 700, 
                    color: textColor, 
                    margin: 0,
                    lineHeight: '1.3'
                }">
                    {{ mode === "login" ? props.title : step === 1 ? "Forgot Password" : "Reset Password" }}
                </h2>
                <p :style="{ 
                    fontSize: isMobile ? '13px' : '14px', 
                    color: subTextColor, 
                    margin: isMobile ? '8px 0 0 0' : '10px 0 0 0',
                    lineHeight: '1.4',
                    maxWidth: '320px'
                }">
                    {{ mode === "login" ? props.subtitle : "Follow the steps to reset your password" }}
                </p>
            </div>

            <!-- Login Form -->
            <form v-if="mode === 'login'" @submit="handleLogin"
                :style="{
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: isMobile ? '16px' : '18px'
                }">

                <!-- Email -->
                <div :style="{ display: 'flex', flexDirection: 'column', gap: '6px' }">
                    <label for="login-email" :style="{ fontSize: '14px', fontWeight: 500, color: textColor }">
                        Email Address
                    </label>
                    <div style="position: relative">
                        <Mail :size="20"
                            :style="{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: subTextColor }" />
                        <input id="login-email" type="email" placeholder="Enter your email" v-model="email"
                            :style="inputStyle" required />
                    </div>
                </div>

                <!-- Password -->
                <div :style="{ display: 'flex', flexDirection: 'column', gap: '6px' }">
                    <label for="login-password" :style="{ fontSize: '14px', fontWeight: 500, color: textColor }">
                        Password
                    </label>
                    <div style="position: relative">
                        <Lock :size="20"
                            :style="{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: subTextColor }" />
                        <input id="login-password" :type="showPassword ? 'text' : 'password'"
                            placeholder="Enter your password" v-model="password" :style="inputStyle" required />

                        <!-- Toggle Password -->
                        <button type="button" @click="showPassword = !showPassword" :style="{
                            position: 'absolute',
                            right: '14px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'transparent',
                            border: 'none',
                            color: subTextColor,
                            cursor: 'pointer',
                            padding: '4px'
                        }">
                            <EyeOff v-if="showPassword" :size="20" />
                            <Eye v-else :size="20" />
                        </button>
                    </div>
                </div>

                <!-- Links -->
                <div :style="{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    fontSize: '13px', 
                    marginTop: '8px',
                    flexWrap: 'wrap',
                    gap: '8px'
                }">
                    <a v-if="props.signupUrl" :href="props.signupUrl"
                        :style="{ color: props.primaryColor, textDecoration: 'none', fontWeight: 500 }">
                        Create new account
                    </a>
                    <button type="button" @click="mode = 'forgot'"
                        :style="{ 
                            background: 'none', 
                            border: 'none', 
                            color: props.primaryColor, 
                            fontWeight: 500, 
                            cursor: 'pointer',
                            padding: 0
                        }">
                        Forgot password?
                    </button>
                </div>

                <!-- Submit -->
                <button type="submit" :disabled="loading" :style="{
                    padding: isMobile ? '14px' : '16px',
                    background: props.gradient,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: 600,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1,
                    marginTop: isMobile ? '12px' : '16px',
                    fontSize: isMobile ? '15px' : '16px',
                    transition: 'all 0.2s ease'
                }">
                    {{ loading ? "Signing In..." : "Sign In" }}
                </button>
            </form>

            <!-- Forgot / Reset -->
            <form v-if="mode === 'forgot'" @submit="step === 1 ? handleSendOTP : handleResetPassword"
                :style="{
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: isMobile ? '16px' : '18px'
                }">
                <!-- Step 1: Email -->
                <div v-if="step === 1" :style="{ display: 'flex', flexDirection: 'column', gap: '6px' }">
                    <label for="forgot-email" :style="{ fontSize: '14px', fontWeight: 500, color: textColor }">
                        Email Address
                    </label>
                    <div style="position: relative">
                        <Mail :size="20"
                            :style="{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: subTextColor }" />
                        <input id="forgot-email" type="email" name="email" placeholder="Enter your email"
                            v-model="formData.email" :style="inputStyle" required />
                    </div>
                </div>

                <!-- Step 2: OTP + New Password -->
                <template v-else>
                    <div :style="{ display: 'flex', flexDirection: 'column', gap: '6px' }">
                        <label for="otp" :style="{ fontSize: '14px', fontWeight: 500, color: textColor }">
                            One-Time Password (OTP)
                        </label>
                        <div style="position: relative">
                            <KeyRound :size="20"
                                :style="{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: subTextColor }" />
                            <input id="otp" type="text" name="otp" placeholder="Enter OTP" v-model="formData.otp"
                                :style="inputStyle" required />
                        </div>
                    </div>

                    <div :style="{ display: 'flex', flexDirection: 'column', gap: '6px' }">
                        <label for="newPassword" :style="{ fontSize: '14px', fontWeight: 500, color: textColor }">
                            New Password
                        </label>
                        <div style="position: relative">
                            <Lock :size="20"
                                :style="{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: subTextColor }" />
                            <input id="newPassword" type="password" name="newPassword" placeholder="Enter new password"
                                v-model="formData.newPassword" :style="inputStyle" required />
                        </div>
                    </div>
                </template>

                <button type="submit" :disabled="loading"
                    :style="{ 
                        padding: isMobile ? '14px' : '16px', 
                        background: props.gradient, 
                        color: '#fff', 
                        border: 'none', 
                        fontSize: isMobile ? '15px' : '16px', 
                        borderRadius: '10px', 
                        fontWeight: 600,
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.7 : 1,
                        transition: 'all 0.2s ease'
                    }">
                    {{ loading ? "Please wait..." : step === 1 ? "Send Reset OTP" : "Reset Password" }}
                </button>

                <button type="button" @click="(mode = 'login'), (step = 1)"
                    :style="{ 
                        background: 'none', 
                        border: 'none', 
                        color: subTextColor, 
                        marginTop: '8px', 
                        cursor: 'pointer',
                        fontSize: '14px',
                        padding: '8px 0'
                    }">
                    Back to Login
                </button>
            </form>

            <!-- Messages -->
            <div v-if="message" :style="{
                marginTop: isMobile ? '20px' : '24px',
                padding: isMobile ? '14px' : '16px',
                borderRadius: '12px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                backgroundColor: message.type === 'success'
                    ? props.primaryColor + '15'
                    : 'rgba(239,68,68,0.1)',
                border: message.type === 'success'
                    ? `1px solid ${props.primaryColor}30`
                    : '1px solid rgba(239,68,68,0.3)',
                color: message.type === 'success'
                    ? props.primaryColor
                    : '#ef4444',
            }">
                <CheckCircle v-if="message.type === 'success'" :size="20" />
                <AlertCircle v-else :size="20" />
                <span :style="{ lineHeight: '1.4', flex: 1 }">{{ message.text }}</span>
            </div>

            <!-- Footer -->
            <div :style="{ 
                textAlign: 'center', 
                fontSize: isMobile ? '12px' : '13px', 
                color: subTextColor, 
                marginTop: isMobile ? '24px' : '28px',
                lineHeight: '1.4',
                padding: '0 8px'
            }">
                Secure authentication powered by
                <span :style="{ color: props.primaryColor, fontWeight: 600 }">Neuctra Authix</span>
            </div>
        </div>
    </div>
</template>