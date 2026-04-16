import { useState } from 'react';
import { useAuth } from "./provider/authProvider";

function TicketForm({ onTicketAdded, api }) {
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [submitError, setSubmitError] = useState('');
    const { isAdmin } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const parsedPrice = Number(price);

        if (!description.trim() || !Number.isFinite(parsedPrice)) {
            setSubmitError('Please enter valid values for all fields.');
            return;
        }

        const newTicket = {
            description: description.trim(),
            price: parsedPrice
        };

        try {
            const res = await api.post('tickets', newTicket);

            alert("Ticket added successfully.");
            onTicketAdded(res.data);

            setDescription('');
            setPrice('');
            setSubmitError('');
        } catch (error) {
            console.error("Save Error", error.response?.data || error.message);
            alert('Unable to save ticket. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ border: '2px solid blue', padding: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {isAdmin && (
                <>
                    <header style={{ backgroundColor: 'blue', padding: '10px', marginBottom: '15px' }}>
                        <h3 style={{ color: 'white', margin: 0 }}>Add New Ticket</h3>
                    </header>
                    <label>
                        Description:
                        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required style={{ width: '100%', backgroundColor: '#f0f0f0', color: 'black' }} />
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

export default TicketForm;
