import React, { createContext, useContext, useRef, ReactNode } from 'react';
import { Toast } from 'primereact/toast';
// @/Types
import { ToastContextType, ToastSeverity } from '../types/toast.types';

const ToastContext = createContext<ToastContextType | undefined>(undefined);


interface ToastProviderProps {
    children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
    const toastRef = useRef<Toast>(null);

    const showToast = (severity: ToastSeverity, message: string, detail?: string) => {

        toastRef.current?.show({
            severity,
            summary: message,
            detail: detail,
            life: 3000
        });
    }


    const showSuccess = (message: string, detail?: string) => {
        showToast('success', message, detail);
    }

    const showError = (message: string, detail?: string) => {
        showToast('error', message, detail);
    }
    const showInfo = (message: string, detail?: string) => {
        showToast('info', message, detail);
    }
    const showWarn = (message: string, detail?: string) => {
        showToast('warn', message, detail);
    }

    return (
        <ToastContext.Provider value={{
            showSuccess,
            showError,
            showInfo,
            showWarn
        }}>
            <Toast ref={toastRef} />
            {children}
        </ToastContext.Provider>
    )
}


 

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
 