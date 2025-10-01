<script setup lang="ts">
import { ref, reactive, computed, onMounted, onBeforeUnmount, watch, CSSProperties } from "vue";
import { Info, LogOut, Mail, User } from "lucide-vue-next";

// --- Props ---
interface UserInfo {
    name: string;
    email: string;
    avatarUrl?: string;
    profileUrl?: string;
}

interface UserButtonProps {
    darkMode?: boolean;
    primaryColor?: string;
    onLogout: () => void;
    profileUrl?: string;
}

const props = withDefaults(defineProps<UserButtonProps>(), {
    darkMode: true,
    primaryColor: "#3b82f6",
});

// --- State ---
const open = ref(false);
const user = ref<UserInfo | null>(null);
const error = ref<string | null>(null);
const dropdownRef = ref<HTMLElement | null>(null);

// --- Adjust Color util ---
const adjustColor = (hex: string, percent: number) => {
    let num = parseInt(hex.replace("#", ""), 16);
    let r = (num >> 16) + percent;
    let g = ((num >> 8) & 0x00ff) + percent;
    let b = (num & 0x0000ff) + percent;
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));
    return `#${(b | (g << 8) | (r << 16)).toString(16).padStart(6, "0")}`;
};

// --- Colors ---
const colors = computed(() =>
    props.darkMode
        ? {
            background: "#09090B",
            surface: "#09090B",
            border: "#27272a",
            textPrimary: "#ffffff",
            textSecondary: "#a1a1aa",
            accent: props.primaryColor,
            accentHover: adjustColor(props.primaryColor, -30),
        }
        : {
            background: "#ffffff",
            surface: "#f9fafb",
            border: "#e4e4e7",
            textPrimary: "#111827",
            textSecondary: "#6b7280",
            accent: props.primaryColor,
            accentHover: adjustColor(props.primaryColor, -30),
        }
);

// --- Load user from localStorage ---
onMounted(() => {
    try {
        const stored = localStorage.getItem("userInfo");
        if (stored) {
            const parsed: UserInfo = JSON.parse(stored);
            if (parsed?.name && parsed?.email) {
                user.value = { ...parsed, profileUrl: props.profileUrl || parsed.profileUrl };
            } else {
                error.value = "Invalid user data format.";
            }
        } else {
            error.value = "No user session found. Please log in.";
        }
    } catch (err) {
        console.error("Failed to parse userInfo:", err);
        error.value = "Error loading user data.";
    }
});

// --- Outside click listener ---
const handleClick = (e: MouseEvent) => {
    if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
        open.value = false;
    }
};

watch(open, (val) => {
    if (val) document.addEventListener("mousedown", handleClick);
    else document.removeEventListener("mousedown", handleClick);
});

onBeforeUnmount(() => {
    document.removeEventListener("mousedown", handleClick);
});

// --- Styles ---
const styles = computed<Record<string, CSSProperties>>(() => {
    const c = colors.value;
    return {
        wrapper: { position: "relative" },
        avatarButton: {
            width: "6vw",
            maxWidth: "42px",
            minWidth: "40px",
            aspectRatio: "1",
            borderRadius: "50%",
            overflow: "hidden",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            backgroundColor: c.surface,
        },
        avatarImage: {
            width: "100%",
            height: "100%",
            objectFit: "cover",
        },
        dropdown: {
            position: "absolute",
            top: "52px",
            right: "0",
            backgroundColor: c.surface,
            border: `1px solid ${c.border}`,
            borderRadius: "14px",
            boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
            width: "270px",
            padding: "16px",
            zIndex: 100,
            fontFamily: "'Inter', sans-serif",
            opacity: open.value ? 1 : 0,
            transform: open.value ? "translateY(0)" : "translateY(-10px)",
            pointerEvents: open.value ? "auto" : "none",
            transition: "opacity 0.2s ease, transform 0.2s ease",
        },
        arrow: {
            position: "absolute",
            top: "44px",
            right: "13px",
            width: "0",
            height: "0",
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderBottom: `8px solid ${c.surface}`,
            filter: "drop-shadow(0 -1px 1px rgba(0,0,0,0.2))",
        },
        userName: {
            fontSize: "16px",
            fontWeight: "600",
            color: c.textPrimary,
            display: "flex",
            alignItems: "center",
            gap: "6px",
        },
        userEmail: {
            fontSize: "14px",
            color: c.textSecondary,
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginTop: "4px",
        },
        profileLink: {
            fontSize: "14px",
            marginTop: "8px",
            color: c.accent,
            cursor: "pointer",
            textDecoration: "none",
            fontWeight: "500",
        },
        logoutButton: {
            marginTop: "12px",
            width: "100%",
            background: `linear-gradient(to right, ${c.accent}, ${c.accentHover})`,
            border: "none",
            borderRadius: "6px",
            padding: "8px 16px",
            color: "white",
            fontSize: "12px",
            fontWeight: "500",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "opacity 0.2s ease, transform 0.1s ease",
        },
        errorText: {
            fontSize: "12px",
            color: "#ef4444",
            display: "flex",
            alignItems: "start",
            gap: "6px",
            padding: "6px 8px",
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            borderRadius: "6px",
            fontWeight: "500",
        },
    };
})
</script>

<template>
    <div :style="styles.wrapper" ref="dropdownRef">
        <!-- Avatar Button -->
        <div :style="styles.avatarButton" @click="open = !open"
            @mouseover="($event.currentTarget as HTMLElement).style.transform = 'scale(1.05)'; ($event.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.25)'"
            @mouseout="($event.currentTarget as HTMLElement).style.transform = 'scale(1)'; ($event.currentTarget as HTMLElement).style.boxShadow = 'none'">
            <img :src="user?.avatarUrl || 'https://api.dicebear.com/9.x/glass/svg?seed=Wyatt'" alt="User avatar"
                :style="styles.avatarImage" />
        </div>

        <!-- Arrow -->
        <div v-show="open" :style="styles.arrow"></div>

        <!-- Dropdown -->
        <div :style="styles.dropdown">
            <template v-if="user">
                <div style="display: flex; flex-direction: column; margin-bottom: 16px;">
                    <div :style="styles.userName">
                        <User :size="16" /> {{ user.name }}
                    </div>
                    <div :style="styles.userEmail">
                        <Mail :size="16" /> {{ user.email }}
                    </div>

                    <a v-if="user.profileUrl" :href="user.profileUrl" :style="styles.profileLink" target="_blank"
                        rel="noopener noreferrer">
                        View Profile
                    </a>
                </div>

                <button :style="styles.logoutButton" @click="props.onLogout"
                    @mouseover="($event.currentTarget as HTMLElement).style.opacity = '0.9'; ($event.currentTarget as HTMLElement).style.transform = 'scale(1.02)'"
                    @mouseout="($event.currentTarget as HTMLElement).style.transform = 'scale(1)'">
                    <LogOut :size="16" /> Logout
                </button>
            </template>

            <template v-else>
                <p :style="styles.errorText">
                    <Info :size="18" /> {{ error || "Not logged in" }}
                </p>
            </template>
        </div>
    </div>
</template>
