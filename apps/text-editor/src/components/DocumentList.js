import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
export function DocumentList({ token, onOpenDocument }) {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const fetchDocuments = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3002'}/documents`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setDocuments(data);
            }
        }
        catch (err) {
            console.error('Failed to fetch documents', err);
        }
        finally {
            setLoading(false);
        }
    };
    const createNewDocument = async () => {
        setCreating(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3002'}/documents`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title: 'Untitled Document' }),
            });
            if (res.ok) {
                const newDoc = await res.json();
                await fetchDocuments();
                onOpenDocument(newDoc);
            }
        }
        catch (err) {
            console.error('Failed to create document', err);
        }
        finally {
            setCreating(false);
        }
    };
    useEffect(() => {
        fetchDocuments();
    }, []);
    if (loading)
        return _jsx("div", { style: { textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }, children: "Loading documents..." });
    return (_jsxs("div", { children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }, children: [_jsx("h2", { style: { fontSize: '28px', margin: 0, fontWeight: 700, letterSpacing: '-0.02em' }, children: "Your Documents" }), _jsx("button", { onClick: createNewDocument, disabled: creating, style: { width: 'auto', padding: '12px 24px', borderRadius: '100px' }, children: creating ? 'Creating...' : '+ New Document' })] }), documents.length === 0 ? (_jsxs("div", { style: { textAlign: 'center', padding: '80px 20px', color: 'var(--text-muted)', background: 'var(--bg-surface)', borderRadius: '16px', border: '1px dashed var(--border)' }, children: [_jsx("p", { style: { fontSize: '18px', marginBottom: '16px', color: 'var(--text-main)' }, children: "No documents yet" }), "Create your first one to start collaborating!"] })) : (_jsx("div", { className: "doc-list", children: documents.map((doc) => (_jsxs("div", { className: "doc-card", onClick: () => onOpenDocument(doc), children: [_jsx("h3", { children: doc.title }), _jsxs("div", { className: "doc-meta", children: [_jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2", ry: "2" }), _jsx("line", { x1: "16", y1: "2", x2: "16", y2: "6" }), _jsx("line", { x1: "8", y1: "2", x2: "8", y2: "6" }), _jsx("line", { x1: "3", y1: "10", x2: "21", y2: "10" })] }), "Last updated: ", new Date(doc.updated_at).toLocaleDateString()] })] }, doc.id))) }))] }));
}
