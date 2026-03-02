"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppState {
    cart: any[];
    user: any | null;
    notifications: string[];
    metadata: Record<string, any>;
    themeConfig: {
        primaryColor: string;
        secondaryColor: string;
        theme: 'light' | 'dark';
        fontFamily: string;
    };
}

interface AppContextType {
    state: AppState;
    setState: React.Dispatch<React.SetStateAction<AppState>>;
    updateMetadata: (key: string, value: any) => void;
    addToCart: (item: any) => void;
    addNotification: (msg: string) => void;
    setThemeConfig: (config: Partial<AppState['themeConfig']>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AppState>({
        cart: [],
        user: { name: 'Demo User', role: 'Architect' },
        notifications: [],
        metadata: {},
        themeConfig: {
            primaryColor: '#4f46e5',
            secondaryColor: '#f97316',
            theme: 'dark',
            fontFamily: "'Inter', sans-serif"
        }
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

    const setThemeConfig = (config: Partial<AppState['themeConfig']>) => {
        setState(prev => ({ ...prev, themeConfig: { ...prev.themeConfig, ...config } }));
    };

    return (
        <AppContext.Provider value={{ state, setState, updateMetadata, addToCart, addNotification, setThemeConfig }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppState = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error('useAppState must be used within AppStateProvider');
    return context;
};

export const useDataFetch = (dataSource: any[], delay = 1500) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchItems = React.useCallback(async (filter?: (item: any) => boolean) => {
        setLoading(true);
        try {
            await new Promise(r => setTimeout(r, delay));
            const sourceArray = Array.isArray(dataSource) ? dataSource : [];
            const filtered = filter ? sourceArray.filter(filter) : sourceArray;
            setData(filtered);
            setError(null);
        } catch (e) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    }, [dataSource, delay]);

    React.useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    return { data, loading, error, fetchItems };
};
