import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UsernameValidator } from './../../classes/validators/username-validator';
import { MessageValidator } from './../../classes/validators/message-validator';

@Injectable()
export class FormService {
	constructor() { }

	createRegistrationForm(): FormGroup {
		return new FormBuilder().group({
			username: new UsernameValidator(),
		});
	}

	createMessageForm(): FormGroup {
		return new FormBuilder().group({
			message: new MessageValidator
		});
	}
}
