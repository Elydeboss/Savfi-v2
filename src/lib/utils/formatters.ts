export function formatCurrency(amount: number, currency: 'USDC' | 'NGN' = 'USDC'): string {
	const formatted = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: currency === 'USDC' ? 'USD' : 'NGN',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).format(amount);

	return formatted;
}

export function formatNumber(number: number, decimals = 2): string {
	return new Intl.NumberFormat('en-US', {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals
	}).format(number);
}

export function formatPercentage(value: number): string {
	return new Intl.NumberFormat('en-US', {
		style: 'percent',
		minimumFractionDigits: 1,
		maximumFractionDigits: 2
	}).format(value);
}

export function formatDate(date: string | Date, format: 'short' | 'long' | 'relative' = 'short'): string {
	const d = typeof date === 'string' ? new Date(date) : date;

	if (format === 'short') {
		return d.toLocaleDateString('en-GB', {
			day: '2-digit',
			month: 'short',
			year: 'numeric'
		});
	}

	if (format === 'long') {
		return d.toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}

	if (format === 'relative') {
		const now = new Date();
		const diff = now.getTime() - d.getTime();
		const seconds = Math.floor(diff / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);

		if (days > 7) {
			return formatDate(date, 'short');
		}
		if (days > 0) {
			return `${days} day${days > 1 ? 's' : ''} ago`;
		}
		if (hours > 0) {
			return `${hours} hour${hours > 1 ? 's' : ''} ago`;
		}
		if (minutes > 0) {
			return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
		}
		return 'Just now';
	}

	return d.toLocaleDateString();
}

export function formatDateTime(date: string | Date): string {
	const d = typeof date === 'string' ? new Date(date) : date;
	return d.toLocaleString('en-GB', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});
}

export function getDaysRemaining(maturityDate: string): number {
	const maturity = new Date(maturityDate);
	const now = new Date();
	const diff = maturity.getTime() - now.getTime();
	const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
	return Math.max(0, days);
}

export function getProgressPercentage(startDate: string, endDate: string): number {
	const start = new Date(startDate).getTime();
	const end = new Date(endDate).getTime();
	const now = new Date().getTime();

	const total = end - start;
	const elapsed = now - start;

	if (elapsed >= total) return 100;
	if (elapsed <= 0) return 0;

	return Math.round((elapsed / total) * 100);
}

export function truncateAddress(address: string, chars = 4): string {
	if (!address || address.length < chars * 2 + 3) return address;
	return `${address.substring(0, chars)}...${address.substring(address.length - chars)}`;
}

export function generateReferralCode(): string {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	let code = '';
	for (let i = 0; i < 8; i++) {
		code += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return code;
}

export function validateEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

export function validatePassword(password: string): { valid: boolean; errors: string[] } {
	const errors: string[] = [];

	if (password.length < 8) {
		errors.push('Password must be at least 8 characters');
	}
	if (!/[A-Z]/.test(password)) {
		errors.push('Password must contain at least one uppercase letter');
	}
	if (!/[a-z]/.test(password)) {
		errors.push('Password must contain at least one lowercase letter');
	}
	if (!/[0-9]/.test(password)) {
		errors.push('Password must contain at least one number');
	}

	return {
		valid: errors.length === 0,
		errors
	};
}

export function validateUsername(username: string): { valid: boolean; error?: string } {
	if (username.length < 3) {
		return { valid: false, error: 'Username must be at least 3 characters' };
	}
	if (username.length > 20) {
		return { valid: false, error: 'Username must be no more than 20 characters' };
	}
	if (!/^[a-zA-Z0-9_]+$/.test(username)) {
		return { valid: false, error: 'Username can only contain letters, numbers, and underscores' };
	}
	return { valid: true };
}

export function formatFileSize(bytes: number): string {
	if (bytes === 0) return '0 Bytes';
	const k = 1024;
	const sizes = ['Bytes', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

export function copyToClipboard(text: string): Promise<boolean> {
	if (navigator.clipboard && navigator.clipboard.writeText) {
		return navigator.clipboard.writeText(text)
			.then(() => true)
			.catch(() => false);
	}

	return Promise.resolve(false);
}

export function debounce<T extends (...args: any[]) => any>(
	func: T,
	wait: number
): (...args: Parameters<T>) => void {
	let timeout: ReturnType<typeof setTimeout> | null = null;

	return (...args: Parameters<T>) => {
		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(() => func(...args), wait);
	};
}

export function throttle<T extends (...args: any[]) => any>(
	func: T,
	limit: number
): (...args: Parameters<T>) => void {
	let inThrottle: boolean;

	return (...args: Parameters<T>) => {
		if (!inThrottle) {
			func(...args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
	};
}
