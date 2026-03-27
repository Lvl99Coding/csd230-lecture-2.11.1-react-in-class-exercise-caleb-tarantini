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
        const newElectricGuitar = {
            brand,
            model,
            numberOfStrings,
            numberOfPickups,
            price: parseFloat(price),
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
                alert("ElectricGuitar Saved!");
                onElectricGuitarAdded(savedElectricGuitar); // Tell the parent to update the list
                // 4. Clear the form
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
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
                type="text"
                placeholder="Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
            />

            <input
                type="number"
                placeholder="number of strings"
                value={numberOfStrings}
                onChange={(e) => setNumberOfStrings(e.target.value)}
                required
            />

            <input
                type="number"
                placeholder="number of pickups"
                value={numberOfPickups}
                onChange={(e) => setNumberOfPickups(e.target.value)}
                required
            />

            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />
            <button type="submit" style={{ backgroundColor: '#28a745', color: 'white' }}>Add Electric Guitar</button>
        </form>
    );
}

export default ElectricGuitarForm;
