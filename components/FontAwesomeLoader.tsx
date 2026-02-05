"use client";

import { useEffect } from "react";

const FONT_AWESOME_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";

export default function FontAwesomeLoader() {
  useEffect(() => {
    // Загружаем Font Awesome раньше, но не блокируя рендеринг
    // Используем DOMContentLoaded для более ранней загрузки
    const loadFontAwesome = () => {
      // Проверяем, не загружен ли уже Font Awesome
      const existingLink = document.querySelector(
        `link[href="${FONT_AWESOME_URL}"]`
      );
      const existingStyle = document.getElementById("font-awesome-styles");

      if (existingLink || existingStyle) {
        return; // CSS уже загружен
      }

      // Используем более эффективный способ загрузки CSS без блокировки
      // Загружаем через fetch и вставляем как текст, чтобы избежать блокировки
      fetch(FONT_AWESOME_URL)
        .then((response) => response.text())
        .then((css) => {
          // Создаем style элемент и вставляем CSS
          const style = document.createElement("style");
          style.id = "font-awesome-styles";
          
          // Применяем font-display: swap ко всем @font-face правилам
          const optimizedCss = css.replace(
            /font-display:\s*[^;]+;?/gi,
            "font-display: swap;"
          );
          style.textContent = optimizedCss;
          
          document.head.appendChild(style);
          
          // Предзагружаем шрифты с font-display: swap
          preloadFontAwesomeFonts();
        })
        .catch(() => {
          // Fallback: используем стандартный способ загрузки, если fetch не работает
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = FONT_AWESOME_URL;
          link.crossOrigin = "anonymous";
          link.media = "print";
          link.onload = () => {
            link.media = "all";
            injectFontDisplaySwap();
          };
          document.head.appendChild(link);
        });
    };

    // Загружаем после DOMContentLoaded для более ранней загрузки иконок
    if (typeof window !== "undefined") {
      if (document.readyState === "loading") {
        // DOM еще загружается
        document.addEventListener("DOMContentLoaded", () => {
          // Небольшая задержка для неблокирующей загрузки
          setTimeout(loadFontAwesome, 100);
        });
      } else {
        // DOM уже загружен
        setTimeout(loadFontAwesome, 100);
      }
    }
  }, []);

  return null;
}

// Предзагрузка шрифтов Font Awesome с оптимизацией
function preloadFontAwesomeFonts() {
  const fonts = [
    {
      url: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/webfonts/fa-solid-900.woff2",
      family: "Font Awesome 6 Free",
      weight: "900",
    },
    {
      url: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/webfonts/fa-brands-400.woff2",
      family: "Font Awesome 6 Brands",
      weight: "400",
    },
    {
      url: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/webfonts/fa-regular-400.woff2",
      family: "Font Awesome 6 Free",
      weight: "400",
    },
  ];

  fonts.forEach((font) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "font";
    link.type = "font/woff2";
    link.crossOrigin = "anonymous";
    link.href = font.url;
    document.head.appendChild(link);
  });
}

// Функция для добавления font-display: swap к шрифтам Font Awesome (fallback)
function injectFontDisplaySwap() {
  // Создаем стиль для переопределения font-display с более высоким приоритетом
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
