import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';  // Necesario para la mayoría de las aplicaciones Angular
import { AppComponent } from './app.component';  // Tu componente principal
import { RoomModule } from './providers/services/room/room.module';  // Importa el módulo de las habitaciones

@NgModule({
  declarations: [
    AppComponent,  // Componente principal
  ],
  imports: [
    BrowserModule,  // Requerido por Angular
    RoomModule,  // Importa el RoomModule aquí
  ],
  providers: [],
  bootstrap: [AppComponent]  // Define el componente que Angular debe usar como principal
})
export class AppModule {}
