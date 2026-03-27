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
        const newAcousticGuitar = {
            brand,
            model,
            hasCutaway,
            numberOfStrings,
            price: parseFloat(price),
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
                alert("AcousticGuitar Saved!");
                onAcousticGuitarAdded(savedAcousticGuitar); // Tell the parent to update the list
                // 4. Clear the form
                setBrand('');
                setModel('');
                setHasCutaway(false);
                setNumberOfStrings(''); // Reset to an empty string instead of savedAcousticGuitar
                setPrice('');
                setSubmitError('');
            })
            .catch(() => setSubmitError('Unable to save acoustic guitar. Please try again.'));
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

            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <label>Cutaway?</label>
                <select
                    value={hasCutaway ? 'yes' : 'no'}
                    onChange={(e) => setHasCutaway(e.target.value === 'yes')}
                    required
                >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </div>

            <input
                type="number"
                placeholder="number of strings"
                value={numberOfStrings}
                onChange={(e) => setNumberOfStrings(e.target.value)}
                required
            />

            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />
            <button type="submit" style={{ backgroundColor: '#28a745', color: 'white' }}>Add Acoustic Guitar</button>
        </form>
    );
}

export default AcousticGuitarForm;
