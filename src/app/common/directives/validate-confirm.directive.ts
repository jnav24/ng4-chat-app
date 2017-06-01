import { Directive, forwardRef } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[validateConfirm][formControlName],[validateConfirm][formControl]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ValidateConfirmDirective),
      multi: true
    }
  ]
})
export class ValidateConfirmDirective implements Validator {
  constructor() { }

  validate(c: AbstractControl): { [key: string]: any } {
    if (c.get('password') !== null ) {
      if (c.value.password !== c.value.confirm_password) {
        return { validateConfirm: false };
      }
    }

    return null;
  }
}