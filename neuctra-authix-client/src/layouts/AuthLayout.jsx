import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/auth/Navbar";
import Footer from "../components/auth/Footer";
import MetaData from "../components/utils/MetaData";

const AuthLayout = () => {
  return (
    <div className="min-h-screen">
      {/* Meta for Neuctra Authix */}
      <MetaData
        title="Neuctra Authix - Serverless Authentication & User Management Platform"
        description="Neuctra Authix provides a complete serverless solution for authentication, user management, and secure JSON data storage. Use pre-built React components, Express SDK, and manage unlimited apps effortlessly with this all-in-one authentication platform."
        keywords="Neuctra Authix, serverless authentication, user management, React SDK, Express SDK, JSON data storage, authentication platform, manage apps, pre-built components"
      />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AuthLayout;
