import { useState } from 'react';
import { useAuth } from './provider/authProvider';

function Book({ id, title, author, price, onDelete, onUpdate, onAddToCart }) {
    const { isAdmin } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [tempTitle, setTempTitle] = useState(title);
    const [tempAuthor, setTempAuthor] = useState(author);
    const [tempPrice, setTempPrice] = useState(price);

    const handleSave = () => {
        const updatedBook = { id, title: tempTitle, author: tempAuthor, price: parseFloat(tempPrice), copies: 10 };
        onUpdate(id, updatedBook);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="book-row editing">
                <input type="text" value={tempTitle} onChange={(e) => setTempTitle(e.target.value)} />
                <input type="text" value={tempAuthor} onChange={(e) => setTempAuthor(e.target.value)} />
                <input type="number" value={tempPrice} onChange={(e) => setTempPrice(e.target.value)} />
                <button onClick={handleSave} className="btn-save">Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
        );
    }

    return (
        <div className="book-row" style={{ border: '1px solid #ccc', margin: '10px 0', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9f9f9' }}>
            <div className="book-info" style={{ textAlign: 'left' }}>
                <h3 style={{ margin: '0 0 5px 0' }}>{title}</h3>
                <p style={{ margin: '0' }}><strong>Author:</strong> {author} | <strong>Price:</strong> ${Number(price).toFixed(2)}</p>
            </div>
            <div className="book-actions">
                <button onClick={() => onAddToCart(id)} style={{ backgroundColor: '#28a745', color: 'white' }}>🛒 Add to Cart</button>
                {isAdmin && (
                    <>
                        <button onClick={() => setIsEditing(true)} style={{ backgroundColor: '#ffc107' }}>Edit</button>
                        <button onClick={() => onDelete(id)} style={{ backgroundColor: '#ff4444', color: 'white' }}>Delete</button>
                    </>
                )}
            </div>
        </div>
    );
}
export default Book;