<div align="center">
  <table>
    <tr>
      <td align="center"><img src="/visuales/public/logo_uni.png" alt="Logo Universidad" width="150" /></td>
      <td width="100"></td> <!-- Espaciador -->
      <td align="center"><img src="/visuales/public/logo_carrera.png" alt="Logo Licenciatura" width="150" /></td>
    </tr>
  </table>

  <h1>🏗️ PROYECTO ESCOLAR</h1>
  <h3>Colegio de Ingenieros Civiles de Tuxtla Gutiérrez A.C.</h3>
</div>

<br>

Este proyecto forma parte de la asignatura ***"Desarrollo de Páginas Web"***. El objetivo principal es plantear, diseñar y desarrollar una propuesta moderna, interactiva y funcional para el portal oficial del Colegio de Ingenieros Civiles.

<br>

## Tecnologías y Herramientas

El proyecto está construido bajo un stack moderno enfocado en el rendimiento y la fluidez visual:

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

---

## Equipo de Trabajo y Roles

| Rol | Integrantes |
| :--- | :--- |
| 💻 **Desarrollo Web** | Pablo Ramírez, Daniel Barrera |
| 🎨 **Diseño UI/UX** | Jocelyn Aguilar, Maria Fernanda Uribe |
| 📝 **Documentación y Análisis** | Ignacio Moela, Jose Maria Orantes, Josue Balbuena |

---

## Paleta de Colores del Proyecto

Para mantener la consistencia visual en toda la plataforma, por favor utiliza los siguientes colores según su propósito indicado:

| Color | Código HEX | RGB | Uso principal |
| :--- | :---: | :---: | :--- |
| **Gris claro** | `#E5E5E5` <br> ![](https://placehold.co/15x15/E5E5E5/E5E5E5.png) | `229, 229, 229` | Fondos principales y áreas claras |
| **Gris oscuro** | `#383637` <br> ![](https://placehold.co/15x15/383637/383637.png) | `56, 54, 55` | Textos, subtítulos y elementos secundarios |
| **Rojo oscuro** | `#962E35` <br> ![](https://placehold.co/15x15/962E35/962E35.png) | `150, 46, 53` | Fondos secundarios, detalles y sombras |
| **Rojo institucional** | `#BA2A33` <br> ![](https://placehold.co/15x15/BA2A33/BA2A33.png) | `186, 42, 51` | Color principal, títulos y botones |
| **Blanco** | `#FFFFFF` <br> ![](https://placehold.co/15x15/FFFFFF/FFFFFF.png) | `255, 255, 255` | Fondos, textos sobre fondos oscuros y contraste |

---

# 🚀 Guía de Git y GitHub para el Equipo

¡Hola equipo! 👋 Para que podamos trabajar todos al mismo tiempo en el portal del Colegio de Ingenieros sin borrar el progreso de los demás, usaremos un flujo de trabajo basado en **Ramas (Branches)** y **Pull Requests (PR)**. 

⚠️ **REGLA DE ORO:** NUNCA, bajo ninguna circunstancia, se debe escribir código o hacer *commits* estando en la rama `main`. La rama `main` es sagrada y solo tiene código 100% terminado y funcional.

Aquí están los pasos exactos que debes seguir cada vez que te sientes a trabajar en tu parte:

## Paso 1: Actualiza tu computadora (¡Haz esto SIEMPRE antes de empezar!) 🔄
Antes de crear nada, debes asegurarte de que tienes los últimos cambios que hicieron tus compañeros.
Abre tu terminal en VS Code y escribe:
```bash
git checkout main
git pull origin main
```
*(Esto te cambia a la rama principal y descarga lo más nuevo de GitHub).*

## Paso 2: Crea tu propia rama de trabajo 🌿
Ahora vas a crear una "copia" del proyecto donde podrás hacer todos los cambios sin afectar a nadie. Nombra tu rama dependiendo de lo que vayas a hacer:
- Si es algo visual o de código: `feat/nombre-seccion`
- Si es arreglar un error: `fix/error-boton`
- Si es documentación: `docs/manual-usuario`

Escribe en la terminal:
```bash
git checkout -b feat/mi-nueva-seccion
```
*(El `-b` crea la rama y te pasa automáticamente a ella. ¡Ahora es seguro trabajar!)*

## Paso 3: ¡A trabajar! 💻
Abre tus archivos, modifica el CSS, agrega componentes de React, escribe la documentación, etc. Guarda tus archivos normalmente (`Ctrl + S`).

## Paso 4: Guarda tus cambios (Add y Commit) 📦
Cuando hayas terminado una tarea específica (por ejemplo, "Terminé el Footer"), debes "empaquetar" esos cambios.
Primero, prepara todos los archivos modificados:
```bash
git add .
```
Luego, ponles una etiqueta explicando qué hiciste (sé claro y breve):
```bash
git commit -m "Agregado el mapa de Google al Footer"
```
*(Puedes hacer varios `add` y `commit` en tu rama si estás haciendo muchas cosas).*

## Paso 5: Sube tu rama a la nube ☁️
Hasta ahora, todos tus cambios solo existen en tu computadora. Para que el equipo los vea, súbelos a GitHub:
```bash
git push origin feat/mi-nueva-seccion
```
*(Asegúrate de escribir el nombre exacto de la rama que creaste en el Paso 2).*

## Paso 6: Crea el Pull Request (PR) en GitHub 🤝
1. Ve a la página de nuestro repositorio en **GitHub**.
2. Verás un cartelito amarillo/verde que dice que acabas de subir una rama y un botón que dice **"Compare & pull request"**. ¡Dale clic!
3. Ponle un título a tu PR (ej. *"Diseño final del Footer"*) y en la descripción comenta brevemente qué hiciste.
4. Haz clic en **"Create pull request"**.

¡Y listo! 🎉 Ahora el encargado de revisar el código verá tu trabajo, lo aprobará y lo unirá a la rama `main` de forma segura.

---

### 💡 Tips Rápidos
* ¿No sabes en qué rama estás parado? Escribe: `git branch` (la que tiene un asterisco verde es donde estás).
* Si vas a dejar de trabajar hoy pero no has terminado tu sección, igual haz un `commit` y `push` para tener un respaldo en la nube. Al día siguiente solo abres tu rama y sigues trabajando.