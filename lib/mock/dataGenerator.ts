export const MOCK_DATA = {
    products: [
        { id: 1, name: 'Premium Wireless Headphones', brand: 'AudioMax', price: '₹12,499', rating: 4.8, category: 'Electronics' },
        { id: 2, name: 'Smart Fitness Tracker', brand: 'FitBit', price: '₹4,999', rating: 4.5, category: 'Electronics' },
        { id: 3, name: 'Cotton Slim Fit Shirt', brand: 'Levis', price: '₹1,599', rating: 4.2, category: 'Fashion' },
        { id: 4, name: 'Memory Foam Pillow', brand: 'SleepWell', price: '₹899', rating: 4.7, category: 'Home' },
        { id: 5, name: 'Mechanical Keyboard RGB', brand: 'Razer', price: '₹8,999', rating: 4.9, category: 'Electronics' },
    ],
    transactions: [
        { id: 'TXN001', date: '2024-02-10', amount: '₹1,200', status: 'Completed', method: 'UPI' },
        { id: 'TXN002', date: '2024-02-11', amount: '₹4,500', status: 'Pending', method: 'Card' },
        { id: 'TXN003', date: '2024-02-12', amount: '₹850', status: 'Completed', method: 'Wallet' },
    ],
    notifications: [
        { id: 1, type: 'Order', message: 'Your order for "Premium Headphones" has been shipped!' },
        { id: 2, type: 'Offer', message: 'Flash Sale! Use code SAVE20 for extra discount.' },
    ]
};

export const getMockData = (type: keyof typeof MOCK_DATA) => MOCK_DATA[type];
