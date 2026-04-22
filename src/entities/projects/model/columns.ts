export const COLUMNS: Record<string, { label: string; isSortable: boolean }> = {
	image: { label: 'Фото', isSortable: false },
	name: { label: 'Название блюда', isSortable: true },
	cuisine: { label: 'Кухня', isSortable: true },
	difficulty: { label: 'Сложность', isSortable: true },
	rating: { label: 'Рейтинг', isSortable: true },
	caloriesPerServing: { label: 'Калории', isSortable: true },
};
