import React, { useState } from 'react';
import { useAuth } from './provider/authProvider';

function Tablet({ id, brand, screenSize, price, onDelete, onUpdate, onAddToCart }) {
    const { isAdmin } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [tempBrand, setTempBrand] = useState(brand);
    const [tempScreenSize, setTempScreenSize] = useState(screenSize);
    const [tempPrice, setTempPrice] = useState(price);

    const handleSave = () => {
        const updatedTablet = { id, brand: tempBrand, screenSize: parseFloat(tempScreenSize), price: parseFloat(tempPrice) };
        onUpdate(id, updatedTablet);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="tablet-row editing">
                <input type="text" value={tempBrand} onChange={(e) => setTempBrand(e.target.value)} />
                <input type="number" value={tempScreenSize} onChange={(e) => setTempScreenSize(e.target.value)} />
                <input type="number" value={tempPrice} onChange={(e) => setTempPrice(e.target.value)} />
                <button onClick={handleSave} className="btn-save">Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
        );
    }

    return (
        <div className="tablet-row" style={{ border: '1px solid #ccc', margin: '10px 0', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9f9f9' }}>
            <div className="tablet-info" style={{ textAlign: 'left' }}>
                <h3 style={{ margin: '0 0 5px 0' }}>{brand}</h3>
                <p style={{ margin: '0' }}><strong>Screen Size:</strong> {screenSize} inches | <strong>Price:</strong> ${Number(price).toFixed(2)}</p>
            </div>
            <div className="tablet-actions">
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

export default Tablet;
