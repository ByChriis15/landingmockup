# PULSE // Interactive MacBook Mockup Landing Page

Una landing page premium diseñada para presentar una plataforma de orquestación en la nube mediante un **mockup interactivo y funcional de una MacBook Pro**, construido enteramente en HTML/CSS y React.

![PULSE Landing Page](https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80)

---

## ✨ Características Principales

- 💻 **Mockup de MacBook en HTML/CSS Puro**: Chasis metálico unibody con degradados, bisel negro, cámara web con LED de actividad funcional, reflejo de cristal (`glare`) y sombra de profundidad realista.
- ⚡ **Aplicación Web Funcional en Pantalla**: La pantalla de la MacBook no es una imagen estática; contiene una consola interactiva con barra macOS, omnibox, atajos de teclado (`⌘K`) y paleta de comandos.
- 🔄 **Flujo Guiado de 5 Pasos**:
  - `01 / Dashboard`: Métricas de latencia P99, rendimiento QPS, nodos activos y servicios en ejecución.
  - `02 / Selección`: Elección de topologías (*Malla Multi-Región*, *Streaming en Tiempo Real*, *Cluster Aislado Zero-Trust*).
  - `03 / Configuración`: Slider dinámico de auto-escalado elástico (2 a 32 pods) con cálculo reactivo de costos, selector de región y conmutación por error.
  - `04 / Confirmación`: Comprobaciones de pre-vuelo automatizadas, matriz de resumen y visualizador interactivo de manifiesto YAML (`infra.yaml`).
  - `05 / Resultado`: Estado en vivo, terminal con streaming de logs por WebSocket, generador de tráfico sintético (+14k req/s) y botón para copiar endpoints.
- 🎯 **Controles Externos & Tour Automático**: Barra superior con navegación por pasos sincronizada bidireccionalmente y reproductor de tour guiado automático.
- 📱 **Diseño 100% Responsivo**: Escalado cinematográfico en pantallas grandes y adaptación de altura en móviles para interacción táctil cómoda.

---

## 🛠️ Stack Tecnológico

- **React 19** + **TypeScript**
- **Vite 8**
- **Tailwind CSS v4**
- **Lucide Icons**

---

## 🚀 Instalación y Uso Local

```bash
# Clonar el repositorio
git clone https://github.com/ByChriis15/landingmockup.git

# Entrar al directorio
cd landingmockup

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre en tu navegador: [http://localhost:5173/](http://localhost:5173/)

---

## 📦 Construcción para Producción

```bash
npm run build
npm run preview
```
