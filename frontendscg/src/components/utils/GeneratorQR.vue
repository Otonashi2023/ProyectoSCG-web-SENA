<template>
    <div @click ="cerrarQR()">
        <div class="modal-fondo">
          <div v-if="cargando" class="loader">
            <img src="@/assets/loading.gif" alt="Cargando..." />
          </div>
          <div class="modal-contenido">
              <h3>Imagen QR del aprendiz</h3>
              <div v-if="qrImageUrl" class="perfil-contenedor">
                  <img :src="qrImageUrl" alt="Código QR" />
              </div>
          </div>
        </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapState } from "vuex";
  
  export default {
    data(){
      return{
        cargando: true,
      }
    },
    computed: {
      ...mapState('aprendiz', ['qrImageUrl','aprendiz'])
    },
    methods: {
      ...mapActions('aprendiz', ['generarQRCode', 'limpiarQRCode']),
      
      generarQR() {
        const idAprendiz = this.aprendiz?.codigo;
        this.generarQRCode(idAprendiz);
        this.cargando = false;
      },
      cerrarQR(){
        const qr = false;
        this.$emit('verQR', qr);
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
  }
  
  .modal-contenido {
    background-color: white;
    border-radius: 8px;
    width: 450px;
    text-align: center;
    overflow-y:auto;
    overflow-x: auto;
    width: auto;
    height: 57%;
    white-space: nowrap;
  }
  
  /*.cerrar {
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 24px;
    cursor: pointer;
  }*/
  
  .perfil-contenedor {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  </style>