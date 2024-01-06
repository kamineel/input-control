import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { InputOverviewExample } from "src/example/input-overview-example";

describe("input-overview.cy.ts", () => {
    it("playground", () => {
        cy.mount(InputOverviewExample, {
            componentProperties: {
                label: "Favorite no",
            },
            imports: [CommonModule, BrowserAnimationsModule],
        }).then((response) => {
            cy.get("mat-label").should("contain.text", "Favorite no");
            response.component.label = "Fav #";
            response.fixture.detectChanges();
            cy.get("mat-label").should("contain.text", "Fav #");
        });
    });
});
