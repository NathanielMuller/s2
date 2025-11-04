/**
 * Archivo de animaciones reutilizables para SkeletonAPP
 * Contiene las animaciones usando Ionic AnimationController
 */

import { AnimationController } from '@ionic/angular';

/**
 * Animación de entrada para el título del HomePage
 * Combina fade-in con escala desde 0.5 a 1
 * @param element - Elemento HTML a animar
 * @param animationController - Controlador de animaciones de Ionic
 * @returns Animation - Instancia de la animación
 */
export function createTitleEnterAnimation(element: HTMLElement, animationController: AnimationController) {
  return animationController
    .create()
    .addElement(element)
    .duration(1000)
    .easing('ease-out')
    .fromTo('opacity', '0', '1')
    .fromTo('transform', 'scale(0.5) translateY(-20px)', 'scale(1) translateY(0px)');
}

/**
 * Animación de movimiento horizontal para inputs (izquierda a derecha)
 * Usada cuando se ejecuta "Limpiar" en los campos Nombre y Apellido
 * @param elements - Array de elementos HTML a animar
 * @param animationController - Controlador de animaciones de Ionic
 * @returns Animation - Instancia de la animación
 */
export function createSlideRightAnimation(elements: HTMLElement[], animationController: AnimationController) {
  return animationController
    .create()
    .addElement(elements)
    .duration(1000)
    .easing('ease-in-out')
    .iterations(1)
    .keyframes([
      { offset: 0, transform: 'translateX(0px)' },
      { offset: 0.25, transform: 'translateX(-20px)' },
      { offset: 0.75, transform: 'translateX(20px)' },
      { offset: 1, transform: 'translateX(0px)' }
    ]);
}

/**
 * Animación suave para transiciones de páginas
 * @param element - Elemento a animar
 * @param animationController - Controlador de animaciones
 * @returns Animation - Instancia de la animación
 */
export function createFadeInAnimation(element: HTMLElement, animationController: AnimationController) {
  return animationController
    .create()
    .addElement(element)
    .duration(500)
    .easing('ease-in')
    .fromTo('opacity', '0', '1');
}