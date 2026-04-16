import { useState } from 'react';
import { useAuth } from "./provider/authProvider";

function AcousticGuitarForm({ onAcousticGuitarAdded, api }) {
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [hasCutaway, setHasCutaway] = useState(false);
    const [numberOfStrings, setNumberOfStrings] = useState('');
    const [price, setPrice] = useState('');
    const [submitError, setSubmitError] = useState('');
    const { isAdmin } = useAuth();

    const handleSubmit = async (e) => {
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

        try{
            const res = await api.post('/acousticguitars', newAcousticGuitar);

            alert("Acoustic Guitar successfully saved to MySQL!");

            alert("Acoustic Guitar Saved!");

            onAcousticGuitarAdded(res.data);

            setBrand('');
            setModel('');
            setNumberOfStrings('');
            setHasCutaway(false);
            setPrice('');
            setSubmitError('');
        }catch (err){
            console.error("Save Error:", err.response?.data || err.message);
            alert('Unable to save acoustic guitar. Please try again.');

        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ border: '2px solid blue', padding: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {isAdmin && (
                <>
                    <header style={{ backgroundColor: 'blue', padding: '10px', marginBottom: '15px' }}>
                        <h3 style={{ color: 'white', margin: 0 }}>Add New Acoustic Guitar</h3>
                    </header>
                    <label>
                        Brand:
                        <input type="text" placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} required style={{ width: '100%', backgroundColor: '#f0f0f0', color: 'black' }} />
                    </label>
                    <label>
                        Model:
                        <input type="text" placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} required style={{ width: '100%', backgroundColor: '#f0f0f0', color: 'black' }} />
                    </label>
                    <label>
                        Cutaway?
                        <select value={hasCutaway ? 'yes' : 'no'} onChange={(e) => setHasCutaway(e.target.value === 'yes')} required style={{ width: '100%', backgroundColor: '#f0f0f0', color: 'black' }}>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </label>
                    <label>
                        Number of Strings:
                        <input type="number" placeholder="Number of Strings" value={numberOfStrings} onChange={(e) => setNumberOfStrings(e.target.value)} required min="1" step="1" style={{ width: '100%', backgroundColor: '#f0f0f0', color: 'black' }} />
                    </label>
                    <label>
                        Price:
                        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required min="0" step="0.01" style={{ width: '100%', backgroundColor: '#f0f0f0', color: 'black' }} />
                    </label>
                    {submitError && <p style={{ color: '#b00020', margin: '8px 0 0' }}>{submitError}</p>}
                    <button type="submit" style={{ alignSelf: 'flex-start' }}>Save to Database</button>
                </>
            )}
        </form>
    );
}

export default AcousticGuitarForm;
