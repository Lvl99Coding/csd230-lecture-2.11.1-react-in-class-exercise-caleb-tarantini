import { useState } from 'react';
import { useAuth } from "./provider/authProvider";

function MagazineForm({ onMagazineAdded, api }) {
    // 1. Define state for each input field
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [copies, setCopies] = useState(1);
    const [orderQty, setOrderQty] = useState('');
    const [currentIssue, setCurrentIssue] = useState('');
    const [submitError, setSubmitError] = useState('');

    // 2. The Submit Handler
    const handleSubmit = async (e) => {
        e.preventDefault(); // Stop the page from reloading!

        const parsedPrice = price.trim() === '' ? null : Number(price);

        if (!title.trim() || (parsedPrice !== null && !Number.isFinite(parsedPrice)) || !Number.isInteger(Number(copies)) || !Number.isInteger(Number(orderQty)) || !currentIssue) {
            setSubmitError('Please enter valid values for all fields.');
            return;
        }

        const newMagazine = {
            title: title.trim(),
            price: parsedPrice, // Allow null for price
            copies: Number(copies), // Ensure copies is a number
            orderQty: Number(orderQty), // Ensure orderQty is a number
            currentIssue,
        };

        try {
            const res = await api.post('magazines', newMagazine);

            alert("Magazine added successfully.");
            onMagazineAdded(res.data);

            setTitle('');
            setPrice('');
            setCopies(1);
            setOrderQty(1);
            setCurrentIssue('');
            setSubmitError('');
        } catch (error) {
            console.error("Save Error", error.response?.data || error.message);
            alert('Unable to save magazine. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ border: '2px solid blue', padding: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <header style={{ backgroundColor: 'blue', padding: '10px', marginBottom: '15px' }}>
                <h3 style={{ color: 'white', margin: 0 }}>Add New Magazine</h3>
            </header>
            <label>
                Title:
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: '100%', backgroundColor: '#f0f0f0', color: 'black' }} />
            </label>
            <label>
                Price:
                <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required min="0" step="0.01" style={{ width: '100%', backgroundColor: '#f0f0f0', color: 'black' }} />
            </label>
            <label>
                Copies:
                <input type="number" placeholder="Copies" value={copies} onChange={(e) => setCopies(e.target.value)} required min="0" step="1" style={{ width: '100%', backgroundColor: '#f0f0f0', color: 'black' }} />
            </label>
            <label>
                Order Qty:
                <input type="number" placeholder="Order Qty" value={orderQty} onChange={(e) => setOrderQty(e.target.value)} required min="0" step="1" style={{ width: '100%', backgroundColor: '#f0f0f0', color: 'black' }} />
            </label>
            <label>
                Current Issue:
                <input type="date" placeholder="Current Issue" value={currentIssue} onChange={(e) => setCurrentIssue(e.target.value)} required style={{ width: '100%', backgroundColor: '#f0f0f0', color: 'black' }} />
            </label>
            {submitError && <p style={{ color: '#b00020', margin: '8px 0 0' }}>{submitError}</p>}
            <button type="submit" style={{ alignSelf: 'flex-start' }}>Save to Database</button>
        </form>
    );
}

export default MagazineForm;