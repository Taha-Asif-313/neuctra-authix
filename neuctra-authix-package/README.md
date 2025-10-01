# Neuctra Authix SDK & UI Components

**Neuctra Authix** is an authentication SDK and UI component library for **React** and **Vue**.
It provides ready-to-use APIs, authentication flows, and user management utilities with **JWT**, **API Key**, **OTP verification**, and **extra user data management**.

---

## 📦 Installation

```bash
# Install via npm
npm install neuctra-authix

# Or using yarn
yarn add neuctra-authix

# Or pnpm
pnpm add neuctra-authix
```

---

## ⚡ Features

* 🔑 **Authentication SDK** (Signup, Login, Profile, Password Reset, OTP)
* 👤 **User Management** (Update, Delete, Change Password, Extra Data)
* 📂 **User Data Store** (Flexible key/value objects per user)
* 🛡 **Secure API Requests** (JWT & API Key)
* 🎨 **UI Components** (React + Vue with TailwindCSS)

---

## 🛠 SDK Configuration

Before using the SDK, set up the **global configuration**.

```ts
import { setSdkConfig, getSdkConfig } from "neuctra-authix/sdk";

setSdkConfig({
  baseUrl: "https://api.neuctra.com",
  apiKey: "your-api-key",
  appId: "your-app-id",
});

console.log(getSdkConfig());
// { baseUrl: "...", apiKey: "...", appId: "..." }
```

Alternatively, you can use the class-based client:

```ts
import { NeuctraAuthix } from "neuctra-authix/sdk";

const client = new NeuctraAuthix({
  baseUrl: "https://api.neuctra.com",
  apiKey: "your-api-key",
  appId: "your-app-id",
});
```

---

## 🚀 Usage Examples

### 🔹 Signup a New User

```ts
await client.signup({
  name: "John Doe",
  email: "john@example.com",
  password: "strongpassword",
});
```

### 🔹 Login

```ts
const session = await client.login({
  email: "john@example.com",
  password: "strongpassword",
});
console.log(session.token);
```

### 🔹 Get Profile

```ts
await client.getProfile({ token: "user-jwt-token" });
```

### 🔹 Update User

```ts
await client.updateUser({
  userId: "12345",
  name: "Updated Name",
  phone: "+1234567890",
});
```

### 🔹 Change Password (Admin)

```ts
await client.changePassword({
  userId: "12345",
  currentPassword: "oldPass",
  newPassword: "newPass",
});
```

### 🔹 Delete User

```ts
await client.deleteUser({ userId: "12345" });
```

---

## ✉️ Email Verification & Password Reset

### Send Verification OTP

```ts
await client.sendVerifyOTP({ token: "user-jwt-token" });
```

### Verify Email

```ts
await client.verifyEmail({
  token: "user-jwt-token",
  otp: "123456",
});
```

### Forgot Password

```ts
await client.forgotPassword({ email: "john@example.com" });
```

### Reset Password

```ts
await client.resetPassword({
  email: "john@example.com",
  otp: "123456",
  newPassword: "newSecurePass",
});
```

---

## 📂 User Extra Data Management

Each user can store **custom structured objects**.

### Get All Data

```ts
await client.getUserData({ userId: "12345" });
```

### Get One Object

```ts
await client.getSingleUserData({ userId: "12345", dataId: "data123" });
```

### Add Data

```ts
await client.addUserData({
  userId: "12345",
  data: { preferences: { theme: "dark" } },
});
```

### Update Data

```ts
await client.updateUserData({
  userId: "12345",
  dataId: "data123",
  data: { preferences: { theme: "light" } },
});
```

### Delete Data

```ts
await client.deleteUserData({ userId: "12345", dataId: "data123" });
```

---

## 🎨 UI Components

```tsx
import { LoginForm, SignupForm } from "neuctra-authix/react";

<LoginForm onSuccess={(session) => console.log("Logged in:", session)} />
<SignupForm onSuccess={(user) => console.log("Signed up:", user)} />
```

Vue components are also supported:

```vue
<script setup>
import { LoginForm } from "neuctra-authix/vue";
</script>

<template>
  <LoginForm @success="(session) => console.log('Logged in:', session)" />
</template>
```

---

## ⚙️ Tech Stack

* **TypeScript**
* **Vite**
* **React / Vue**
* **TailwindCSS**
* **Axios**
* **Lucide Icons**

---

## 📄 License

[MIT](./LICENSE) © 2025 Neuctra

