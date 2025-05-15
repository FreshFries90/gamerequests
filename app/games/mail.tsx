type MailButtonProps = {
	gameName: string;
	emails: string[];
};

export function MailButton({ gameName, emails }: MailButtonProps) {
	const subject = encodeURIComponent(`${gameName} Reviewcode`);
	const body = encodeURIComponent(`Dear Sir or Madam,

my name is Stefan Fries. I'm the host of the german YouTube and Twitch-Channel FreshFries. You can find my Channels here: https://YouTube.com/FreshFries and on https://Twitch.tv/FreshFries. I would like to review ${gameName} on my Channels. Can you send me one or two keys of your game to start it? The second key would be for a little raffle for my community.

Best regards,
Stefan Fries`);

	const mailto =
		`mailto:${emails.join(',')}` + `?subject=${subject}&body=${body}`;

	return <a href={mailto}>📧 Mail senden</a>;
}
