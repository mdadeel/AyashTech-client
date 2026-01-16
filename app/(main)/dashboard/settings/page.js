'use client';

import { useState } from 'react';
import { Bell, Shield, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
    const [settings, setSettings] = useState({ emailNotifications: true, orderUpdates: true, requestUpdates: true, promotions: false });

    const handleSave = () => { toast.success('Settings saved!'); };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Notifications */}
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                    <Bell className="w-5 h-5 text-[var(--accent)]" />
                    <h3 className="font-semibold text-[var(--text-primary)]">Notifications</h3>
                </div>
                <div className="space-y-4">
                    {[
                        { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive email updates' },
                        { key: 'orderUpdates', label: 'Order Updates', desc: 'Get notified about order status changes' },
                        { key: 'requestUpdates', label: 'Request Updates', desc: 'Get notified when your product requests are reviewed' },
                        { key: 'promotions', label: 'Promotional Emails', desc: 'Receive deals and offers' }
                    ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between">
                            <div><p className="text-sm font-medium text-[var(--text-primary)]">{item.label}</p><p className="text-xs text-[var(--text-muted)]">{item.desc}</p></div>
                            <button onClick={() => setSettings(prev => ({ ...prev, [item.key]: !prev[item.key] }))} className={`w-11 h-6 rounded-full transition-colors relative ${settings[item.key] ? 'bg-[var(--primary)]' : 'bg-[var(--border)]'}`}>
                                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${settings[item.key] ? 'left-6' : 'left-1'}`} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Privacy */}
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-semibold text-[var(--text-primary)]">Privacy & Security</h3>
                </div>
                <div className="space-y-3">
                    <button className="w-full text-left px-4 py-3 rounded-lg bg-[var(--background-secondary)] text-sm text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors">Change Password</button>
                    <button className="w-full text-left px-4 py-3 rounded-lg bg-[var(--background-secondary)] text-sm text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors">Download My Data</button>
                    <button className="w-full text-left px-4 py-3 rounded-lg bg-red-500/10 text-sm text-red-400 hover:bg-red-500/20 transition-colors">Delete Account</button>
                </div>
            </div>

            <button onClick={handleSave} className="btn-primary flex items-center gap-2"><Save className="w-4 h-4" /><span>Save Settings</span></button>
        </div>
    );
}
