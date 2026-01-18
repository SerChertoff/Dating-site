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
      // Добавляем font-display: swap для всех @font-face правил Font Awesome
      // Это переопределит правила Font Awesome с более высоким приоритетом
      injectFontDisplaySwap();
    };
    document.head.appendChild(link);
  }, []);

  return null;
}

// Функция для добавления font-display: swap к шрифтам Font Awesome
function injectFontDisplaySwap() {
  // Создаем стиль для переопределения font-display с более высоким приоритетом
  // Это переопределит правила Font Awesome после их загрузки
  const style = document.createElement("style");
  style.id = "font-awesome-font-display-override";
  
  // Удаляем предыдущий стиль, если он существует
  const existingStyle = document.getElementById("font-awesome-font-display-override");
  if (existingStyle) {
    existingStyle.remove();
  }
  
  style.textContent = `
    @font-face {
      font-family: 'Font Awesome 6 Free';
      font-style: normal;
      font-weight: 900;
      font-display: swap !important;
      src: url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/webfonts/fa-solid-900.woff2') format('woff2');
    }
    @font-face {
      font-family: 'Font Awesome 6 Brands';
      font-style: normal;
      font-weight: 400;
      font-display: swap !important;
      src: url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/webfonts/fa-brands-400.woff2') format('woff2');
    }
    @font-face {
      font-family: 'Font Awesome 6 Free';
      font-style: normal;
      font-weight: 400;
      font-display: swap !important;
      src: url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/webfonts/fa-regular-400.woff2') format('woff2');
    }
  `;
  document.head.appendChild(style);
}
