"use client";

import { useEffect } from "react";

const FONT_AWESOME_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";

export default function FontAwesomeLoader() {
  useEffect(() => {
    // Проверяем, не загружен ли уже Font Awesome
    const existingLink = document.querySelector(
      `link[href="${FONT_AWESOME_URL}"]`
    );

    if (existingLink) {
      return; // CSS уже загружен
    }

    // Асинхронная загрузка Font Awesome CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONT_AWESOME_URL;
    link.crossOrigin = "anonymous";
    // Устанавливаем media="print" для асинхронной загрузки, затем меняем на "all"
    link.media = "print";
    link.onload = () => {
      link.media = "all";
    };
    document.head.appendChild(link);
  }, []);

  return null;
}
