import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormGroupDirective,
    FormsModule,
    NgForm,
    ReactiveFormsModule,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ErrorStateMatcher } from "@angular/material/core";

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(
        control: FormControl | null,
        form: FormGroupDirective | NgForm | null
    ): boolean {
        const isError = control?.errors?.description;
        return isError;
    }
}

@Component({
    selector: "input-overview-example",
    styleUrls: ["input-overview-example.css"],
    templateUrl: "input-overview-example.html",
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
    ],
})
export class InputOverviewExample {
    decimalFormControl: FormControl;
    previousValue: number;
    previousValidValue: number;
    decimalCtrl: HTMLInputElement;
    emittedValue: number | undefined;
    matcher = new MyErrorStateMatcher();

    @Input() label = "Favorite digit";

    @Output() numberChange = new EventEmitter<number | undefined>();

    constructor(private formBuilder: FormBuilder) {
        this.decimalFormControl = new FormControl<number | undefined>(
            undefined
        );

        this.decimalFormControl.valueChanges.subscribe((value) => {
            this.amountChange(value);
        });
    }

    ngOnInit(): void {
        this.decimalCtrl = document.getElementById(
            "decimalCtrl"
        ) as HTMLInputElement;
    }

    /*ngAfterViewInit(): void {
        this.previousValue = this.decimalCtrl.valueAsNumber;
        console.log(`decimalCtrl ${this.decimalCtrl} ${this.previousValue}`);
        this.useCurrentCultureAndStepForManualInput(this.previousValue);
    }*/
    amountChange(event: any): void {
        console.log("value Changes", event);
        console.log(this.decimalFormControl.getRawValue());
        if (event == null || isNaN(event)) {
            // this.decimalFormControl.patchValue(undefined, {
            //     emitEvent: false,
            // });
            this.emittedValue = undefined;
        } else {
            this.previousValidValue = event;
            this.emittedValue = event;
        }
    }

    onBlur(): void {
        const value = this.decimalFormControl.value as number;
        this.decimalFormControl.patchValue(undefined, {
            emitEvent: false,
        });
        this.decimalFormControl.patchValue(value, {
            emitEvent: false,
        });
    }

    changed(event: any): void {
        if (event.target.value && this.previousValue != event.target.value) {
            this.useCurrentCultureAndStepForManualInput(event.target.value);
        }
    }

    onChangeLabel(): void {
        this.label = "Fav #";
        if (!this.decimalFormControl.value) {
            this.decimalFormControl.setErrors({
                description: "this value is not allowed",
            });
        }
    }

    private useCurrentCultureAndStepForManualInput(value: number): void {
        // this.decimalCtrl.stepUp();
        // this.decimalCtrl.stepDown();
        this.previousValue = this.decimalCtrl.valueAsNumber;
        console.log("valid value", this.previousValue);

        this.decimalFormControl.setValue(this.previousValue);
    }
}
