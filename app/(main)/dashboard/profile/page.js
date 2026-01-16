'use client';

import { useState, useEffect } from 'react';
import { Camera, Save } from 'lucide-react';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { getCurrentUser } from '../../../lib/auth';

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', bio: '' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const currentUser = getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
            setFormData({ name: currentUser.name || '', email: currentUser.email || '', bio: 'I love shopping for quality products!' });
        }
    }, []);

    const handleSave = () => {
        Cookies.set('user_name', formData.name, { expires: 7 });
        toast.success('Profile updated!');
        setIsEditing(false);
        setUser(prev => ({ ...prev, name: formData.name }));
    };

    if (!user) return null;

    return (
        <div className="max-w-2xl mx-auto">
            {/* Avatar Section */}
            <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-3xl font-bold text-white">
                        {user.name?.charAt(0) || 'U'}
                    </div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                        <Camera className="w-4 h-4" />
                    </button>
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-[var(--text-primary)]">{user.name}</h2>
                    <p className="text-sm text-[var(--text-muted)]">{user.email}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-1 capitalize">{user.role} account</p>
                </div>
            </div>

            {/* Profile Form */}
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-[var(--text-primary)]">Personal Information</h3>
                    {!isEditing && <button onClick={() => setIsEditing(true)} className="text-sm text-[var(--accent)] hover:underline">Edit</button>}
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Full Name</label>
                        <input type="text" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} disabled={!isEditing} className="input" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Email</label>
                        <input type="email" value={formData.email} disabled className="input opacity-60" />
                        <p className="text-xs text-[var(--text-muted)] mt-1">Email cannot be changed</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Bio</label>
                        <textarea value={formData.bio} onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))} disabled={!isEditing} rows={3} className="input resize-none" />
                    </div>
                    {isEditing && (
                        <div className="flex gap-3 pt-4">
                            <button onClick={handleSave} className="btn-primary flex items-center gap-2"><Save className="w-4 h-4" /><span>Save Changes</span></button>
                            <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Cancel</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
