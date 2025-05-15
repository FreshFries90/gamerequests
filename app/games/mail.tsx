'use client';

import { useState } from 'react';

type MailButtonProps = {
	gameName: string;
	emails: string[];
};
type MailResponse = {
	success: boolean;
	error?: string;
};
export function MailButton({ gameName, emails }: MailButtonProps) {
	const [status, setStatus] = useState('');

	async function handleClick() {
		setStatus('Senden...');
		const res = await fetch('/api/sendMail', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ gameName, emails }),
		});

		const data = (await res.json()) as MailResponse;

		if (data.success) {
			setStatus('📨 Mail versandt');
		} else {
			setStatus('❌ Fehler beim Senden');
		}
	}

	return (
		<li>
			<button onClick={handleClick}>📧 Mail senden</button>
			{status && <div>{status}</div>}
		</li>
	);
}
