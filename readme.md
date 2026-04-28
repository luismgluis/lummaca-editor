# Lummaca Editor

> Editor de código basado en Monaco que puede ser embebido en cualquier aplicación web a través de un iframe con una API de mensajería simple

Inicializa en [https://editor.auby.io/](https://editor.auby.io).

## Acerca de

Lummaca Editor es una implementación personalizada basada en [Monaco Editor](https://microsoft.github.io/monaco-editor/), el mismo editor que impulsa VS Code, pero empaquetado de una manera que lo hace fácil de integrar en cualquier aplicación web.

## Características

- Editor de código completo basado en Monaco
- Fácil integración mediante iframe
- API de mensajería simple para controlar el editor
- Soporte para múltiples lenguajes de programación
- Temas personalizables
- Configuración flexible mediante parámetros URL

## Ejemplo

```html
<iframe
  src="https://editor.auby.io/?code=codigo_inicial&language=javascript&theme=vs-dark"
  id="iframe"
></iframe>
```

```javascript
const iframe = document.getElementById("iframe");
window.addEventListener("message", ({ data }) => {
  switch (data.type) {
    case "ready": {
      iframe.contentWindow?.postMessage(
        {
          type: "change-value",
          value: "nuevo valor inicial",
        },
        "*"
      );
      break;
    }
    case "change": {
      console.log("el valor actual es", data.value);
      break;
    }
  }
});
```

## Uso

Para usar Lummaca Editor, simplemente embebe la URL https://editor.auby.io/ en un iframe.

Hay dos formas principales de configurar y comunicarse con el editor:

1. A través de parámetros de consulta URL
2. Mediante la API de mensajería para controlar el editor en tiempo real

## Parámetros de consulta soportados

Se soportan los siguientes parámetros de consulta:

- `code`: Código inicial, por defecto está vacío
- `lang`: Idioma inicial, por defecto es javascript
- `theme`: Tema inicial, por defecto es vs-light
  - También soporta todos estos temas: https://github.com/brijeshb42/monaco-themes/blob/master/themes/themelist.json
  - Usa el valor del tema como nombre, ej. "Vibrant Ink"
- `contextmenu`: booleano, "true" o "false"
- `folding`: booleano, "true" o "false"
- `readonly`: booleano, "true" o "false"
- `lineNumbers`: booleano, "on" o "off"
- `minimap`: booleano, "true" o "false"
- `background`: color de fondo personalizado, también puede ser transparente
- `javascriptDefaults`: establece propiedades del lenguaje javascript, requerido para usar:
  - `javascriptDefaultsNoSemanticValidation`
  - `javascriptDefaultsNoSyntaxValidation`
- `typescriptDefaults`: establece propiedades del lenguaje typescript, requerido para usar:
  - `typescriptDefaultsNoSemanticValidation`
  - `typescriptDefaultsNoSyntaxValidation`
- `dontPostValueOnChange`: En el manejador `change`, no envía el valor de vuelta al frame padre cada vez que se cambia el modelo
- `context`: una cadena que se envía de vuelta en cada mensaje enviado desde el iframe

## API de Mensajería

### Mensajes enviados por el iframe al padre

Recibe mensajes mediante

```javascript
iframe.addEventListener("message", (e) => {
  console.log(
    `el tipo de mensaje es ${e.data.type}, el payload está en`,
    e.data
  );
});
```

Mensajes enviados por el iframe:

- `{ type: "ready" }`: Enviado cuando el editor está listo
- `{ type: "change", value: string }`: Enviado cada vez que cambia el valor del editor
- `{ type: "content", value: string }`: Enviado cuando se solicita el contenido del editor mediante el mensaje `get-content`

### Mensajes que pueden ser enviados al iframe desde el padre

Envía mensajes al iframe mediante

```javascript
iframe.contentWindow.postMessage({ type: "type", ...parameters }, "*");
```

Mensajes que pueden ser enviados al iframe:

- `{ type: "change-options", options: IEditorOptions }`: Cambiar opciones del editor
- `{ type: "change-value", value: string }`: Cambiar valor del editor
- `{ type: "change-language", language: string }`: Cambiar idioma del editor
- `{ type: "change-theme", theme: string }`: Cambiar tema del editor
- `{ type: "change-background", background: string, theme?: string }`: Cambiar color de fondo del editor. También puede ser transparente
- `{ type: "change-javascript-defaults", javascriptDefaults: IJavaScriptDefaults }`: Cambiar valores predeterminados del lenguaje javascript
- `{ type: "change-typescript-defaults", typescriptDefaults: ITypeScriptDefaults }`: Cambiar valores predeterminados del lenguaje typescript
- `{ type: "get-content }`: El IFrame enviará un mensaje `content` con el valor actual del editor

## Créditos

Este proyecto está basado en [embeddable-monaco](https://github.com/lukasbach/embeddable-monaco) de Lukas Bach, que proporciona una implementación base del Editor Monaco embebible. Lummaca Editor es una adaptación personalizada que mantiene la simplicidad y flexibilidad del proyecto original mientras agrega características específicas para nuestras necesidades.
