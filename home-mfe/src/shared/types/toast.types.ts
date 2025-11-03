export interface ToastContextType {
  showSuccess: (message: string, detail?: string) => void;
  showError: (message: string, detail?: string) => void;
  showInfo: (message: string, detail?: string) => void;
  showWarn: (message: string, detail?: string) => void;
}

export type ToastSeverity = 'success' | 'error' | 'info' | 'warn';