import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthComponent } from "./auth.component";

@NgModule({
    declarations : [
        AuthComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports : [
        AuthComponent,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class AuthModule {}