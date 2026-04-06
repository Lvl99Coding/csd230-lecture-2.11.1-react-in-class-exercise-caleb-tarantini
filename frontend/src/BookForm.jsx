import { useState } from 'react';
import { useAuth } from "./provider/authProvider";

function BookForm({ onBookAdded, api }) {
    // 1. Define state for each input field
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [copies, setCopies] = useState(1);
    const [submitError, setSubmitError] = useState('');
    const { isAdmin, token } = useAuth();

    // 2. The Submit Handler
    const handleSubmit = async (e) => {
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
        try {
            const res = await api.post('books', newBook);

            alert("Book added successfully.");
            onBookAdded(res.data);

            setTitle('');
            setAuthor('');
            setPrice('');
            setCopies(1);
            setSubmitError('');
        } catch (error) {
            console.error("Save Error", error.response?.data || error.message);
            alert('Unable to save book. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ border: '2px solid blue', padding: '20px', marginBottom: '20px' }}>
            {isAdmin && (
                <>
                    <h3>Add New Book</h3>
                    <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                    <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required min="0" step="0.01" />
                    {submitError && <p style={{ color: '#b00020', margin: '8px 0 0' }}>{submitError}</p>}
                    <button type="submit">Save to Database</button>
                </>
            )}

        </form>
    );
}

export default BookForm;