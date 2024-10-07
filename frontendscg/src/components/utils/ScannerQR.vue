<template>
    <div class="modal-fondo">
        <div class="modal-contenido">
          <div style="display: grid; grid-template-columns: 1fr auto 1fr;">
            <div>
              <font-awesome-icon icon="eye-slash" style="display:grid;justify-content:right;" @click="cerrarScan"/>
            </div>
            <div>
              <h3 style="margin: 0">Escanear Código QR</h3>
            </div>
            <div></div>
          </div>
            <video id="video" style="width: 500px; height: 350px"></video>
            <div v-if="activar" class="json-display">
              <table>
                <tr v-for="(value, key) in parsedData" :key="key" @click="ocultar">
                  <td class="key">{{ key }}:</td>
                  <td class="value">{{ value }}</td>
                </tr>
              </table>
            </div><br>
            <button @click="ocultar" v-show="boton"> ver informacion </button>
            <br>
            <button style="margin: 10px" @click="toggleScanner">
            {{ isScanning ? 'Detener Escáner' : 'Iniciar Escáner' }}
          </button>
        </div>
    </div>
  </template>
  
  <script>
  import { BrowserQRCodeReader } from '@zxing/browser';
import { mapActions, mapState } from 'vuex';
  
  export default {
    data() {
      return {
        qrCodeMessage: '',
        codeReader: null,
        isScanning: false,
        videoInputDeviceId: null,
        decodingActive: true,
        scanningAllowed: true,
        activar: false,
        boton: true,
      };
    },
    computed:{
        ...mapState('asistencia',['asistencia']),
    },
    mounted() {
      this.codeReader = new BrowserQRCodeReader();
      //this.initializeZXingScanner();
    },
    methods: {
        ...mapActions('asistencia',['guardarAsistencia','limpiarAsistencia']),

      async initializeZXingScanner() {
        //const codeReader = new BrowserQRCodeReader();
        if(!this.isScanning){
          try{
            const videoInputDevices = await navigator.mediaDevices.enumerateDevices();
            this.videoInputDeviceId = videoInputDevices[0]?.deviceId;
            this.codeReader.decodeFromVideoDevice(this.videoInputDeviceId, 'video', (result, error) => {
            if (result && this.scanningAllowed) {
              this.qrCodeMessage = result.text;

              this.scanningAllowed = false;
              try {
                          this.parsedData = JSON.parse(this.qrCodeMessage);
                          console.log('Datos del aprendiz:', this.parsedData);
                      } catch (e) {
                          console.error('El QR no contiene un JSON válido', e);
                      }
                  console.log(this.parsedData.codigo);
              const audio = new Audio(require('@/assets/sound/confirmacion.mp3')); // Asegúrate de tener el archivo en la carpeta assets
              audio.play();
              this.registrarAsistencia(this.parsedData.codigo);
              setTimeout(() => {
                this.scanningAllowed = true;
              }, 2000); 
                //codeReader.reset();  // Detener el escáner después de detectar un código
              }
              if (error) {
                if (error.name !== 'NotFoundException') {
                  console.warn('Error al escanear:', error);
                }
              }
            });
            this.isScanning = true;
          }
          catch(error){
            console.error('Error al iniciar el escáner:', error);
          }
        }
      },

      stopScanner() {
      if (this.isScanning) {
        this.decodingActive = false; 

        const videoElement = document.getElementById('video');
        const stream = videoElement.srcObject;
        const tracks = stream?.getTracks();

        // Detener todas las pistas del stream de video (detiene la cámara)
        if (tracks) {
          tracks.forEach(track => track.stop());
        }
        this.isScanning = false;
      }
    },
      toggleScanner() {
        if (this.isScanning) {
          this.stopScanner();
        } else {
          this.initializeZXingScanner();
        }
      },

      async registrarAsistencia(value){
        const idAprendiz = +value;
        console.log('codigo: ', typeof idAprendiz);
        if(isNaN(idAprendiz)){
          console.log('codigo: ', typeof idAprendiz);
          return;
        }
          const data ={
            aprendiz:idAprendiz,
        };
        console.log('codigo: ', data);
        this.limpiarAsistencia();
        await this.guardarAsistencia(data);
        await this.$nextTick();
        console.log('ASISTENCIA: ',this.asistencia);
      },
      cerrarScan(){
        const scan= false;
        this.$emit('cerrarScan',scan);
      },
      ocultar(){
        if(this.qrCodeMessage == ''){
          alert('todavia no se ha escaneado una imagen QR');
        } else {
          if(this.boton == true){
            this.boton =false;
            this.activar = true;
          } else{
            this.boton = true;
            this.activar = false;
          }
        }
      }
    },
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
    z-index: 9999;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(10px);
  }
  
  .modal-contenido {
    margin: 0;
    padding: 0;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 450px;
    text-align: center;
    overflow-y:auto;
    overflow-x: auto;
    width: auto;
    height: auto;
    white-space: nowrap;
    backdrop-filter: blur(10px);
    filter: none;
    transform: none;
  }
  .json-display {
  margin-top: 20px;
}

.json-display table {
  width: 100%;
  size: 14px;
}

.json-display .key {
  text-align: right;
  font-weight: bold;
  padding-right: 10px;
}

.json-display .value {
  text-align: left;
}
</style>