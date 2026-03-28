import { useState } from 'react';

function ElectricGuitarForm({ onElectricGuitarAdded }) {
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [numberOfStrings, setNumberOfStrings] = useState('');
    const [numberOfPickups, setNumberOfPickups] = useState('');
    const [price, setPrice] = useState('');
    const [submitError, setSubmitError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const parsedPrice = Number(price);

        if (!brand.trim() || !model.trim() || !Number.isFinite(parsedPrice) || !Number.isInteger(Number(numberOfStrings)) || !Number.isInteger(Number(numberOfPickups))) {
            setSubmitError('Please enter valid values for all fields.');
            return;
        }

        const newElectricGuitar = {
            brand: brand.trim(),
            model: model.trim(),
            numberOfStrings: Number(numberOfStrings),
            numberOfPickups: Number(numberOfPickups),
            price: parsedPrice,
        };

        fetch('/api/electricguitars', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newElectricGuitar),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Unable to save electric guitar');
                }
                return response.json();
            })
            .then(savedElectricGuitar => {
                alert("Electric Guitar Saved!");
                onElectricGuitarAdded(savedElectricGuitar);
                setBrand('');
                setModel('');
                setNumberOfStrings('');
                setNumberOfPickups('');
                setPrice('');
                setSubmitError('');
            })
            .catch(() => setSubmitError('Unable to save electric guitar. Please try again.'));
    };

    return (
        <form onSubmit={handleSubmit} style={{ border: '2px solid blue', padding: '20px', marginBottom: '20px' }}>
            <h3>Add New Electric Guitar</h3>
            <input type="text" placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} required />
            <input type="text" placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} required />
            <input
                type="number"
                placeholder="Number of Strings"
                value={numberOfStrings}
                onChange={(e) => setNumberOfStrings(e.target.value)}
                required
                min="1"
                step="1"
            />
            <input
                type="number"
                placeholder="Number of Pickups"
                value={numberOfPickups}
                onChange={(e) => setNumberOfPickups(e.target.value)}
                required
                min="1"
                step="1"
            />
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                min="0"
                step="0.01"
            />
            {submitError && <p style={{ color: '#b00020', margin: '8px 0 0' }}>{submitError}</p>}
            <button type="submit">Save to Database</button>
        </form>
    );
}

export default ElectricGuitarForm;
