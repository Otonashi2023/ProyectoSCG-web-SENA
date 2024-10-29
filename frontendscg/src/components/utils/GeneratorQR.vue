<template>
    <div @click ="cerrarQR()">
        <div class="modal-fondo">
          <div v-if="cargando" class="loader">
            <img src="@/assets/loading.gif" alt="Cargando..." />
          </div>
          <div class="modal-contenido" id="tabla-para-descargar" v-show="download">
            <div style="display: grid;grid-template-columns: 1fr auto;">
              <h3>Imagen QR del aprendiz</h3>
              <font-awesome-icon icon="file-export" id="editar" style="padding-top:16px;"
                @click="descargarTablaComoImagen"/>
            </div>
              <div v-if="qrImageUrl" class="perfil-contenedor">
                  <img :src="qrImageUrl" alt="Código QR" style="height: 400px;"/>
              </div>
          </div>
        </div>
    </div>
  </template>
  
  <script>
  import html2canvas from "html2canvas";
import { mapActions, mapState } from "vuex";
  
  export default {
    data(){
      return{
        cargando: true,
        download: false,
      }
    },
    computed: {
      ...mapState('aprendiz', ['qrImageUrl','aprendiz'])
    },
    methods: {
      ...mapActions('aprendiz', ['generarQRCode', 'limpiarQRCode']),
      
     async generarQR() {
        const idAprendiz = this.aprendiz?.codigo;
        await this.generarQRCode(idAprendiz);
        await this.$nextTick();
        this.download = true;
        if(this.download == true){
          this.cargando = false;
        }
        
      },
      cerrarQR(){
        const qr = false;
        this.$emit('verQR', qr);
      },
      descargarTablaComoImagen() {
        this.$nextTick(() => {
          const tabla = document.getElementById('tabla-para-descargar');
          if (tabla) {
            // Guardar el estilo original de la tabla con scroll
            const originalOverflow = tabla.style.overflow;
            
            // Ajustar el estilo para eliminar el scroll temporalmente
            tabla.style.overflow = 'visible';
            tabla.style.maxHeight = 'none'; // Eliminar cualquier límite de altura
            
            // Usar html2canvas para capturar la tabla completa
            html2canvas(tabla, { scrollX: 0, scrollY: 0 }).then((canvas) => {
              // Restaurar el estilo original de la tabla después de la captura
              tabla.style.overflow = originalOverflow;
              tabla.style.maxHeight = '400px';  // Ajusta según el tamaño de tu tabla original
              
              // Crear un enlace para descargar la imagen
              const enlace = document.createElement('a');
              enlace.href = canvas.toDataURL('image/png');
              enlace.download = 'tabla.png';
              enlace.click();
            }).catch((error) => {
              console.error('Error capturando la tabla:', error);
            });
          } else {
            console.error('No se encontró el elemento con id "tabla-para-descargar".');
          }
        });
      },
    },
    mounted(){
        this.generarQR();
    }
  };
  </script>
  <style scoped>
  
  .modal-fondo {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(10px);
  }
  
  .modal-contenido {
    background-color: white;
    border-radius: 8px;
    text-align: center;
    overflow-y:auto;
    overflow-x: auto;
    width: auto;
    height: auto;
    white-space: nowrap;
    filter: none;
    transform: none;
  }
  #tabla-para-descargar {
  margin-bottom: 20px;
}
  
  /*.cerrar {
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 24px;
    cursor: pointer;
  }
  
  .perfil-contenedor {
    display: flex;
    align-items: center;
    gap: 15px;
  }*/
  </style>