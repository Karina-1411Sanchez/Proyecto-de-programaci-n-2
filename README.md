## Reflexion virtual de personalidad
### Contexto
En la actualidad, el autoconocimiento es importante para el desarrollo personal, academico y profesional.
La idea de este proyecto busca crear una aplicacion web, que permita a los usuarios concerce mejor, 
a través de la evaluación de habitos, gustos y emociones. La aplicación genera un avatar psicologico que
refleja la personalidad del usuario, el cual ofrece una forma interactiva y dinamica para el autoconocimiento.

### Area
- Psicología  aplicada al ambito universitario

### Modulos del sistema 
1. Inicio de Sesión y Registro:
   - Registro de nuevos usuarios con correo y contraseña.
   - Inicio de sesión con validación de credenciales.
   - Opción de recuperar contraseña.
   - Almacenamiento seguro de datos.

2. Perfil de Usuario
   - Visualización de datos personales.
   - Historial de cuestionarios respondidos.
   - Evolución del avatar psicológico.
   - Posibilidad de editar información básica.

3. Cuestionarios de Autoevaluación
   - Hábitos diarios → sueño, alimentación, rutinas.
   - Gustos personales → actividades favoritas, pasatiempos, intereses.
   - Estados emocionales → niveles de felicidad, estrés, ansiedad, motivación.

4. Generación de Avatar Psicológico
   - El avatar se construye dinámicamente según las respuestas.
   - Colores: reflejan emociones predominantes.
   - Formas y símbolos: representan hábitos y conductas.
   - Descripción automática: texto con interpretación psicológica de la personalidad.

5. Evolución y Estadísticas
   - Representación gráfica de la evolución emocional y de hábitos.
   - Comparación de diferentes periodos (semanal, mensual).
   - Gráficas dinámicas con Chart.js.

6. Consejos Personalizados
   - Recomendaciones de bienestar académico y emocional.
   - Estrategias para mejorar hábitos de estudio y manejo del tiempo.
   - Tips para controlar el estrés y aumentar la motivación.

### Tecnologias
- Javascript :Lenguaje de programacion 
- HTML: Estructura del contenido
- CSS: Diseño
- Visual Studio Code: Editor de codigo
- Chart.js: Graficas dinamicas
- Firebase: base de datos.

### Integrantes
- [Yurany Alejandra Pachon ](https://github.com/YURANYPACHON39)
- [Mayra Karina Sanchez Sanchez](https://github.com/Karina-1411Sanchez)

### Diagrama de información

```mermaid
flowchart TD
    A["Usuario"] --> B["Registro / Login"]
    A --> C["Perfil de Usuario"]
    C --> C1["Datos Personales"]
    C --> C2["Historial de Cuestionarios"]

    A --> D["Cuestionarios"]
    D --> D1["Hábitos Diarios"]
    D --> D2["Gustos Personales"]
    D --> D3["Estados Emocionales"]

    A --> E["Generación de Avatar"]
    E --> E1["Colores según Emociones"]
    E --> E2["Formas y Símbolos según Hábitos"]
    E --> E3["Descripción de Personalidad (Texto)"]

    A --> F["Evolución y Estadísticas"]
    F --> F1["Gráficos de Cambios en el Tiempo"]
    F --> F2["Comparación de Períodos"]

    A --> G["Consejos Personalizados"]

    A --> H["Opciones Sociales (Opcional)"]
    H --> H1["Comparación con Otros Usuarios"]
    H --> H2["Compartir Avatar / Análisis"]

