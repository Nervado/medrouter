import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthService } from "./auth.service";
import { ClientGuard } from "./guards/client.guard";
import { AuthInterceptor } from "./middleware/auth.interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { RoleGuard } from "./guards/role.guard";
import { CriptoService } from "./cripto.service";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [AuthService, ClientGuard, RoleGuard, CriptoService],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        AuthService,
        ClientGuard,
        RoleGuard,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    };
  }
}
