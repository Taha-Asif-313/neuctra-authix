# Neuctra Authix Client SDK

`NeuctraAuthixClient` is a lightweight **JavaScript SDK** for interacting with your Neuctra Authix API. It allows you to manage users, fetch profiles, and authenticate via **JWT tokens or API keys**.

✅ Fully **ESM-ready** (`type: module`) and works natively in Node.js 18+ without Babel.

---

## Features

* Signup, login, update, and delete users
* Fetch user profile via JWT token
* Works with App ID and API key
* Axios-based HTTP requests
* Lightweight and simple to use
* No Babel required – Native ESM support

---

## Installation

Install via NPM:

```bash
npm install neuctra-authix-client
```

Or using Yarn:

```bash
yarn add neuctra-authix-client
```

Axios is automatically installed as a dependency.

---

## Project Structure

```
neuctra-authix-client/
├── src/
│   └── index.js                  # Main SDK class
├── .gitignore
├── package.json
└── README.md
```

✅ Note: **No `dist` folder or Babel is required**. Node.js 18+ supports **native ESM modules**. Make sure your `package.json` has `"type": "module"`.

---

## Usage

### 1. Importing the SDK

```js
import { NeuctraAuthixClient } from "neuctra-authix-client";

const client = new NeuctraAuthixClient({
  baseUrl: "http://localhost:5000/api", // API base URL
  apiKey: "YOUR_ADMIN_API_KEY",          // Optional Admin API key
  appId: "YOUR_APP_ID"                   // Optional default App ID
});
```

---

### 2. Signup a User

```js
const newUser = await client.signup(
  "John Doe",
  "john@example.com",
  "securePassword123",
  "1234567890",
  "123 Main St",
  "https://avatar.url",
  true,
  "user",
  null
);

console.log(newUser);
```

---

### 3. Login a User

```js
const loginRes = await client.login("john@example.com", "securePassword123");
console.log(loginRes);

// Get JWT token from login response
const token = loginRes.token;
```

---

### 4. Fetch User Profile with Token

```js
const profile = await client.getProfile(token);
console.log(profile);
```

---

### 5. Update a User

```js
const updatedUser = await client.updateUser(
  "USER_ID",
  "John Updated",
  "john.updated@example.com",
  "newPassword123"
);
console.log(updatedUser);
```

---

### 6. Delete a User

```js
const deletedUser = await client.deleteUser("USER_ID");
console.log(deletedUser);
```

---

## SDK Methods

| Method                                                                                        | Description                          |
| --------------------------------------------------------------------------------------------- | ------------------------------------ |
| `signup(name, email, password, phone, address, avatarUrl, isActive, role, adminId)`           | Creates a new user                   |
| `login(email, password, appId)`                                                               | Logs in a user and returns JWT       |
| `updateUser(userId, name, email, password, phone, address, avatarUrl, isActive, role, appId)` | Updates user info                    |
| `deleteUser(userId, appId)`                                                                   | Deletes a user                       |
| `getProfile(token)`                                                                           | Fetches user profile using JWT token |



## License

MIT License © Your Name

---

This version clearly emphasizes:

* **`type: module`** – users know they need ESM support.
* **No Babel required** – works natively.
* SEO-friendly description, keywords, and instructions.

---

If you want, I can **also rewrite the README to include rich SEO keywords for Google search** so your SDK appears in searches for `JavaScript auth SDK`, `Neuctra API client`, and `JWT API client`.
