function formatNumber(num) {
	return num > 9 ? num : '0' + num;
}

export function formatDate(info) {
	const year = new Date(info).getFullYear();
	const month = formatNumber(new Date(info).getMonth());
	const date = formatNumber(new Date(info).getDate());

	const res = year + '-' + month + '-' + date;

	return res;
};
