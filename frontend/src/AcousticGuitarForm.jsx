import { useState } from 'react';

function AcousticGuitarForm({ onAcousticGuitarAdded }) {
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [hasCutaway, setHasCutaway] = useState(false);
    const [numberOfStrings, setNumberOfStrings] = useState('');
    const [price, setPrice] = useState('');
    const [submitError, setSubmitError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const parsedPrice = Number(price);

        if (!brand.trim() || !model.trim() || !Number.isFinite(parsedPrice) || !Number.isInteger(Number(numberOfStrings))) {
            setSubmitError('Please enter valid values for all fields.');
            return;
        }

        const newAcousticGuitar = {
            brand: brand.trim(),
            model: model.trim(),
            hasCutaway,
            numberOfStrings: Number(numberOfStrings),
            price: parsedPrice,
        };

        fetch('/api/acousticguitars', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newAcousticGuitar),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Unable to save acoustic guitar');
                }
                return response.json();
            })
            .then(savedAcousticGuitar => {
                alert("Acoustic Guitar Saved!");
                onAcousticGuitarAdded(savedAcousticGuitar);
                setBrand('');
                setModel('');
                setHasCutaway(false);
                setNumberOfStrings('');
                setPrice('');
                setSubmitError('');
            })
            .catch(() => setSubmitError('Unable to save acoustic guitar. Please try again.'));
    };

    return (
        <form onSubmit={handleSubmit} style={{ border: '2px solid blue', padding: '20px', marginBottom: '20px' }}>
            <h3>Add New Acoustic Guitar</h3>
            <input type="text" placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} required />
            <input type="text" placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} required />
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <label>Cutaway?</label>
                <select value={hasCutaway ? 'yes' : 'no'} onChange={(e) => setHasCutaway(e.target.value === 'yes')} required>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </div>
            <input type="number" placeholder="Number of Strings" value={numberOfStrings} onChange={(e) => setNumberOfStrings(e.target.value)} required min="1" step="1" />
            <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required min="0" step="0.01" />
            {submitError && <p style={{ color: '#b00020', margin: '8px 0 0' }}>{submitError}</p>}
            <button type="submit">Save to Database</button>
        </form>
    );
}

export default AcousticGuitarForm;
