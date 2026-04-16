import { useState } from 'react';
import { useAuth } from "./provider/authProvider";

function DiscMagForm({ onDiscMagAdded, api }) {
    const [title, setTitle] = useState('');
    const [hasDisc, setHasDisc] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const { isAdmin } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            setSubmitError('Please enter a valid title.');
            return;
        }

        const newDiscMag = {
            title: title.trim(),
            hasDisc
        };

        try {
            const res = await api.post('discmags', newDiscMag);

            alert("Disc Magazine added successfully.");
            onDiscMagAdded(res.data);

            setTitle('');
            setHasDisc(false);
            setSubmitError('');
        } catch (error) {
            console.error("Save Error", error.response?.data || error.message);
            alert('Unable to save disc magazine. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ border: '2px solid blue', padding: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {isAdmin && (
                <>
                    <header style={{ backgroundColor: 'blue', padding: '10px', marginBottom: '15px' }}>
                        <h3 style={{ color: 'white', margin: 0 }}>Add New Disc Magazine</h3>
                    </header>
                    <label>
                        Title:
                        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: '100%', backgroundColor: '#f0f0f0', color: 'black' }} />
                    </label>
                    <label>
                        <input type="checkbox" checked={hasDisc} onChange={(e) => setHasDisc(e.target.checked)} />
                        Has Disc
                    </label>
                    {submitError && <p style={{ color: '#b00020', margin: '8px 0 0' }}>{submitError}</p>}
                    <button type="submit" style={{ alignSelf: 'flex-start' }}>Save to Database</button>
                </>
            )}
        </form>
    );
}

export default DiscMagForm;
