import { ReactNode } from "react";

export interface ContentItem {
  id: string;
  type: 'video' | 'music' | 'menu' | 'clicker' | 'game' | 'horror' | '3d' | 'screamer' | 'puzzle' | 'art' | 'tool' | 'secret';
  title: string;
  description: string;
  component: ReactNode;
}

export interface ContentCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  count: number;
  startRange: number;
  endRange: number;
}

// Content Categories with metadata
export const contentCategories: ContentCategory[] = [
  {
    id: 'games',
    name: 'Игры',
    description: 'Различные мини-игры и развлечения',
    color: 'bg-violet-600',
    count: 500,
    startRange: 1,
    endRange: 500
  },
  {
    id: 'videos',
    name: 'Видео',
    description: 'Видеоролики и анимации',
    color: 'bg-red-600',
    count: 400,
    startRange: 501,
    endRange: 900
  },
  {
    id: 'music',
    name: 'Музыка',
    description: 'Музыкальные треки и звуковые эффекты',
    color: 'bg-green-600',
    count: 300,
    startRange: 901,
    endRange: 1200
  },
  {
    id: 'horror',
    name: 'Хоррор',
    description: 'Страшилки, скримеры и хоррор-игры',
    color: 'bg-red-900',
    count: 300,
    startRange: 1201,
    endRange: 1500
  },
  {
    id: 'tools',
    name: 'Инструменты',
    description: 'Полезные утилиты и инструменты',
    color: 'bg-blue-600',
    count: 300,
    startRange: 1501,
    endRange: 1800
  },
  {
    id: 'art',
    name: 'Арт',
    description: 'Цифровое искусство и визуальные эффекты',
    color: 'bg-amber-500',
    count: 300,
    startRange: 1801,
    endRange: 2100
  },
  {
    id: '3d',
    name: '3D',
    description: '3D-модели и интерактивные сцены',
    color: 'bg-cyan-600',
    count: 300,
    startRange: 2101,
    endRange: 2400
  },
  {
    id: 'secret',
    name: 'Секреты',
    description: 'Скрытые и специальные материалы',
    color: 'bg-slate-800',
    count: 336,
    startRange: 2401,
    endRange: 2736
  }
];

// Mapping of specific codes to content types
export const getContentType = (code: string): string => {
  const codeNum = parseInt(code);
  
  if (isNaN(codeNum)) return 'unknown';
  
  // Special case handling for codes 1-5
  if (codeNum >= 1 && codeNum <= 5) {
    const specialTypes = ['video', 'music', 'menu', 'clicker', 'game'];
    return specialTypes[codeNum - 1];
  }
  
  // Find the category for this code
  for (const category of contentCategories) {
    if (codeNum >= category.startRange && codeNum <= category.endRange) {
      return category.id;
    }
  }
  
  return 'unknown';
};

// Get detailed information about a code
export const getCodeInfo = (code: string): {
  title: string;
  description: string;
  category: string;
  type: string;
} => {
  const codeNum = parseInt(code);
  
  if (isNaN(codeNum) || codeNum < 1 || codeNum > 2736) {
    return {
      title: 'Неизвестный код',
      description: 'Этот код не распознан системой',
      category: 'unknown',
      type: 'unknown'
    };
  }
  
  // Special codes 1-5
  if (codeNum <= 5) {
    const specialTitles = [
      'Видеоплеер',
      'Музыкальный плеер',
      'Главное меню',
      'Игра Кликер',
      'Мини-игра'
    ];
    
    const specialDescriptions = [
      'Просмотр видеоконтента',
      'Прослушивание музыки',
      'Навигация по флешке',
      'Соревновательная игра на скорость клика',
      'Простая игра "Поймай точку"'
    ];
    
    const specialTypes = ['video', 'music', 'menu', 'clicker', 'game'];
    
    return {
      title: specialTitles[codeNum - 1],
      description: specialDescriptions[codeNum - 1],
      category: specialTypes[codeNum - 1],
      type: specialTypes[codeNum - 1]
    };
  }
  
  // Find category
  let currentCategory: ContentCategory | undefined;
  for (const category of contentCategories) {
    if (codeNum >= category.startRange && codeNum <= category.endRange) {
      currentCategory = category;
      break;
    }
  }
  
  if (!currentCategory) {
    return {
      title: 'Неизвестный код',
      description: 'Этот код не распознан системой',
      category: 'unknown',
      type: 'unknown'
    };
  }
  
  // Generate a title and description based on the code and category
  const categoryIndex = codeNum - currentCategory.startRange;
  const types = getTypesForCategory(currentCategory.id);
  const typeIndex = categoryIndex % types.length;
  const type = types[typeIndex];
  
  return {
    title: generateTitle(currentCategory.id, type, categoryIndex),
    description: generateDescription(currentCategory.id, type, categoryIndex),
    category: currentCategory.id,
    type: type
  };
};

// Get content types for a category
const getTypesForCategory = (categoryId: string): string[] => {
  switch (categoryId) {
    case 'games':
      return ['arcade', 'puzzle', 'strategy', 'adventure', 'action'];
    case 'videos':
      return ['tutorial', 'animation', 'documentary', 'clip', 'trailer'];
    case 'music':
      return ['rock', 'electronic', 'ambient', 'jazz', 'lofi'];
    case 'horror':
      return ['jumpscare', 'psychological', 'monster', 'ghost', 'creepypasta'];
    case 'tools':
      return ['calculator', 'converter', 'generator', 'analyzer', 'editor'];
    case 'art':
      return ['painting', 'animation', 'pixel', 'geometric', 'abstract'];
    case '3d':
      return ['model', 'scene', 'animation', 'interactive', 'gallery'];
    case 'secret':
      return ['easteregg', 'message', 'challenge', 'reward', 'story'];
    default:
      return ['generic'];
  }
};

// Generate a title based on category, type and index
const generateTitle = (categoryId: string, type: string, index: number): string => {
  const titles: {[key: string]: string[]} = {
    'games': ['Космический шутер', 'Головоломка', 'Охота за сокровищами', 'Гонки', 'Платформер'],
    'videos': ['Загадочный ролик', 'Туториал', 'Короткометражка', 'Музыкальный клип', 'Трейлер'],
    'music': ['Электронный трек', 'Рок-композиция', 'Амбиент', 'Джазовая импровизация', 'Чилл-хоп'],
    'horror': ['Заброшенный дом', 'Ночной кошмар', 'Встреча с монстром', 'Жуткая история', 'Паранормальное'],
    'tools': ['Калькулятор', 'Генератор паролей', 'Заметки', 'Конвертер единиц', 'Редактор кода'],
    'art': ['Цифровая живопись', 'Пиксельная анимация', 'Геометрические фигуры', 'Абстрактное искусство', 'Фрактальная графика'],
    '3d': ['3D модель', 'Интерактивная сцена', '3D анимация', 'Галерея моделей', '3D конструктор'],
    'secret': ['Секретное сообщение', 'Пасхалка', 'Скрытая награда', 'Тайный контент', 'Загадка']
  };
  
  const typeIndex = index % (titles[categoryId]?.length || 1);
  return titles[categoryId]?.[typeIndex] || 'Контент';
};

// Generate a description based on category, type and index
const generateDescription = (categoryId: string, type: string, index: number): string => {
  const descriptions: {[key: string]: string[]} = {
    'games': [
      'Увлекательная аркадная игра с простым управлением',
      'Логическая головоломка для тренировки мозга',
      'Стратегическая игра с элементами тактики',
      'Приключенческая игра с исследованием мира',
      'Динамичный экшн с множеством врагов'
    ],
    'videos': [
      'Обучающий видеоролик с полезной информацией',
      'Анимационный клип с интересным сюжетом',
      'Документальный мини-фильм',
      'Захватывающее короткое видео',
      'Трейлер к несуществующему фильму'
    ],
    'music': [
      'Энергичный электронный трек для вечеринки',
      'Расслабляющая эмбиент композиция',
      'Мелодичная инструментальная музыка',
      'Ритмичный бит для работы',
      'Атмосферная звуковая дорожка'
    ],
    'horror': [
      'Страшная история с неожиданной концовкой',
      'Внезапный скример, который напугает вас',
      'Психологический хоррор, играющий на ваших страхах',
      'Жуткая атмосфера заброшенного места',
      'Встреча с паранормальным явлением'
    ],
    'tools': [
      'Полезный инструмент для повседневных задач',
      'Генератор случайных значений и данных',
      'Интерактивный калькулятор для расчетов',
      'Удобный конвертер различных единиц',
      'Эффективный инструмент для работы'
    ],
    'art': [
      'Красивое цифровое произведение искусства',
      'Анимированная графика с яркими цветами',
      'Абстрактная композиция из геометрических форм',
      'Пиксельное искусство в ретро-стиле',
      'Визуальный эксперимент с цветом и формой'
    ],
    '3d': [
      'Интерактивная 3D модель с возможностью вращения',
      'Трехмерная сцена с динамическим освещением',
      'Анимированная 3D композиция',
      'Галерея 3D объектов для изучения',
      'Виртуальное пространство для навигации'
    ],
    'secret': [
      'Скрытая информация, доступная только знающим код',
      'Секретное сообщение от разработчиков',
      'Пасхальное яйцо, ожидающее своего обнаружения',
      'Тайный контент для избранных',
      'Загадка, требующая решения'
    ]
  };
  
  const descIndex = index % (descriptions[categoryId]?.length || 1);
  return descriptions[categoryId]?.[descIndex] || 'Интересный контент, скрытый на флешке';
};
