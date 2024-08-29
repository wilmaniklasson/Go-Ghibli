import { Film } from "./interface";
import Joi from 'joi';

type ValidationResult = ValidationSuccess | ValidationFailure;

interface ValidationSuccess {
	success: true;
	value: Film[];
}

interface ValidationFailure {
	success: false;
	error: string;
}

const schema = Joi.array().items(
	Joi.object({
		image: Joi.string().uri().required(),
		title: Joi.string().required(),
		id: Joi.number().required(),
		director: Joi.string().required(),
		release_date: Joi.string().required(),
		description: Joi.string().required()
	})
);

export function validateFilms(films: Film[]): ValidationResult {
	const result = schema.validate(films);

	if (result.error) {
		return { success: false, error: result.error.message };
	} else {
		return { success: true, value: films };
	}
}
