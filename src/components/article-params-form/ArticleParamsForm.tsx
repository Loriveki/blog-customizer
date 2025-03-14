import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from '../../ui/select/Select';
import { Separator } from '../../ui/separator/Separator';
import React, { forwardRef, useState } from 'react';
import clsx from 'clsx';

import {
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

// Тип для пропсов компонента
type ArticleParamsFormProps = {
	isOpen: boolean;
	onToggle: () => void;
	onApply: (settings: typeof defaultArticleState) => void; // Передаем новые настройки
	onReset: () => void; // Сброс к дефолтным настройкам
};

// Основной компонент формы с настройками статьи
export const ArticleParamsForm = forwardRef<
	HTMLDivElement,
	ArticleParamsFormProps
>(({ isOpen, onToggle, onApply, onReset }, ref) => {
	// Состояния для каждой настройки
	const [selectedSettings, setSelectedSettings] = useState({
		fontFamilyOption: defaultArticleState.fontFamilyOption,
		fontSizeOption: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		backgroundColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth,
	});

	// Обработчики изменения настроек
	const handleChange = (key: string) => (selected: OptionType) => {
		setSelectedSettings((prev) => ({
			...prev,
			[key]: selected,
		}));
	};

	// Обработчик отправки формы
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// Применяем новые настройки
		onApply(selectedSettings);
	};

	// Сброс всех настроек к дефолтным
	const handleReset = () => {
		setSelectedSettings({
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			fontSizeOption: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
		});
		onReset(); // Вызываем сброс в родительском компоненте
	};

	ArticleParamsForm.displayName = 'ArticleParamsForm';

	return (
		<div ref={ref}>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			{isOpen && (
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isOpen,
					})}>
					<form className={styles.form} onSubmit={handleSubmit}>
						<Text as='h1' size={31} weight={800} uppercase>
							Задайте параметры
						</Text>

						{/* Селект для шрифта */}
						<Select
							selected={selectedSettings.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={handleChange('fontFamilyOption')}
							placeholder='Выберите шрифт'
							title='Шрифт'
						/>

						{/* Радиогруппа для размера шрифта */}
						<RadioGroup
							name='fontSize'
							options={fontSizeOptions}
							selected={selectedSettings.fontSizeOption}
							onChange={handleChange('fontSizeOption')}
							title='Размер шрифта'
						/>

						{/* Селект для цвета шрифта */}
						<Select
							selected={selectedSettings.fontColor}
							options={fontColors}
							onChange={handleChange('fontColor')}
							placeholder='Выберите цвет шрифта'
							title='Цвет шрифта'
						/>

						<Separator />

						{/* Селект для фона */}
						<Select
							selected={selectedSettings.backgroundColor}
							options={backgroundColors}
							onChange={handleChange('backgroundColor')}
							placeholder='Выберите цвет фона'
							title='Цвет фона'
						/>

						{/* Селект для ширины контента */}
						<Select
							selected={selectedSettings.contentWidth}
							options={contentWidthArr}
							onChange={handleChange('contentWidth')}
							placeholder='Выберите ширину контента'
							title='Ширина контента'
						/>

						<div className={styles.bottomContainer}>
							{/* Кнопка сброса */}
							<Button title='Сбросить' type='clear' onClick={handleReset} />
							{/* Кнопка применения */}
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			)}
		</div>
	);
});
