# 🚀 Pokédex Vue 3 + Vite 🚀

🌐 **Deploy:** [pokedexapp-vue.netlify.app](https://pokedexapp-vue.netlify.app/)

---

Esta aplicación la desarrollé usando **Vue 3** y **Vite** como base, junto con **Vue Router** para la navegación y **Vitest** para testing. A continuación te cuento las tecnologías que elegí y las decisiones que tomé pensando en escalabilidad y manejo de gran cantidad de datos:

---

## 🛠️ Tecnologías principales

* 🎨 **Vue 3**: Elegí este framework por su arquitectura basada en componentes reutilizables y su sistema reactivo. Utilizo `<script setup>` para mayor claridad y rendimiento.
* ⚡ **Vite**: Lo seleccioné por ser un bundler ultrarrápido, ideal para desarrollo moderno y builds eficientes.
* 🧭 **Vue Router**: Permite navegación SPA y separar vistas, lo que facilita escalar la app.
* 🧪 **Vitest** y **@vue/test-utils**: Uso estas herramientas para testear los componentes y asegurar calidad y mantenibilidad.

## 📦 Decisiones para manejar gran cantidad de datos

* 🔄 **Renderizado eficiente**: El listado de Pokémon usa `v-for` y `computed` para filtrar y renderizar solo los elementos visibles, minimizando el trabajo del DOM.
* 🧩 **Separación de vistas y componentes**: Dividí la app en vistas (`Welcome`, `List`) y componentes reutilizables (`PokemonCard`, `PokemonModal`, etc.), lo que facilita la extensión y el mantenimiento.
* ⭐ **Composables**: Implementé un composable (`useFavorites`) para manejar favoritos con persistencia en `localStorage`, desacoplando lógica y permitiendo reutilización.
* ⏳ **Carga asíncrona**: Los datos se obtienen de la [PokeAPI](https://pokeapi.co/) usando `fetch` asíncrono y manejo estados de carga y error para mejorar la experiencia de usuario.
* 📈 **Preparado para paginación**: Aunque la app actual carga solo 20 Pokémon, la arquitectura permite fácilmente implementar paginación o carga incremental para grandes volúmenes de datos.
* 🎬 **Optimización visual**: Uso loaders (`LoaderBall`) y transiciones para mejorar la percepción de rendimiento.

## 🤔 ¿Por qué estas tecnologías?

* 📦 **Escalabilidad**: Vue 3 y Vite me permiten escalar la app a miles de elementos sin perder rendimiento.
* 🛠️ **Mantenibilidad**: La separación en componentes y composables facilita agregar nuevas features y refactorizar.
* 💡 **Experiencia de usuario**: El manejo de estados, loaders y navegación SPA mejora la fluidez y respuesta de la app.
* 🧪 **Testing**: Vitest y test-utils aseguran que los componentes funcionen correctamente incluso al crecer la base de código.

---

## 📝 Comandos para inicializar la app y correr los tests

Para instalar las dependencias:
```bash
npm install
```

Para iniciar la aplicación en modo desarrollo:
```bash
npm run dev
```

Para ejecutar los tests:
```bash
npm run test
```

---

---

## 🏁 En resumen

La arquitectura y las tecnologías que elegí permiten que la aplicación sea sencilla pero robusta, preparada para manejar gran cantidad de datos y escalar en funcionalidad sin perder rendimiento ni calidad.

