import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
	const { gameName, emails } = (await req.json()) as {
		gameName: string;
		emails: string[];
	};

	const transporter = nodemailer.createTransport({
		host: 'zeus.ssl.hosttech.eu',
		port: 587,
		secure: false,
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASS,
		},
	});

	const mailOptions = {
		from: '"Stefan Fries" <Stefan@FreshFries.de>',
		to: emails.join(','),
		subject: `${gameName} Reviewcode`,
		text: `Dear Sir or Madam,

my name is Stefan Fries. I'm the host of the german YouTube and Twitch-Channel FreshFries. You can find my Channels here: https://YouTube.com/FreshFries and on https://Twitch.tv/FreshFries. I would like to review ${gameName} on my Channels. Can you send me one or two keys of your game to start it? The second key would be for a little raffle for my community.

Best regards,
Stefan Fries`,
	};

	try {
		await transporter.sendMail(mailOptions);
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Fehler beim Mailversand:', error);
		return NextResponse.json({
			success: false,
			error: 'Mailversand fehlgeschlagen',
		});
	}
}
