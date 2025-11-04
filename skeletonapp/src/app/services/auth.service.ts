/**
 * Servicio de autenticación y validaciones para SkeletonAPP
 * Proporciona métodos para validar campos y gestionar datos de usuario
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  /**
   * Validar formato de usuario (alfanumérico, 3-8 caracteres)
   * @param usuario - String a validar
   * @returns boolean - true si es válido
   */
  validateUsername(usuario: string): boolean {
    const pattern = /^[a-zA-Z0-9]{3,8}$/;
    return pattern.test(usuario);
  }

  /**
   * Validar formato de password (exactamente 4 dígitos)
   * @param password - String a validar
   * @returns boolean - true si es válido
   */
  validatePassword(password: string): boolean {
    const pattern = /^\d{4}$/;
    return pattern.test(password);
  }

  /**
   * Validar nombres (solo letras y espacios, mínimo 1 carácter)
   * @param name - String a validar
   * @returns boolean - true si es válido
   */
  validateName(name: string): boolean {
    const pattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return name.length >= 1 && pattern.test(name);
  }

  /**
   * Obtener casos de prueba para testing
   * @returns Array de casos de prueba
   */
  getTestCases() {
    return [
      {
        name: 'Caso A - Usuario válido',
        usuario: 'Juan12',
        password: '1234',
        expected: 'success',
        description: 'Usuario válido debe permitir ingreso y mostrar en Home'
      },
      {
        name: 'Caso B - Usuario inválido (muy corto)',
        usuario: 'Ju',
        password: '1234',
        expected: 'error',
        description: 'Usuario con 2 caracteres debe mostrar error'
      },
      {
        name: 'Caso C - Password inválido',
        usuario: 'Juan12',
        password: '123',
        expected: 'error',
        description: 'Password con menos de 4 dígitos debe mostrar error'
      },
      {
        name: 'Caso D - Usuario con caracteres especiales',
        usuario: 'Juan@12',
        password: '1234',
        expected: 'error',
        description: 'Usuario con caracteres especiales debe mostrar error'
      }
    ];
  }

  /**
   * Obtener mensajes de error personalizados
   * @param field - Campo con error
   * @param errorType - Tipo de error
   * @returns string - Mensaje de error
   */
  getErrorMessage(field: string, errorType: string): string {
    const messages: { [key: string]: { [key: string]: string } } = {
      usuario: {
        required: 'El usuario es requerido',
        minlength: 'El usuario debe tener mínimo 3 caracteres',
        maxlength: 'El usuario debe tener máximo 8 caracteres',
        pattern: 'El usuario solo puede contener letras y números'
      },
      password: {
        required: 'La contraseña es requerida',
        pattern: 'La contraseña debe ser exactamente 4 dígitos'
      },
      nombre: {
        required: 'El nombre es requerido',
        pattern: 'El nombre solo puede contener letras y espacios',
        minlength: 'El nombre debe tener al menos 1 carácter'
      },
      apellido: {
        required: 'El apellido es requerido',
        pattern: 'El apellido solo puede contener letras y espacios',
        minlength: 'El apellido debe tener al menos 1 carácter'
      }
    };

    return messages[field]?.[errorType] || 'Error de validación';
  }
}