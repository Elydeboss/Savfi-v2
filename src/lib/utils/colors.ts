/**
 * Shared color utilities for SavFi components
 * Centralizes color mappings to ensure consistency across the app
 */

export type PlanType = 'FlexFi' | 'GrowFi' | 'VaultFi' | 'SwiftFi';
export type ColorVariant = 'blue' | 'green' | 'purple' | 'orange';

/**
 * Color mapping for savings plans
 */
export const PLAN_COLORS: Record<PlanType, ColorVariant> = {
	FlexFi: 'blue',
	GrowFi: 'green',
	VaultFi: 'purple',
	SwiftFi: 'orange'
} as const;

/**
 * Tailwind color classes for each plan variant
 */
export const PLAN_COLOR_CLASSES: Record<ColorVariant, {
	background: string;
	text: string;
	border: string;
	hoverBg: string;
}> = {
	blue: {
		background: 'bg-blue-500',
		text: 'text-blue-500',
		border: 'border-blue-500',
		hoverBg: 'hover:bg-blue-50'
	},
	green: {
		background: 'bg-green-500',
		text: 'text-green-500',
		border: 'border-green-500',
		hoverBg: 'hover:bg-green-50'
	},
	purple: {
		background: 'bg-purple-500',
		text: 'text-purple-500',
		border: 'border-purple-500',
		hoverBg: 'hover:bg-purple-50'
	},
	orange: {
		background: 'bg-orange-500',
		text: 'text-orange-500',
		border: 'border-orange-500',
		hoverBg: 'hover:bg-orange-50'
	}
} as const;

/**
 * Get color classes for a specific plan
 */
export function getPlanColorClasses(plan: PlanType) {
	const color = PLAN_COLORS[plan];
	return PLAN_COLOR_CLASSES[color];
}

/**
 * Transaction status color mappings
 */
export const TRANSACTION_STATUS_COLORS: Record<string, {
	background: string;
	text: string;
	border: string;
}> = {
	Success: {
		background: 'bg-green-100 dark:bg-green-900',
		text: 'text-green-700 dark:text-green-300',
		border: 'border-green-200 dark:border-green-800'
	},
	Pending: {
		background: 'bg-yellow-100 dark:bg-yellow-900',
		text: 'text-yellow-700 dark:text-yellow-300',
		border: 'border-yellow-200 dark:border-yellow-800'
	},
	Failed: {
		background: 'bg-red-100 dark:bg-red-900',
		text: 'text-red-700 dark:text-red-300',
		border: 'border-red-200 dark:border-red-800'
	}
} as const;

/**
 * Get status color classes
 */
export function getStatusColorClasses(status: string) {
	return TRANSACTION_STATUS_COLORS[status] || TRANSACTION_STATUS_COLORS.Pending;
}
