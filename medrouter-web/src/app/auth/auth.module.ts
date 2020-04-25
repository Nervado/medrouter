import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthService } from "./auth.service";
import { ClientGuard } from "./guard/client.guard";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [AuthService, ClientGuard],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [AuthService, ClientGuard],
    };
  }
}
