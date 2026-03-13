import { writable, derived } from 'svelte/store';

type Theme = 'light' | 'dark' | 'auto';
type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
	id: string;
	message: string;
	type: ToastType;
	duration?: number;
}

interface ModalState {
	isOpen: boolean;
	type?: string;
	props?: Record<string, any>;
}

interface UIState {
	theme: Theme;
	toasts: Toast[];
	modal: ModalState;
	sidebarOpen: boolean;
	mobileMenuOpen: boolean;
}

const initialState: UIState = {
	theme: 'light',
	toasts: [],
	modal: { isOpen: false },
	sidebarOpen: true,
	mobileMenuOpen: false
};

function createUIStore() {
	const { subscribe, set, update } = writable<UIState>(initialState);

	return {
		subscribe,
		set,
		update,
		setTheme: (theme: Theme) => {
			if (theme === 'auto') {
				localStorage.removeItem('theme');
				const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
				document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
			} else {
				localStorage.setItem('theme', theme);
				document.documentElement.setAttribute('data-theme', theme);
			}
			update(state => ({ ...state, theme }));
		},
		initializeTheme: () => {
			const savedTheme = localStorage.getItem('theme') as Theme;
			if (savedTheme && savedTheme !== 'auto') {
				update(state => ({ ...state, theme: savedTheme }));
				document.documentElement.setAttribute('data-theme', savedTheme);
			} else {
				const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
				const autoTheme = prefersDark ? 'dark' : 'light';
				update(state => ({ ...state, theme: 'auto' }));
				document.documentElement.setAttribute('data-theme', autoTheme);
			}
		},
		addToast: (message: string, type: ToastType = 'info', duration = 3000) => {
			const id = Math.random().toString(36).substring(2, 9);
			const toast: Toast = { id, message, type, duration };

			update(state => ({
				...state,
				toasts: [...state.toasts, toast]
			}));

			if (duration > 0) {
				setTimeout(() => {
					update(state => ({
						...state,
						toasts: state.toasts.filter(t => t.id !== id)
					}));
				}, duration);
			}
		},
		removeToast: (id: string) => {
			update(state => ({
				...state,
				toasts: state.toasts.filter(t => t.id !== id)
			}));
		},
		clearToasts: () => update(state => ({ ...state, toasts: [] })),
		openModal: (type: string, props?: Record<string, any>) => {
			update(state => ({
				...state,
				modal: { isOpen: true, type, props }
			}));
		},
		closeModal: () => {
			update(state => ({
				...state,
				modal: { isOpen: false }
			}));
		},
		toggleSidebar: () => update(state => ({ ...state, sidebarOpen: !state.sidebarOpen })),
		setSidebarOpen: (open: boolean) => update(state => ({ ...state, sidebarOpen: open })),
		toggleMobileMenu: () => update(state => ({ ...state, mobileMenuOpen: !state.mobileMenuOpen })),
		setMobileMenuOpen: (open: boolean) => update(state => ({ ...state, mobileMenuOpen: open }))
	};
}

export const uiStore = createUIStore();
export const theme = derived(uiStore, $ui => $ui.theme);
export const toasts = derived(uiStore, $ui => $ui.toasts);
export const isModalOpen = derived(uiStore, $ui => $ui.modal.isOpen);
export const isSidebarOpen = derived(uiStore, $ui => $ui.sidebarOpen);

// Create a reactive store for system dark mode preference
// This prevents unnecessary re-computation of window.matchMedia()
const systemDarkMode = writable(false);

// Set up listener for system preference changes (only on client)
if (typeof window !== 'undefined') {
	const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
	systemDarkMode.set(mediaQuery.matches);

	// Listen for system preference changes
	mediaQuery.addEventListener('change', (e) => {
		systemDarkMode.set(e.matches);
	});
}

export const isDarkMode = derived(
	[theme, systemDarkMode],
	([$theme, $systemDarkMode]) => {
		if ($theme === 'auto') {
			return $systemDarkMode;
		}
		return $theme === 'dark';
	}
);
