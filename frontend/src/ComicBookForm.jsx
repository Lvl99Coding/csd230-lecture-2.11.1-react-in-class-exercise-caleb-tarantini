import React, { useState } from 'react';

function ComicBookForm({ onSubmit }) {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, genre });
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
            />
            <button type="submit">Add Comic Book</button>
        </form>
    );
}

export default ComicBookForm;
