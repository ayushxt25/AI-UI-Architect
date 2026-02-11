"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppState {
    cart: any[];
    user: any | null;
    notifications: string[];
    metadata: Record<string, any>;
}

interface AppContextType {
    state: AppState;
    setState: React.Dispatch<React.SetStateAction<AppState>>;
    updateMetadata: (key: string, value: any) => void;
    addToCart: (item: any) => void;
    addNotification: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AppState>({
        cart: [],
        user: { name: 'Demo User', role: 'Architect' },
        notifications: [],
        metadata: {}
    });

    const updateMetadata = (key: string, value: any) => {
        setState(prev => ({ ...prev, metadata: { ...prev.metadata, [key]: value } }));
    };

    const addToCart = (item: any) => {
        setState(prev => ({ ...prev, cart: [...prev.cart, item], notifications: [...prev.notifications, `Added ${item.name || 'item'} to cart`] }));
    };

    const addNotification = (msg: string) => {
        setState(prev => ({ ...prev, notifications: [...prev.notifications, msg] }));
    };

    return (
        <AppContext.Provider value={{ state, setState, updateMetadata, addToCart, addNotification }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppState = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error('useAppState must be used within AppStateProvider');
    return context;
};
