import { AbstractControl, ValidationErrors } from "@angular/forms";

export function guardianContactValidator(control: AbstractControl): ValidationErrors | null {
    const type = control.get('type');
    const relationToChild = control.get('relationToChild');

    if (relationToChild.pristine) {
        return null;
    }

    return relationToChild && type.value == "GUARDIAN" && relationToChild.value != "Mother" && relationToChild.value != "Father"?
    { 'guardianInvalid' : true} : null;
}