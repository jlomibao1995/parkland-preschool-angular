import { AbstractControl, ValidationErrors } from "@angular/forms";

export function guardianSignatureValidator(control: AbstractControl): ValidationErrors | null {
    const accountName = control.get('accountName');
    const parentName = control.get('parentName');

    return parentName.value != accountName.value ?
    { 'guardianInvalid' : true} : null;
}

export function disciplineSignatureValidator(control: AbstractControl): ValidationErrors | null {
    const discipline = control.get('discipline');
    const accountName = control.get('accountName');

    if (discipline.pristine) {
        return null;
    }

    return discipline && discipline.value != accountName.value ?
    { 'disciplineInvalid' : true} : null;
}

export function safetySignatureValidator(control: AbstractControl): ValidationErrors | null {
    const safety = control.get('safety');
    const accountName = control.get('accountName');

    if (safety.pristine) {
        return null;
    }

    return safety && safety.value != accountName.value ?
    { 'safetyInvalid' : true} : null;
}

export function outdoorSignatureValidator(control: AbstractControl): ValidationErrors | null {
    const outdoor = control.get('outdoor');
    const accountName = control.get('accountName');

    if (outdoor.pristine) {
        return null;
    }

    return outdoor && outdoor.value != accountName.value ?
    { 'outdoorInvalid' : true} : null;
}

export function sickSignatureValidator(control: AbstractControl): ValidationErrors | null {
    const sick = control.get('sick');
    const accountName = control.get('accountName');

    if (sick.pristine) {
        return null;
    }

    return sick && sick.value != accountName.value ?
    { 'sickInvalid' : true} : null;
}
