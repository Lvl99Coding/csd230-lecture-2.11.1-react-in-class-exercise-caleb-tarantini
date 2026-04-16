import React, { useState } from 'react';

function TabletForm({ onSubmit }) {
    const [brand, setBrand] = useState('');
    const [screenSize, setScreenSize] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ brand, screenSize, price });
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
                type="text"
                placeholder="Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
            />
            <input
                type="number"
                placeholder="Screen Size"
                value={screenSize}
                onChange={(e) => setScreenSize(e.target.value)}
            />
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <button type="submit">Add Tablet</button>
        </form>
    );
}

export default TabletForm;
