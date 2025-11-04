import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  
  // Formulario reactivo para el login (Referencia a Image 1)
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertController: AlertController
  ) { 
    // Inicializar formulario con validaciones específicas
    this.loginForm = this.formBuilder.group({
      // Usuario: alfanumérico, entre 3 y 8 caracteres
      usuario: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
        Validators.pattern(/^[a-zA-Z0-9]+$/) // Solo letras y números
      ]],
      // Password: exactamente 4 dígitos numéricos
      password: ['', [
        Validators.required,
        Validators.pattern(/^\d{4}$/) // Exactamente 4 dígitos
      ]]
    });
  }

  ngOnInit() {
  }

  /**
   * Método llamado al presionar "Ingresar"
   * Valida el formulario y navega a /home pasando el usuario via NavigationExtras
   */
  async onSubmit() {
    if (this.loginForm.valid) {
      const usuario = this.loginForm.get('usuario')?.value;
      
      // Navegación usando NavigationExtras con state (no localStorage)
      // El usuario se recupera en HomePage con history.state
      await this.router.navigate(['/home'], { 
        state: { usuario: usuario } 
      });
      
      // Opcional: cerrar la página de login (resetear formulario)
      this.loginForm.reset();
    } else {
      // Mostrar mensaje de error si el formulario es inválido
      await this.showErrorAlert();
    }
  }

  /**
   * Muestra un alert con los errores de validación
   */
  private async showErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Error de validación',
      message: 'Por favor, corrige los errores en el formulario antes de continuar.',
      buttons: ['OK']
    });
    await alert.present();
  }

  /**
   * Getter para facilitar acceso a los controles del formulario en el template
   */
  get f() { 
    return this.loginForm.controls; 
  }

  /**
   * Método para obtener mensajes de error específicos para cada campo
   */
  getErrorMessage(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return `${fieldName === 'usuario' ? 'Usuario' : 'Contraseña'} es requerido`;
    }
    
    if (fieldName === 'usuario') {
      if (field?.hasError('minlength')) {
        return 'Usuario debe tener mínimo 3 caracteres';
      }
      if (field?.hasError('maxlength')) {
        return 'Usuario debe tener máximo 8 caracteres';
      }
      if (field?.hasError('pattern')) {
        return 'Usuario solo puede contener letras y números';
      }
    }
    
    if (fieldName === 'password') {
      if (field?.hasError('pattern')) {
        return 'Contraseña debe ser exactamente 4 dígitos';
      }
    }
    
    return '';
  }
}
