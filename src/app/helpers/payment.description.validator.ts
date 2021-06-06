import { AbstractControl, ValidationErrors } from "@angular/forms";

export function paymentDescriptionValidator(control: AbstractControl): ValidationErrors | null {
    const description = control.get('description');
    const type = control.get('type');

    if (description.pristine) {
        return null;
    }

    return description && description.value == 'Full Tuition Payment' && type.value != 'full'?
    { 'descriptionInvalid' : true} : null;
}