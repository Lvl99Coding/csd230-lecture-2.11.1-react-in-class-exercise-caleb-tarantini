import { useState } from 'react';

function MagazineForm({ onMagazineAdded }) {
    // 1. Define state for each input field
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [copies, setCopies] = useState(1);
    const [orderQty, setOrderQty] = useState('');
    const [currentIssue, setCurrentIssue] = useState('');
    const [submitError, setSubmitError] = useState('');

    // 2. The Submit Handler
    const handleSubmit = (e) => {
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

        // 3. POST to Spring Boot
        fetch('/api/magazines', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMagazine),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Unable to save magazine');
                }
                return response.json();
            })
            .then(savedMagazine => {
                alert("Magazine Saved!");
                onMagazineAdded(savedMagazine); // Tell the parent to update the list
                // 4. Clear the form
                setTitle('');
                setPrice('');
                setCopies(1);
                setOrderQty('');
                setCurrentIssue('');
                setSubmitError('');
            })
            .catch(() => setSubmitError('Unable to save magazine. Please try again.'));
    };

    return (
        <form onSubmit={handleSubmit} style={{ border: '2px solid blue', padding: '20px', marginBottom: '20px' }}>
            <h3>Add New Magazine</h3>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required min="0" step="0.01" />
            <input type="number" placeholder="Copies" value={copies} onChange={(e) => setCopies(e.target.value)} required min="0" step="1" />
            <input type="number" placeholder="Order Qty" value={orderQty} onChange={(e) => setOrderQty(e.target.value)} required min="0" step="1" />
            <input type="date" placeholder="Current Issue" value={currentIssue} onChange={(e) => setCurrentIssue(e.target.value)} required />
            {submitError && <p style={{ color: '#b00020', margin: '8px 0 0' }}>{submitError}</p>}
            <button type="submit">Save to Database</button>
        </form>
    );
}

export default MagazineForm;