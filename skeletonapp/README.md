# SkeletonAPP - Ionic Angular Application

## 📱 Descripción del Proyecto

SkeletonAPP es una aplicación móvil desarrollada con **Ionic 8** y **Angular 20** que cumple con todos los requisitos de la actividad "No es todo". La aplicación incluye un sistema de login con validaciones reactivas, una página home con formulario de datos personales, animaciones personalizadas y uso de Angular Material DatePicker.

## 🚀 Tecnologías Utilizadas

- **Framework**: Ionic 8.0.0
- **Frontend**: Angular 20.0.0
- **UI Components**: Angular Material (DatePicker)
- **Animaciones**: Ionic AnimationController
- **Formularios**: ReactiveFormsModule
- **Validaciones**: Angular Validators + Custom Patterns
- **Navegación**: Angular Router con NavigationExtras

## 📋 Funcionalidades Implementadas

### ✅ LoginPage (Ruta: /login)
- **Formulario reactivo** con validaciones estrictas
- **Campo Usuario**: alfanumérico, 3-8 caracteres, label flotante
- **Campo Password**: exactamente 4 dígitos, mostrado como "****"
- **Validación en tiempo real** con mensajes de error
- **Botón "Ingresar"** deshabilitado si formulario inválido
- **Navegación con NavigationExtras** (state) hacia /home
- **Casos de prueba incluidos**

### ✅ HomePage (Ruta: /home)
- **Recuperación de usuario** via history.state (NavigationExtras)
- **Formulario completo** con campos: Nombre, Apellido, Nivel Educación, Fecha Nacimiento
- **Angular Material DatePicker** integrado para fecha de nacimiento
- **Validaciones reactivas** para nombres (solo letras y espacios)
- **Botón "Limpiar"**: resetea formulario + animación de inputs
- **Botón "Mostrar"**: muestra alert con información personal
- **Animación del título** al cargar la página

### ✅ Animaciones Implementadas
- **Título HomePage**: animación de entrada (fade + escala)
- **Inputs Nombre/Apellido**: animación horizontal al ejecutar "Limpiar"
- **Duración**: 1 segundo, una iteración
- **Motor**: Ionic AnimationController

## 🛠️ Instalación y Configuración

### Prerrequisitos
```bash
# Verificar versiones mínimas
node --version    # >= 18.0.0
npm --version     # >= 9.0.0
```

### 1. Clonar/Descomprimir el Proyecto
```bash
# Si es un ZIP, extraer en la carpeta deseada
# Si es repositorio:
git clone <repository-url>
cd skeletonapp
```

### 2. Instalar Dependencias
```bash
# Instalar todas las dependencias del proyecto
npm install

# Verificar que Angular Material esté instalado
npm list @angular/material @angular/cdk
```

### 3. Ejecutar en Modo Desarrollo
```bash
# Iniciar servidor de desarrollo
npm start
# o
ng serve

# La aplicación estará disponible en: http://localhost:4200
```

### 4. Ejecutar en Dispositivo/Emulador
```bash
# Para Android
ionic capacitor add android
ionic capacitor run android

# Para iOS (solo macOS)
ionic capacitor add ios
ionic capacitor run ios
```

## 🧪 Casos de Prueba

### Caso A: Login Exitoso
```
Usuario: Juan12
Password: 1234
Resultado Esperado: Navegación a /home, mostrar "Usuario: Juan12"
```

### Caso B: Usuario Inválido
```
Usuario: Ju (2 caracteres)
Password: 1234
Resultado Esperado: Botón "Ingresar" deshabilitado, mensaje de error
```

### Caso C: Funcionalidad "Limpiar"
```
1. Rellenar campos Nombre y Apellido en HomePage
2. Presionar "Limpiar"
3. Resultado Esperado: Campos vacíos + animación horizontal de inputs
```

### Caso D: Funcionalidad "Mostrar"
```
1. Rellenar todos los campos en HomePage
2. Presionar "Mostrar"
3. Resultado Esperado: Alert con mensaje "Su nombre es [nombre] [apellido]" + botón "Yes"
```

## 📁 Estructura de Archivos Modificados/Creados

```
src/app/
├── login/
│   ├── login.page.ts          ✅ Formulario reactivo + validaciones
│   ├── login.page.html        ✅ Template según mockup Image 1
│   ├── login.page.scss        ✅ Estilos personalizados
│   └── login.module.ts        ✅ ReactiveFormsModule importado
├── home/
│   ├── home.page.ts           ✅ Formulario + animaciones + MatDatepicker
│   ├── home.page.html         ✅ Template según mockup Image 2
│   ├── home.page.scss         ✅ Estilos + Angular Material
│   └── home.module.ts         ✅ Material modules importados
├── shared/
│   └── animations.ts          ✅ Animaciones reutilizables
├── services/
│   └── auth.service.ts        ✅ Validaciones y casos de prueba
├── app-routing.module.ts      ✅ Rutas /login y /home
└── app.module.ts              ✅ BrowserAnimationsModule
```

## 🎯 Comandos de Desarrollo

```bash
# Desarrollo
npm start                 # Servidor de desarrollo
npm run build             # Build para producción
npm run build --prod      # Build optimizado
npm test                  # Ejecutar tests unitarios
npm run lint              # Análisis de código

# Ionic específicos
ionic serve               # Servidor con live reload
ionic build               # Build del proyecto
ionic capacitor sync      # Sincronizar cambios con plataformas nativas
```

## 📦 Generar ZIP para Entrega

### Método 1: Usando Git (Recomendado)
```bash
# Crear archivo .gitignore si no existe
echo "node_modules/" > .gitignore
echo "e2e/" >> .gitignore
echo "*.log" >> .gitignore
echo ".angular/" >> .gitignore

# Comprimir excluyendo archivos innecesarios
git archive --format=zip --output=skeletonapp-entrega.zip HEAD
```

### Método 2: Compresión Manual
```bash
# En Windows PowerShell
Compress-Archive -Path "src", "angular.json", "ionic.config.json", "package.json", "tsconfig.json", "README.md" -DestinationPath "skeletonapp-entrega.zip"

# En Linux/macOS
zip -r skeletonapp-entrega.zip . -x "node_modules/*" "e2e/*" "*.log" ".angular/*"
```

### Archivos a EXCLUIR del ZIP:
- ❌ `node_modules/` (se instala con npm install)
- ❌ `e2e/` (tests end-to-end, no requeridos)
- ❌ `*.log` (logs del sistema)
- ❌ `.angular/` (cache de Angular CLI)

### Archivos a INCLUIR en el ZIP:
- ✅ `src/` (código fuente completo)
- ✅ `angular.json` (configuración Angular)
- ✅ `ionic.config.json` (configuración Ionic)
- ✅ `package.json` (dependencias)
- ✅ `tsconfig.json` (configuración TypeScript)
- ✅ `README.md` (este archivo)

## 🔧 Configuración de Angular Material

El proyecto incluye Angular Material configurado para el DatePicker:

```typescript
// En home.module.ts
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
```

## 🎨 Diseño y Mockups

- **Image 1**: LoginPage con formulario de usuario/password
- **Image 2**: HomePage con formulario completo y botones de acción
- **Header**: "SkeletonAPP" en ambas páginas
- **Colores**: Esquema azul Ionic (#3880ff)

## 🚨 Solución de Problemas

### Error: Angular Material no encontrado
```bash
npm install @angular/material @angular/cdk
ng add @angular/material
```

### Error: Animaciones no funcionan
```bash
# Verificar que BrowserAnimationsModule esté importado en app.module.ts
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
```

### Error: NavigationExtras no pasa datos
```bash
# Verificar en HomePage que se usa history.state
if (history.state && history.state.usuario) {
  this.usuario = history.state.usuario;
}
```

## 👨‍💻 Información del Desarrollador

- **Proyecto**: SkeletonAPP
- **Actividad**: "No es todo"
- **Tecnología**: Ionic 8 + Angular 20
- **Fecha**: Noviembre 2025

## 📄 Licencia

Este proyecto es para fines educativos - Duoc UC - Desarrollo de Aplicaciones Móviles.