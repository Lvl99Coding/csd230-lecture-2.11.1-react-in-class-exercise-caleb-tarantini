import { useState } from 'react';
import { useAuth } from './provider/authProvider';

function DiscMag({ id, title, price, copies, hasDisc, orderQty, currentIssue, onDelete, onUpdate, onAddToCart }) {
    const { isAdmin } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [tempTitle, setTempTitle] = useState(title);
    const [tempPrice, setTempPrice] = useState(price);
    const [tempCopies, setTempCopies] = useState(copies);
    const [tempHasDisc, setTempHasDisc] = useState(hasDisc);
    const [tempOrderQuantity, setTempOrderQuantity] = useState(orderQty || 0);
    const [tempCurrentIssue, setTempCurrentIssue] = useState(currentIssue);

    const handleSave = () => {
        const updatedDiscMag = {
            id,
            title: tempTitle,
            price: parseFloat(tempPrice),
            copies: tempCopies, // Ensure copies is an integer
            hasDisc: tempHasDisc,
            orderQty: tempOrderQuantity, // Updated field name to match server
            currentIssue: tempCurrentIssue// Format date as ISO 8601
        };
        onUpdate(id, updatedDiscMag);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="discmag-row editing" style={{ border: '2px solid #4444ff', margin: '10px 0', padding: '15px', borderRadius: '8px', display: 'flex', gap: '10px', backgroundColor: '#eef' }}>
                <input type="text" value={tempTitle} onChange={(e) => setTempTitle(e.target.value)} style={{ flex: 2 }} placeholder="Title" />
                <input type="number" value={tempPrice} onChange={(e) => setTempPrice(e.target.value)} style={{ width: '80px' }} placeholder="Price" />
                <input type="number" value={tempCopies} onChange={(e) => setTempCopies(e.target.value)} style={{ width: '80px' }} placeholder="Copies" min="0" step="1" />
                <label>
                    <input
                        type="checkbox"
                        checked={tempHasDisc}
                        onChange={(e) => setTempHasDisc(e.target.checked)}
                    />
                    Has Disc
                </label>
                <input type="number" value={tempOrderQuantity} onChange={(e) => setTempOrderQuantity(e.target.value)} style={{ width: '80px' }} placeholder="Order Qty" min="0" step="1" />
                <input type="date" value={tempCurrentIssue} onChange={(e) => setTempCurrentIssue(e.target.value)} style={{ width: '140px' }} />

                <button onClick={handleSave} style={{ backgroundColor: '#28a745', color: 'white' }}>Save</button>
                <button onClick={() => setIsEditing(false)} style={{ backgroundColor: '#6c757d', color: 'white' }}>Cancel</button>
            </div>
        );
    }

    return (
        <div className="discmag-row" style={{ border: '1px solid #ccc', margin: '10px 0', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9f9f9' }}>
            <div className="discmag-info" style={{ textAlign: 'left' }}>
                <h3 style={{ margin: '0 0 5px 0' }}>{title}</h3>
                <p style={{ margin: '0' }}>
                    <strong>Price:</strong> ${price.toFixed(2)} | <strong>Copies:</strong> {copies} | <strong>Order Qty:</strong> {orderQty}
                </p>
                <p style={{ margin: '0' }}>
                    <strong>Current Issue:</strong> {currentIssue} | <strong>Has Disc:</strong> {hasDisc ? 'Yes' : 'No'}
                </p>
            </div>

            <div className="discmag-actions">
                <button
                    onClick={() => onAddToCart(id)}
                    style={{ backgroundColor: '#28a745', color: 'white' }}
                >
                    🛒 Add to Cart
                </button>
                {isAdmin && (
                    <>
                        <button
                            onClick={() => setIsEditing(true)}
                            style={{ backgroundColor: '#ffc107', marginRight: '5px' }}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(id)}
                            style={{ backgroundColor: '#ff4444', color: 'white' }}
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default DiscMag;
