import { useState } from 'react';
import { useAuth } from './provider/authProvider';

function Ticket({ id, description, price, onDelete, onUpdate, onAddToCart }) {
    const { isAdmin } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [tempDescription, setTempDescription] = useState(description);
    const [tempPrice, setTempPrice] = useState(price);

    const handleSave = () => {
        const updatedTicket = { id, description: tempDescription, price: parseFloat(tempPrice) };
        onUpdate(id, updatedTicket);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="ticket-row editing">
                <input type="text" value={tempDescription} onChange={(e) => setTempDescription(e.target.value)} />
                <input type="number" value={tempPrice} onChange={(e) => setTempPrice(e.target.value)} />
                <button onClick={handleSave} className="btn-save">Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
        );
    }

    return (
        <div className="ticket-row" style={{ border: '1px solid #ccc', margin: '10px 0', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9f9f9' }}>
            <div className="ticket-info" style={{ textAlign: 'left' }}>
                <h3 style={{ margin: '0 0 5px 0' }}>{description}</h3>
                <p style={{ margin: '0' }}><strong>Price:</strong> ${Number(price).toFixed(2)}</p>
            </div>
            <div className="ticket-actions">
                <button onClick={() => onAddToCart(id)} style={{ backgroundColor: '#28a745', color: 'white' }}>
                    🛒 Add to Cart
                </button>
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

export default Ticket;
