<template>
    <div @click ="cerrarModal()"> 
      <div class="modal-fondo">
        <div class="modal-contenido">
          <h3>Datos Personales</h3>
          <div style="display: grid;grid-template-columns: auto auto">
            <div class="perfil-contenedor" style="padding-left: 10px;">
              <img :src="urlImagen()" alt="Foto de perfil" class="perfil-foto" />
            </div>
            <div>
              <div id="alineacion"><div id="alignR"><strong>Nombres: </strong></div><div id="alignL">{{ personal.persona.nombres }}</div></div>
              <div id="alineacion"><div id="alignR"><strong>Apellidos: </strong></div><div id="alignL">{{ personal.persona.apellidos }}</div></div>
              <div id="alineacion"><div id="alignR"><strong>Tipo de documento: </strong></div><div id="alignL">{{ personal.persona.tipoDocumento.nombre }}</div></div>
              <div id="alineacion"><div id="alignR"><strong>Numero de identificación: </strong></div><div id="alignL">{{ personal.persona.cedula }}</div></div>
              <div id="alineacion"><div id="alignR"><strong>Celular: </strong></div><div id="alignL">{{ personal.persona.celular }}</div></div>
              <div id="alineacion"><div id="alignR"><strong>Contacto: </strong></div><div id="alignL">{{ personal.persona.contacto }}</div></div>
              <div id="alineacion"><div id="alignR"><strong>Celular de contacto: </strong></div><div id="alignL">{{ personal.persona.contacto }}</div></div>
              <div id="alineacion"><div id="alignR"><strong>Email: </strong></div><div id="alignL">{{ personal.persona.correo }}</div></div>
              <div id="alineacion"><div id="alignR"><strong>Cargo: </strong></div><div id="alignL">{{ personal.cargo.nombre }}</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  
  export default {
    data() {
      return {
          modal: false,
          fotoPerfil: require('@/assets/foto150.png'),
        }
    },
    computed:{
      ...mapState('personal',['personal']),
    },
    methods: {  
      urlImagen(){
        const baseUrl = 'http://localhost:8080';
        const imagePreview = this.personal.persona.foto
          ? `${baseUrl}${this.personal.persona.foto}`
          : require('@/assets/foto150.png');
          return imagePreview;
      },

      cerrarModal(){
        const modal = false;
        this.$emit('verModal', modal);
      },
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
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(10px);
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
    height: auto;
    white-space: nowrap;
    backdrop-filter: blur(10px);
    filter: none;
    transform: none;
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
  
  .perfil-foto {
    border-radius: 50%;
    width: 150px;
    height: 150px;
  }
  #alineacion{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: .1rem;
    padding-bottom: 12px;
  }
  #alignR{
    text-align: right;
  }
  #alignL{
    text-align: left;
    margin-left: 8px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal; 
    width: 200px;
  }
  </style>