import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import {
    FormBuilder,
    FormControl,
    FormsModule,
    ReactiveFormsModule,
} from "@angular/forms";
import { CommonModule } from "@angular/common";

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
    previousValidValue: number;
    decimalCtrl: HTMLInputElement;
    emittedValue: number | undefined;

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

    amountChange(event: any): void {
        console.log("value Changes", event);
        console.log(this.decimalFormControl.getRawValue());
        if (event == null || isNaN(event)) {
            this.emittedValue = undefined;
        } else {
            this.previousValidValue = event;
            this.emittedValue = event;
        }

        this.numberChange.emit(this.emittedValue);
    }
}
