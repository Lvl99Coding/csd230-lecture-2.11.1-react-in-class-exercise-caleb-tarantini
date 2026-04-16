import { useState } from 'react';
import { useAuth } from "./provider/authProvider";

function ElectricGuitarForm({ onElectricGuitarAdded, api }) {
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [price, setPrice] = useState('');
    const [submitError, setSubmitError] = useState('');
    const { isAdmin, token } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const parsedPrice = Number(price);

        if (!brand.trim() || !model.trim() || !Number.isFinite(parsedPrice)) {
            setSubmitError('Please enter valid values for all fields.');
            return;
        }

        const newElectricGuitar = {
            brand: brand.trim(),
            model: model.trim(),
            price: parsedPrice,
        };

        try{
            const res = await api.post('/electricguitars', newElectricGuitar);

            alert("Electric Guitar successfully saved to MySQL!");

            onElectricGuitarAdded(res.data);

            setBrand('');
            setModel('');
            setPrice('');
            setSubmitError('');
        }catch (err){
            console.error("Save Error:", err.response?.data || err.message);
            alert('Unable to save electric guitar. Please try again.');

        }

    };

    return (
        <form onSubmit={handleSubmit} style={{ border: '2px solid blue', padding: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {isAdmin && (
                <>
                    <header style={{ backgroundColor: 'blue', padding: '10px', marginBottom: '15px' }}>
                        <h3 style={{ color: 'white', margin: 0 }}>Add New Electric Guitar</h3>
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
                        Price:
                        <input
                            type="number"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            min="0"
                            step="0.01"
                            style={{ width: '100%', backgroundColor: '#f0f0f0', color: 'black' }}
                        />
                    </label>
                    {submitError && <p style={{ color: '#b00020', margin: '8px 0 0' }}>{submitError}</p>}
                    <button type="submit" style={{ alignSelf: 'flex-start' }}>Save to Database</button>
                </>
            )}
        </form>
    );
}

export default ElectricGuitarForm;
