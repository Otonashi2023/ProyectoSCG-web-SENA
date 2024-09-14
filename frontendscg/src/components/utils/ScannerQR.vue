<template>
    <div class="modal-fondo">
        <div class="modal-contenido">
            <font-awesome-icon icon="eye-slash" style="display:grid;justify-content:right;" @click="cerrarScan"/>
            <h3>Escanear Código QR</h3>
            <video id="video" style="width: 500px; height: 350px"></video>
            <p v-if="qrCodeMessage=false">Código QR detectado: {{ qrCodeMessage }}</p><br>
            <button style="margin-top: 10px" @click="toggleScanner">
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
            if (result) {
              this.qrCodeMessage = result.text;
              console.log('QR detectado:', result.text);
              const audio = new Audio(require('@/assets/sound/confirmacion.mp3')); // Asegúrate de tener el archivo en la carpeta assets
              audio.play();
              setTimeout(() => {
                  try {
                          this.parsedData = JSON.parse(this.qrCodeMessage);
                          console.log('Datos del aprendiz:', this.parsedData);
                      } catch (e) {
                          console.error('El QR no contiene un JSON válido', e);
                      }
                  console.log(this.parsedData.codigo);
                  this.registrarAsistencia(this.parsedData.codigo);
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
    },
  };
  </script>

  <style>
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
    padding: 20px;
    border-radius: 8px;
    width: 450px;
    text-align: center;
    overflow-y:auto;
    overflow-x: auto;
    width: auto;
    height: 76%;
    white-space: nowrap;
  }
</style>