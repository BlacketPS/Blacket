export function experienceToLevel(experience: number): number {
	return .805 * Math.pow(experience, 1 / 2.75);
};

export function levelToExperience(level: number): number {
	return Math.pow(level / .805, 2.75);
};

export function levelToExperienceRemaining(level: number, experience: number): number {
	return levelToExperience(level + 1) - experience;
};