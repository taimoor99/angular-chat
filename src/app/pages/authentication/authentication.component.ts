import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormService } from './../../services/form/form.service';
import { ChatService } from './../../services/chat/chat.service';
import { Auth } from './../../interfaces/auth';

@Component({
	selector: 'app-authentication',
	templateUrl: './authentication.component.html',
	styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

	public setTabPosition = 'center';
	public overlayDisplay = false;
	public isuserNameAvailable = false;
	public loginError = false;

	registrationForm: FormGroup;
	constructor(
		private router: Router,
		private formService: FormService,
		private chatService: ChatService
	) {
		this.registrationForm = this.formService.createRegistrationForm();
	}

	ngOnInit() {
		this.overlayDisplay = true;
		this.chatService.userSessionCheck().subscribe( async (loggedIn: boolean) => {
			if (loggedIn) {
				await this.router.navigate(['/pages/home']);
				this.overlayDisplay = false;
			} else {
				this.overlayDisplay = false;
			}
		});
	}

	register(): void {
		if (this.registrationForm.valid) {
			this.overlayDisplay = false;
			this.chatService.register(this.registrationForm.value).subscribe(
				(response: Auth) => {
					localStorage.setItem('userid', response.userId);
					this.router.navigate(['/pages/home']);
				},
				(error) => {
					this.overlayDisplay = true;
					alert('Something bad happened; please try again later.');
				}
			);
		}
	}
}
