import { CSSProperties, useState } from 'react';
import { Article } from './article/Article';
import { ArticleParamsForm } from './article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../constants/articleProps';
import '../styles/index.scss';
import styles from '../styles/index.module.scss';

export const App = () => {
	// Состояние для хранения текущих настроек статьи
	const [articleStyles, setArticleStyles] = useState(defaultArticleState);

	// Рендерим компонент приложения
	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleStyles.fontFamilyOption.value,
					'--font-size': articleStyles.fontSizeOption.value,
					'--font-color': articleStyles.fontColor.value,
					'--container-width': articleStyles.contentWidth.value,
					'--bg-color': articleStyles.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setArticleStyles={setArticleStyles} />
			<Article />
		</main>
	);
};
