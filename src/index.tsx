import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useRef } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';

// Получаем корневой элемент
const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

// Главный компонент приложения
const App = () => {
	// Состояние открытия/закрытия сайдбара
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	// Состояние для хранения текущих настроек статьи
	const [articleStyles, setArticleStyles] = useState(defaultArticleState);

	// Реф для сайдбара
	const sidebarRef = useRef<HTMLDivElement>(null);

	// Функция для переключения сайдбара
	const toggleSidebar = () => {
		setIsSidebarOpen((prev) => !prev);
	};

	// Функция для закрытия сайдбара по клику вне его
	const handleMainClick = (event: React.MouseEvent) => {
		const target = event.target as Node;

		// Если клик был внутри сайдбара, ничего не делаем
		if (sidebarRef.current && sidebarRef.current.contains(target)) {
			return;
		}
		// Если клик был вне сайдбара, закрываем его
		setIsSidebarOpen(false);
	};

	// Функция для применения новых стилей
	const handleApply = (newStyles: typeof defaultArticleState) => {
		setArticleStyles(newStyles);
	};

	// Сброс настроек к значениям по умолчанию
	const resetSettings = () => {
		setArticleStyles(defaultArticleState); // Возвращаем дефолтные стили
	};

	// Рендерим компонент приложения
	return (
		<main
			className={clsx(styles.main)}
			style={{
				'--font-family': articleStyles.fontFamilyOption.value,
				'--font-size': articleStyles.fontSizeOption.value,
				'--font-color': articleStyles.fontColor.value,
				'--container-width': articleStyles.contentWidth.value,
				'--bg-color': articleStyles.backgroundColor.value,
			} as CSSProperties}
			onClick={handleMainClick}>

			<ArticleParamsForm
				isOpen={isSidebarOpen}
				onToggle={toggleSidebar}
				onApply={handleApply}
				onReset={resetSettings}
				ref={sidebarRef}
			/>

			<Article />
		</main>
	);
};

// Рендерим приложение в строгом режиме
root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
