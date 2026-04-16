import React, { useState } from 'react';
import { useAuth } from './provider/authProvider';

function ComicBook({ id, title, author, price, copies, genre, onDelete, onUpdate, onAddToCart }) {
    const { isAdmin } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [tempTitle, setTempTitle] = useState(title);
    const [tempGenre, setTempGenre] = useState(genre);
    const [tempAuthor, setTempAuthor] = useState(author);
    const [tempPrice, setTempPrice] = useState(price);
    const [tempCopies, setTempCopies] = useState(copies);

    const handleSave = () => {
        const updatedComicBook = { id, title: tempTitle, author: tempAuthor, price: tempPrice, copies: tempCopies, genre: tempGenre };
        onUpdate(id, updatedComicBook);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="comicbook-row editing">
                <input type="text" value={tempTitle} onChange={(e) => setTempTitle(e.target.value)} />
                <input type="text" value={tempGenre} onChange={(e) => setTempGenre(e.target.value)} />
                <input type="text" value={tempAuthor} onChange={(e) => setTempAuthor(e.target.value)} />
                <input type="text" value={tempPrice} onChange={(e) => setTempPrice(e.target.value)} />
                <input type="text" value={tempCopies} onChange={(e) => setTempCopies(e.target.value)} />

                <button onClick={handleSave} className="btn-save">Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
        );
    }

    return (
        <div className="comicbook-row" style={{ border: '1px solid #ccc', margin: '10px 0', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9f9f9' }}>
            <div className="comicbook-info" style={{ textAlign: 'left' }}>
                <h3 style={{ margin: '0 0 5px 0' }}>{title}</h3>
                <p style={{ margin: '0' }}><strong>Genre:</strong> {genre}</p>
            </div>
            <div className="comicbook-actions">
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

export default ComicBook;
