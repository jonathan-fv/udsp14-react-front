const passwordValidation = (password: string): boolean => {
	const minLength = 4;
	const maxLength = 24;
	const forbiddenPasswords = ['Passw0rd', 'Password123'];

	// Check password length
	if (password.length < minLength || password.length > maxLength) {
		return false;
	}

	// Check for uppercase, lowercase, and digits using regex
	const uppercaseRegex = /(?=(.*[A-Z]))/;
	const lowercaseRegex = /(?=(.*[a-z]))/;
	const digitsRegex = /(?=(.*\d){2})/;

	if (!(uppercaseRegex.test(password) && lowercaseRegex.test(password) && digitsRegex.test(password))) {
		return false;
	}

	// Check for spaces
	if (/\s/.test(password)) {
		return false;
	}

	// Check against forbidden passwords
	return !forbiddenPasswords.includes(password);
}

export default passwordValidation;