import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthService } from "./auth.service";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [AuthService],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [AuthService],
    };
  }
}
