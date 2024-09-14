<template>
  <div @click ="cerrarModal()">
    <div class="modal-fondo">
      <div class="modal-contenido">
        <h3>Ficha Antrpompétrica</h3>
        <div style="display: grid;grid-template-columns: auto auto">
          <div class="perfil-contenedor" style="padding-left: 10px;">
            <img :src="fotoPerfil" alt="Foto de perfil" class="perfil-foto" />
          </div>
          <div>
            <div id="alineacion"><div id="alignR"><strong># Control: </strong></div><div id="alignL">{{ fichaAntropo.numControl }}</div></div>
            <div id="alineacion"><div id="alignR"><strong>Fecha: </strong></div><div id="alignL">{{ fichaAntropo.fecha }}</div></div>
            <div id="alineacion"><div id="alignR"><strong>Genero: </strong></div><div id="alignL">{{ fichaAntropo?.genero?.nombre }}</div></div>
            <div id="alineacion"><div id="alignR"><strong>Altura: </strong></div><div id="alignL">{{ fichaAntropo.altura }}</div></div>
            <div id="alineacion"><div id="alignR"><strong>Peso: </strong></div><div id="alignL">{{ fichaAntropo.peso }}</div></div>
            <div id="alineacion"><div id="alignR"><strong>IMC: </strong></div><div id="alignL">{{ fichaAntropo.imc }}</div></div>
            <div id="alineacion"><div id="alignR"><strong>Estado: </strong></div><div id="alignL" :style="evaluacion(fichaAntropo.imc).style">{{ evaluacion(fichaAntropo.imc).estado }}</div></div>
            <div id="alineacion"><div id="alignR"><strong>Evaluador: </strong></div><div id="alignL">{{ nombre }} {{ apellido }}</div></div>
            <hr class="separator">
          </div>
        </div>
        <h3>Perimetros Antropométricos</h3>
        <div style="display: grid; grid-template-columns: auto auto auto; grid-column-gap: 0.5rem;">
            <div id="alineacion"><div id="alignR"><strong>Cabeza: </strong></div><div id="alignL">{{ perimetros.cabeza }}</div></div>
            <div id="alineacion"><div id="alignR"><strong>Cuello: </strong></div><div id="alignL">{{ perimetros.cuello }}</div></div>
            <div id="alineacion"><div id="alignR"><strong>Brazo Relax: </strong></div><div id="alignL">{{ perimetros.brazoRelax }}</div></div>
            <div id="alineacion"><div id="alignR"><strong>Brazo Tenso: </strong></div><div id="alignL">{{ perimetros.brazoTenso }}</div></div>
            <div id="alineacion"><div id="alignR"><strong>Antebrazo: </strong></div><div id="alignL">{{ perimetros.antebrazo }}</div></div>
            <div id="alineacion"><div id="alignR"><strong>Muñeca: </strong></div><div id="alignL">{{ perimetros.muñeca }}</div></div>
            <div id="alineacion"><div id="alignR"><strong>Torax: </strong></div><div id="alignL">{{ perimetros.torax }}</div></div>
            <div id="alineacion"><div id="alignR"><strong>Cintura: </strong></div><div id="alignL">{{ perimetros.cintura }}</div></div>
            <div id="alineacion"><div id="alignR"><strong>Cadera: </strong></div><div id="alignL">{{ perimetros.cadera }}</div></div>
            <div id="alineacion"><div id="alignR"><strong>Muslo Max: </strong></div><div id="alignL">{{ perimetros.musloMax }}</div></div>
            <div id="alineacion"><div id="alignR"><strong>Muslo Min: </strong></div><div id="alignL">{{ perimetros.musloMin }}</div></div>
            <div id="alineacion"><div id="alignR"><strong>Pantorrilla Max: </strong></div><div id="alignL">{{ perimetros.pantorrillaMax }}</div></div>
            <div id="alineacion"><div id="alignR"><strong>Pantorrilla Min: </strong></div><div id="alignL">{{ perimetros.pantorrillaMin }}</div></div>           
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
        modal: false,
        nombre: '',
        apellido: '',
        fotoPerfil: require('@/assets/foto150.png'),
      }
  },
  computed:{
    ...mapState('perimetros',['perimetros']),
    ...mapState('fichaAntropometrica',['fichaAntropo','estado'])
  },
  methods: {
    ...mapActions('fichaAntropometrica',['consultarFichaAntropo','limpiarFichaAntropo']),
    ...mapActions('perimetros',['consultarPerimetros']),

    cerrarModal(){
      const modal = false;
      this.$emit('verModal', modal);
      this.limpiarFichaAntropo();
    },
    nombreEvaluador(){
      this.nombre = this.fichaAntropo?.personal?.persona?.nombres.split(' ')[0];
      this.apellido = this.fichaAntropo?.personal?.persona.apellidos.split(' ')[0];
    },
    evaluacion(){
      const estadoStyle = {
        estado: '',
        style: {},
      };
      const indice = this.fichaAntropo.imc;

      if(indice < 18.50  ){
        estadoStyle.estado = 'Bajo Peso';
        estadoStyle.style = {
          color: 'blue',
          fontWeight: '700'
        }
      }
      else if(indice >= 18.50 && indice < 25 ){
        estadoStyle.estado ='Peso Normal';
        estadoStyle.style = {
          color: 'green',
          fontWeight: '700'
        } 
      }
      else if(indice >= 25 && indice < 30 ){
        estadoStyle.estado = 'Sobrepeso';
        estadoStyle.style = {
          color: 'orange',
          fontWeight: '700'
        } 
      }
      else if(indice >= 30 && indice < 40 ){
        estadoStyle.estado = 'Obesidad';
        estadoStyle.style = {
          color: 'red',
          fontWeight: '700'
        }
      }
      else{
        estadoStyle.estado = 'Obesidad grave';
        estadoStyle.style = {
          color: 'darkred',
          fontWeight: '700'
        }
      }
      return estadoStyle;
    },
},
  mounted(){
    this.nombreEvaluador();
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
  padding: 20px;
  border-radius: 8px;
  width: 450px;
  text-align: center;
  overflow-y:auto;
  overflow-x: auto;
  width: auto;
  height:76%;
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

.perfil-foto {
  border-radius: 50%;
  width: 100px;
  height: 100px;
}
.separator {
  border: none;
  border-top: 1px solid #dddddd;
  margin: 10px 0;
}#alineacion{
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
  }
</style>