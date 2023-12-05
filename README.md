# GestionTareas
Este proyecto fue generado con Angular CLI versión 16.2.10.

## Descripción
Este sitio web esta construido en angular y firebase, y nos ayuda a gestionar notas o tareas de estudiantes. 

## Enlace
[https://gestiontareas-9a107.web.app](https://gestiontareas-9a107.web.app)

## Requisitos del Sistema
- Navegador web moderno (Chrome, Firefox, Safari, etc.).
- Conexión a Internet.

## Instalación y Configuración Local
1. Clona este repositorio.
2. Instala las dependencias con `npm install`.
3. Se necesita la instalacion de angular.
4. Configura las credenciales de Firebase en el archivo `environment.ts` de acuerdo a como quieras guardar la enformacion.
5. Ejecuta `ng serve` para iniciar el servidor de desarrollo.
6. Abre el navegador y visita `http://localhost:4200`.

## Uso de Firebase
Este proyecto utiliza Firebase para guardar las notas o tareas de los estudiantes. Asegúrate de tener una cuenta de Firebase y configura las credenciales en el archivo de configuración.
Para utilizar Firebase se requiere una cuenta de desarrolladores de Google.
Se crean los siguientes archivos en la carpeta raiz del proyecto:
- `.firebaserc`: Contiene la configuración de Firebase.
- `firebase.json`: Define la estructura de directorios y archivos que se subirán al deploy.


## Características
- La lista de nuestras tareas estan agrupadas de acuerdo a las categorias.
- Puedes agregar tareas.
- Puedes eliminar o actualizar una tarea segun lo necesario.