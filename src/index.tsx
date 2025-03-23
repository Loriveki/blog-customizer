import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import { App } from './components/app';
import './styles/index.scss';

// Получаем корневой элемент
const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

// Рендерим приложение в строгом режиме
root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
