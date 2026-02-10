"use client";

import { useEffect } from "react";

export default function MetaData({ title, description, keywords }) {
  useEffect(() => {
    // Set document title
    if (title) document.title = title;

    // Set description meta
    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement("meta");
      descTag.setAttribute("name", "description");
      document.head.appendChild(descTag);
    }
    descTag.setAttribute("content", description || "");

    // Set keywords meta
    if (keywords) {
      let keywordsTag = document.querySelector('meta[name="keywords"]');
      if (!keywordsTag) {
        keywordsTag = document.createElement("meta");
        keywordsTag.setAttribute("name", "keywords");
        document.head.appendChild(keywordsTag);
      }
      keywordsTag.setAttribute("content", keywords);
    }

    // Optional: Add Open Graph & Twitter tags
    const setMetaTag = (property, content) => {
      if (!content) return;
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setMetaTag("og:title", title);
    setMetaTag("og:description", description);
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", description);

  }, [title, description, keywords]);

  return null; // This component doesn't render anything
}
