import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { createTitleEnterAnimation, createSlideRightAnimation } from '../shared/animations';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit, AfterViewInit {

  // Usuario recibido desde LoginPage via NavigationExtras
  usuario: string = '';
  
  // Formulario reactivo para los datos personales (según Image 2)
  homeForm: FormGroup;

  // Referencias para animaciones
  @ViewChild('titleElement', { static: false }) titleElement!: ElementRef;
  @ViewChild('nombreInput', { static: false }) nombreInput!: ElementRef;
  @ViewChild('apellidoInput', { static: false }) apellidoInput!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private animationController: AnimationController
  ) {
    // Inicializar formulario con validaciones
    this.homeForm = this.formBuilder.group({
      // Nombre: mínimo 1 carácter, solo letras y espacios
      nombre: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/) // Solo letras y espacios
      ]],
      // Apellido: mínimo 1 carácter, solo letras y espacios
      apellido: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/) // Solo letras y espacios
      ]],
      // Nivel de educación: select obligatorio
      nivelEducacion: ['', [Validators.required]],
      // Fecha de nacimiento: usando MatDatepicker
      fechaNacimiento: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    // Recuperar usuario desde NavigationExtras (history.state)
    // Método 1: usando history.state (recomendado)
    if (history.state && history.state.usuario) {
      this.usuario = history.state.usuario;
    }
    
    // Método 2: usando ActivatedRoute (alternativo, comentado)
    // this.route.paramMap.subscribe(() => {
    //   if (history.state && history.state.usuario) {
    //     this.usuario = history.state.usuario;
    //   }
    // });
  }

  ngAfterViewInit() {
    // Ejecutar animación del título al cargar la página
    this.animateTitle();
  }

  /**
   * Animación del título "Bienvenido!" al cargar la página
   */
  private animateTitle() {
    if (this.titleElement) {
      const animation = createTitleEnterAnimation(
        this.titleElement.nativeElement, 
        this.animationController
      );
      animation.play();
    }
  }

  /**
   * Método para limpiar todos los campos del formulario
   * Además ejecuta animación en los inputs Nombre y Apellido
   */
  limpiar() {
    // Limpiar formulario
    this.homeForm.reset();
    
    // Ejecutar animación de izquierda a derecha en Nombre y Apellido
    this.animateInputs();
  }

  /**
   * Animación de movimiento horizontal para los inputs Nombre y Apellido
   */
  private animateInputs() {
    if (this.nombreInput && this.apellidoInput) {
      const elements = [
        this.nombreInput.nativeElement,
        this.apellidoInput.nativeElement
      ];
      
      const animation = createSlideRightAnimation(elements, this.animationController);
      animation.play();
    }
  }

  /**
   * Método para mostrar alert con los datos ingresados
   */
  async mostrar() {
    if (this.homeForm.valid) {
      const nombre = this.homeForm.get('nombre')?.value;
      const apellido = this.homeForm.get('apellido')?.value;
      const nivelEducacion = this.homeForm.get('nivelEducacion')?.value;
      const fechaNacimiento = this.homeForm.get('fechaNacimiento')?.value;

      let mensaje = `Su nombre es ${nombre} ${apellido}`;
      
      if (nivelEducacion) {
        mensaje += `\nNivel de educación: ${nivelEducacion}`;
      }
      
      if (fechaNacimiento) {
        const fecha = new Date(fechaNacimiento).toLocaleDateString('es-ES');
        mensaje += `\nFecha de nacimiento: ${fecha}`;
      }

      // Mostrar alert según mockup Image 2
      const alert = await this.alertController.create({
        header: 'Información Personal',
        message: mensaje,
        buttons: ['Yes']
      });
      
      await alert.present();
    } else {
      // Mostrar mensaje si hay campos vacíos
      const alert = await this.alertController.create({
        header: 'Campos incompletos',
        message: 'Por favor, complete todos los campos antes de mostrar la información.',
        buttons: ['OK']
      });
      
      await alert.present();
    }
  }

  /**
   * Opciones para el select de nivel de educación
   */
  nivelesEducacion = [
    { value: 'basica', text: 'Educación Básica' },
    { value: 'media', text: 'Educación Media' },
    { value: 'tecnico', text: 'Técnico' },
    { value: 'universitario', text: 'Universitario' },
    { value: 'postgrado', text: 'Postgrado' }
  ];

  /**
   * Getter para facilitar acceso a los controles del formulario
   */
  get f() { 
    return this.homeForm.controls; 
  }

  /**
   * Método para obtener mensajes de error específicos
   */
  getErrorMessage(fieldName: string): string {
    const field = this.homeForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return `Este campo es requerido`;
    }
    
    if (field?.hasError('pattern')) {
      return 'Solo se permiten letras y espacios';
    }
    
    if (field?.hasError('minlength')) {
      return 'Debe tener al menos 1 carácter';
    }
    
    return '';
  }
}
