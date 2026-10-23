/**
 * Russian (ru) — UI Strings
 * Precise technical Russian for software engineers.
 * Preserves brand names: LadeStack, GB Coder, Astro.
 */
import type { UIStrings } from './en';

export const ru: UIStrings = {
  // Navigation
  'nav.platform': 'Платформа',
  'nav.apps': 'Приложения',
  'nav.codeStudio': 'Код-студия',
  'nav.docs': 'Документация',
  'nav.blog': 'Блог',
  'nav.about': 'О проекте',
  'nav.support': 'Поддержка',
  'nav.contact': 'Контакты',
  'nav.quickJump': 'Быстрый переход',
  'nav.themeToggle': 'Переключить тему',
  'nav.languageSelect': 'Выбрать язык',
  'nav.openMenu': 'Открыть меню',
  'nav.closeMenu': 'Закрыть меню',

  // Footer
  'footer.tagline': 'Высокопроизводительные браузерные инструменты разработки, созданные для скорости и конфиденциальности.',
  'footer.status': 'В браузере · Локальное выполнение',
  'footer.tools': 'Инструменты',
  'footer.resources': 'Ресурсы',
  'footer.company': 'О проекте',
  'footer.legal': 'Правовая информация',
  'footer.rights': 'Все права защищены.',
  'footer.emailPrompt': 'Прямая связь с инженерным отделом:',
  'footer.copyEmail': 'Копировать email',
  'footer.copiedEmail': 'Скопировано в буфер обмена!',
  'footer.privacy': 'Политика конфиденциальности',
  'footer.terms': 'Условия использования',

  // Hero Section
  'hero.badge': 'Выполнение в браузере · 100% локальная конфиденциальность',
  'hero.titleLine1': 'Создавайте, редактируйте и оптимизируйте',
  'hero.titleLine2': 'прямо в вашем браузере.',
  'hero.description':
    'Высокопроизводительные утилиты для разработчиков с клиентским выполнением. Без загрузки на сервер, без платных подписок и с мгновенным откликом.',
  'hero.ctaPrimary': 'Открыть 17+ инструментов',
  'hero.ctaSecondary': 'Запустить Studio IDE',
  'hero.ctaSecondaryAria': 'Открыть GB Coder IDE в новой вкладке',
  'hero.editorFileName': 'CodeStudio.tsx',
  'hero.editorTabName': 'PreviewSandbox.html',
  'hero.editorStatus': 'Выполнение в браузере',
  'hero.editorPrivacy': 'Приватность: Localhost',
  'hero.editorNotification': 'Проверка синтаксиса и песочница: локальный поток браузера',
  'hero.editorNotificationBadge': 'Готово к релизу',
  'hero.specTitle': 'Спецификации архитектуры',
  'hero.specRuntime': 'Локальная среда',
  'hero.specExecutionModel': 'Модель выполнения',
  'hero.specExecutionValue': 'Клиентская среда выполнения в браузере',
  'hero.specExecutionBadge': 'Локально',
  'hero.specPrivacy': 'Защита данных',
  'hero.specPrivacyValue': 'Без сохранения на сервере · Только клиент',
  'hero.specPrivacyBadge': 'Строго',
  'hero.specDistribution': 'Архитектура',
  'hero.specDistributionValue': 'Статическая предрендеренная структура',
  'hero.specDistributionBadge': 'Статика',
  'hero.browserCompatibility': 'Работает во всех современных браузерах',
  'hero.viewAppsLink': 'Все проверенные инструменты →',

  // Features Bento
  'features.eyebrow': 'ЭКОСИСТЕМА ИНСТРУМЕНТОВ',
  'features.title': 'Создано для скорости, приватности и независимости',
  'features.subtitle':
    'Каждый инструмент запускается исключительно в среде вашего браузера. Никаких обязательных регистраций, никакой облачной телеметрии и нулевая задержка.',
  'features.card1Title': 'GB Coder',
  'features.card1Desc':
    'Интерактивный редактор HTML, CSS и современного JavaScript с компиляцией в реальном времени, живым просмотром в iframe и форматированием разметки.',
  'features.card1Badge': 'Флагманская IDE',
  'features.card2Title': 'LS PDF Набор инструментов',
  'features.card2Desc':
    '17 клиентских утилит для объединения, разделения, сжатия, защиты, поворота и конвертации PDF-документов в оперативной памяти устройства.',
  'features.card2Badge': 'Набор 17-в-1',
  'features.card3Title': 'LS Оптимизатор изображений',
  'features.card3Desc':
    'Клиентское сжатие с поддержкой более 9 форматов, включая WebP, AVIF, PNG и JPEG с мгновенным уменьшением размера файлов.',
  'features.card3Badge': 'Без загрузки',
  'features.card4Title': 'Утилиты продуктивности',
  'features.card4Desc':
    'Оптимизированный для ATS конструктор резюме и расчетные инструменты для реальных инженерных рабочих процессов.',
  'features.card4Badge': 'Продуктивность',

  // How It Works
  'howItWorks.eyebrow': 'ПРОСТОТА ПРОЦЕССА',
  'howItWorks.title': 'Как работает LadeStack',
  'howItWorks.subtitle': 'Каждая утилита на платформе опирается на три четких принципа.',
  'howItWorks.step1Num': '01',
  'howItWorks.step1Title': 'Мгновенный доступ в браузере',
  'howItWorks.step1Desc': 'Открывайте любой инструмент и начинайте работу сразу. Без входа в систему, API-ключей и кредитных карт.',
  'howItWorks.step2Num': '02',
  'howItWorks.step2Title': 'Локальная обработка на клиенте',
  'howItWorks.step2Desc': 'Ваши файлы, фрагменты кода и исходные материалы обрабатываются исключительно в оперативной памяти вашего компьютера.',
  'howItWorks.step3Num': '03',
  'howItWorks.step3Title': 'Прямое скачивание и контроль',
  'howItWorks.step3Desc': 'Экспортируйте результат работы немедленно. Никакие данные не передаются на удаленные серверы.',

  // Use Cases
  'useCases.eyebrow': 'ДЛЯ КОГО МЫ РАБОТАЕМ',
  'useCases.title': 'Создано для современных инженерных процессов',
  'useCases.subtitle': 'От независимых разработчиков до инженеров крупных компаний, ценящих безопасность данных.',
  'useCases.case1Title': 'Фронтенд-разработчики',
  'useCases.case1Desc': 'Быстрое прототипирование макетов, проверка HTML/CSS/JS компонентов и тестирование современных веб-паттернов.',
  'useCases.case2Title': 'Технические команды',
  'useCases.case2Desc': 'Очистка и сжатие корпоративных PDF-документов и технических диаграмм без нарушения политик безопасности.',
  'useCases.case3Title': 'Разработчики с фокусом на приватность',
  'useCases.case3Desc': 'Выполнение задач с конфиденциальными файлами с гарантией, что данные никогда не покинут локальную систему.',

  // Product Showcase
  'showcase.eyebrow': 'ПРОВЕРЕННЫЙ КАТАЛОГ',
  'showcase.title': 'Изучите доступные инструменты',
  'showcase.subtitle': 'Бесплатные клиентские веб-приложения, созданные для стабильной работы.',
  'showcase.launchApp': 'Открыть',
  'showcase.learnMore': 'Подробнее',
  'showcase.inBrowser': 'В браузере',
  'showcase.viewAllCatalog': 'Смотреть весь каталог приложений →',

  // FAQ
  'faq.eyebrow': 'ЧАСТЫЕ ВОПРОСЫ',
  'faq.title': 'Часто задаваемые вопросы',
  'faq.subtitle': 'Все, что необходимо знать об инструментах LadeStack, архитектуре и политике безопасности.',
  'faq.q1': 'Инструменты LadeStack действительно бесплатны?',
  'faq.a1':
    'Да. Все инструменты, включая GB Coder, LS PDF и LS Оптимизатор изображений, полностью бесплатны навсегда для личных и коммерческих проектов.',
  'faq.q2': 'Как обеспечивается безопасность файлов и данных?',
  'faq.a2':
    'Вся обработка файлов и программного кода выполняется строго в локальной изолированной памяти вашего браузера. Файлы никогда не отправляются на удаленный сервер.',
  'faq.q3': 'Какие браузеры поддерживаются?',
  'faq.a3':
    'Поддерживаются все актуальные современные браузеры с поддержкой HTML5 и Canvas API: Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge и Brave.',
  'faq.q4': 'Кто разрабатывает и поддерживает LadeStack?',
  'faq.a4':
    'LadeStack проектируется и поддерживается основателем Girish Lade с целью предоставить инженерам по всему миру доступные инструменты с уважением к конфиденциальности.',

  // CTA Banner
  'cta.title': 'Готовы ускорить свою разработку?',
  'cta.subtitle': 'Начните использовать браузерные инструменты LadeStack уже сегодня. Регистрация не требуется.',
  'cta.button': 'Посмотреть все инструменты',

  // SEO Metadata
  'seo.homeTitle': 'LadeStack – Браузерная платформа и утилиты для разработчиков',
  'seo.homeDescription':
    'Высокопроизводительные инструменты в браузере: редактор кода, 17-в-1 PDF набор, оптимизация изображений. Бесплатно, локальное выполнение.',
  'seo.ogTitle': 'LadeStack – Инструменты разработки и клиентские утилиты',
  'seo.ogDescription':
    'Браузерная код-студия, конфиденциальный PDF-набор и компрессор картинок. 100% приватность, бесплатно навсегда.',
};
