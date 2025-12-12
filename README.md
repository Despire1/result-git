# TeacherBot Landing (static)

Одностраничный лендинг TeacherBot с responsive-дизайном, легкими анимациями и deeplink на Telegram.

## Как запустить

Откройте `index.html` в браузере локально или на любом статическом хостинге. Никаких зависимостей/сборки не требуется.

## Конфигурация ссылок

Измените значения в `scripts/config.js`:

- `TEACHERBOT_USERNAME` — username бота.
- `TELEGRAM_BASE` и `PAYLOADS` — конструктор deeplink.
- `DEMO_IMAGES` — список мокапов (SVG-плейсхолдеры лежат в `public/demo`).

## Аналитика

`scripts/analytics.js` собирает UTM-параметры, отправляет события `tg_click`, `section_view`, `scroll_depth` в `dataLayer`/`gtag`, а также пишет их в консоль.

## Структура ключевых блоков

- Hero (2 колонки на desktop) с фоновыми градиентами и плавающими бейджами.
- Pain points, До/После, Как работает, Возможности, Бонус, Галерея мокапов, FAQ, финальный CTA.
- Лёгкий lightbox для мокапов и аккордеон FAQ с aria-атрибутами.

## Доступность и анимации

- Проверка `prefers-reduced-motion`: фон и плавающие бейджи отключаются, остаётся мягкий fade.
- Все картинки лениво подгружаются (`loading="lazy"`), кнопки реагируют на hover/press.
