import { useState } from 'react';

function BookForm({ onBookAdded }) {
    // 1. Define state for each input field
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [copies, setCopies] = useState(1);
    const [submitError, setSubmitError] = useState('');

    // 2. The Submit Handler
    const handleSubmit = (e) => {
        e.preventDefault(); // Stop the page from reloading!

        const parsedPrice = Number(price);
        
        if (!title.trim() || !author.trim() || !Number.isFinite(parsedPrice)) {
            setSubmitError('Please enter valid values for all fields.');
            return;
        }

        const newBook = { 
            title: title.trim(), 
            author: author.trim(), 
            price: parsedPrice, 
            copies 
        };

        // 3. POST to Spring Boot
        fetch('/api/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBook),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Unable to save book');
                }
                return response.json();
            })
            .then(savedBook => {
                alert("Book Saved!");
                onBookAdded(savedBook); // Tell the parent to update the list
                // 4. Clear the form
                setTitle('');
                setAuthor('');
                setPrice('');
                setSubmitError('');
            })
            .catch(() => setSubmitError('Unable to save book. Please try again.'));
    };

    return (
        <form onSubmit={handleSubmit} style={{ border: '2px solid blue', padding: '20px', marginBottom: '20px' }}>
            <h3>Add New Book</h3>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
            <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required min="0" step="0.01" />
            {submitError && <p style={{ color: '#b00020', margin: '8px 0 0' }}>{submitError}</p>}
            <button type="submit">Save to Database</button>
        </form>
    );
}

export default BookForm;