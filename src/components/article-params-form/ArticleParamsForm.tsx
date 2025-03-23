import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from '../../ui/select/Select';
import { Separator } from '../../ui/separator/Separator';
import React, { useState, useRef } from 'react';
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
import { useOutsideClickClose } from '../../ui/select/hooks/useOutsideClickClose';

// Тип для пропсов компонента
type ArticleParamsFormProps = {
	setArticleStyles: React.Dispatch<
		React.SetStateAction<{
			fontFamilyOption: OptionType;
			fontColor: OptionType;
			backgroundColor: OptionType;
			contentWidth: OptionType;
			fontSizeOption: OptionType;
		}>
	>;
};

// Основной компонент формы с настройками статьи
export const ArticleParamsForm = ({
	setArticleStyles,
}: ArticleParamsFormProps) => {
	// Состояние открытия/закрытия сайдбара
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	// Реф для сайдбара
	const sidebarRef = useRef<HTMLDivElement>(null);

	// Состояния для каждой настройки
	const [selectedSettings, setSelectedSettings] = useState({
		fontFamilyOption: defaultArticleState.fontFamilyOption,
		fontSizeOption: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		backgroundColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth,
	});

	// Функция для применения новых стилей
	const handleApply = (newStyles: typeof defaultArticleState) => {
		setArticleStyles(newStyles);
	};

	// Сброс настроек к значениям по умолчанию
	const resetSettings = () => {
		setArticleStyles(defaultArticleState); // Возвращаем дефолтные стили
	};

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
		handleApply(selectedSettings);
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
		resetSettings(); // Вызываем сброс в родительском компоненте
	};

	// Функция для переключения сайдбара
	const toggleSidebar = () => {
		setIsSidebarOpen((prev) => !prev);
	};

	// Используем хук для закрытия сайдбара по клику вне его
	useOutsideClickClose({
		isOpen: isSidebarOpen,
		rootRef: sidebarRef,
		onChange: setIsSidebarOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isSidebarOpen} onClick={toggleSidebar} />
			{
				<aside
					ref={sidebarRef}
					className={clsx(styles.container, {
						[styles.container_open]: isSidebarOpen,
					})}>
					<form className={styles.form} onSubmit={handleSubmit}>
						<Text as='h2' size={31} weight={800} uppercase>
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
			}
		</>
	);
};
