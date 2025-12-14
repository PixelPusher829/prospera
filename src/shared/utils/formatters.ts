// src/shared/utils/formatters.ts

export const formatCreditCard = (input: string): string => {
	const cleaned = input.replace(/\D/g, "");
	const match = cleaned.match(/.{1,4}/g);
	return match ? match.join(" ") : cleaned;
};

export const formatCurrency = (input: string): string => {
	const cleaned = input.replace(/[^0-9.]/g, "");
	if (cleaned === "" || cleaned === ".") return cleaned;
	const parts = cleaned.split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return parts.join(".");
};

export const formatAccountNumber = (input: string): string => {
	const cleaned = input.replace(/\D/g, "");
	const match = cleaned.match(/.{1,4}/g); // Example: groups of 4 digits
	return match ? match.join(" ") : cleaned;
};
