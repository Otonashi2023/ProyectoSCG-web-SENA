<template>
  <div @click ="cerrarModal()">
    <div class="modal-fondo">
      <div class="modal-contenido" id="tabla-para-descargar">
        <div style="display: grid;grid-template-columns: 1fr auto;">
          <h3>Ficha Antrpompétrica</h3>
          <font-awesome-icon icon="file-export" id="editar" style="padding-top:8px;" v-show="download" @click="descargarTablaComoImagen"/>
        </div>
        <div style="display: grid;grid-template-columns: auto auto">
          <div class="perfil-contenedor" style="padding-left: 10px;">
            <img :src="urlImagen()" alt="Foto de perfil" class="perfil-foto" />
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
            <div id="alineacion"><div id="alignR"><strong>Cabeza: </strong></div><div id="alignL">{{ perimetros.cabeza }} </div>
            <div v-if="cabeza2 !== null" :class="{'positivo': cabeza2 > 0, 'negativo': cabeza2 < 0}"> {{ cabeza2 }}</div></div>
            <div id="alineacion"><div id="alignR"><strong>Cuello: </strong></div><div id="alignL">{{ perimetros.cuello }} </div>
            <div v-if="cuello2 !== null" :class="{'positivo': cuello2 > 0, 'negativo': cuello2 < 0}"> {{ cuello2 }}</div></div>
            <div id="alineacion"><div id="alignR"><strong>Brazo Relax: </strong></div><div id="alignL">{{ perimetros.brazoRelax }} </div>
            <div v-if="brazoRelax2 !== null" :class="{'positivo': brazoRelax2 > 0, 'negativo': brazoRelax2 < 0}"> {{  brazoRelax2 }}</div></div>
            <div id="alineacion"><div id="alignR"><strong>Brazo Tenso: </strong></div><div id="alignL">{{ perimetros.brazoTenso }} </div>
            <div v-if="brazoTenso2 !== null" :class="{'positivo': brazoTenso2 > 0, 'negativo': brazoTenso2 < 0}"> {{ brazoTenso2 }}</div></div>
            <div id="alineacion"><div id="alignR"><strong>Antebrazo: </strong></div><div id="alignL">{{ perimetros.antebrazo }} </div>
            <div v-if="antebrazo2 !== null" :class="{'positivo': antebrazo2 > 0, 'negativo': antebrazo2 < 0}"> {{ antebrazo2 }}</div></div>
            <div id="alineacion"><div id="alignR"><strong>Muñeca: </strong></div><div id="alignL">{{ perimetros.muñeca }} </div>
            <div v-if="muñeca2 !== null" :class="{'positivo': muñeca2 > 0, 'negativo': muñeca2 < 0}"> {{ muñeca2 }}</div></div>
            <div id="alineacion"><div id="alignR"><strong>Torax: </strong></div><div id="alignL">{{ perimetros.torax }} </div>
            <div v-if="torax2 !== null" :class="{'positivo': torax2 > 0, 'negativo': torax2 < 0}"> {{ torax2 }}</div></div>
            <div id="alineacion"><div id="alignR"><strong>Cintura: </strong></div><div id="alignL">{{ perimetros.cintura }} </div>
            <div v-if="cintura2 !== null" :class="{'positivo': cintura2 > 0, 'negativo': cintura2 < 0}"> {{ cintura2 }}</div></div>
            <div id="alineacion"><div id="alignR"><strong>Cadera: </strong></div><div id="alignL">{{ perimetros.cadera }} </div>
            <div v-if="cadera2 !== null" :class="{'positivo': cadera2 > 0, 'negativo': cadera2 < 0}"> {{ cadera2 }}</div></div>
            <div id="alineacion"><div id="alignR"><strong>Muslo Max: </strong></div><div id="alignL">{{ perimetros.musloMax }} </div>
            <div v-if="muslosMax2 !== null" :class="{'positivo': muslosMax2 > 0, 'negativo': muslosMax2 < 0}"> {{ muslosMax2 }}</div></div>
            <div id="alineacion"><div id="alignR"><strong>Muslo Min: </strong></div><div id="alignL">{{ perimetros.musloMin }} </div>
            <div v-if="musloMin2 !== null" :class="{'positivo': musloMin2 > 0, 'negativo': musloMin2 < 0}"> {{ musloMin2 }}</div></div>
            <div id="alineacion"><div id="alignR"><strong>Pantorrilla Max: </strong></div><div id="alignL">{{ perimetros.pantorrillaMax }} </div>
            <div v-if="pantorrillaMax2 !== null" :class="{'positivo': pantorrillaMax2 > 0, 'negativo': pantorrillaMax2 < 0}"> {{ pantorrillaMax2 }}</div></div>
            <div id="alineacion"><div id="alignR"><strong>Pantorrilla Min: </strong></div><div id="alignL">{{ perimetros.pantorrillaMin }} </div>
            <div v-if="pantorrillaMin2 !== null" :class="{'positivo': pantorrillaMin2 > 0, 'negativo': pantorrillaMin2 < 0}"> {{ pantorrillaMin2 }}</div></div>           
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas';
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
        modal: false,
        nombre: '',
        apellido: '',
        imagePreview: require('@/assets/foto150.png'),
        download: true,
        arrayFP: [],
        cabeza2: null,
        cuello2: null,
        brazoRelax2: null,
        brazoTenso2: null,
        antebrazo2: null,
        muñeca2: null,
        torax2: null,
        cintura2: null,
        cadera2: null,
        muslosMax2: null,
        musloMin2: null,
        pantorrillaMax2: null,
        pantorrillaMin2: null,
      }
  },
  computed:{
    ...mapState('perimetros',['perimetros','perimetrosAll']),
    ...mapState('fichaAntropometrica',['fichaAntropo','estado','fichaAntropoAll'])
  },
  methods: {
    ...mapActions('fichaAntropometrica',['consultarFichaAntropo','limpiarFichaAntropo']),
    ...mapActions('perimetros',['consultarPerimetros','consultarPerimetrosAll']),

    urlImagen(){
      const baseUrl = 'http://localhost:8080';
      const imagePreview = this.perimetros.fichaantropo.aprendiz.persona.foto
        ? `${baseUrl}${this.perimetros.fichaantropo.aprendiz.persona.foto}`
        : require('@/assets/foto150.png');
      return imagePreview;
    },
    
    async comparador() {
      this.arrayFP.push(this.perimetros);
      const control = this.fichaAntropo.numControl;
      if (control >= 2) {
        const control2 = this.fichaAntropoAll.find(item => item.numControl === control - 1);
        if (control2) {
          await this.consultarPerimetrosAll();
          const p2 = this.perimetrosAll.find(item => item.fichaantropo.codigo === control2.codigo);
          this.arrayFP.push(p2);
          console.log('hola:::',this.arrayFP);
          this.evaluando();
        } else {
          console.log('No se encontró el objeto anterior');
        }
      }
    },

    evaluando() {
      this.cabeza2 = this.calcularResultado(this.arrayFP[0].cabeza, this.arrayFP[1].cabeza);
      this.cuello2 = this.calcularResultado(this.arrayFP[0].cuello, this.arrayFP[1].cuello);
      this.brazoRelax2 = this.calcularResultado(this.arrayFP[0].brazoRelax, this.arrayFP[1].brazoRelax);
      this.brazoTenso2 = this.calcularResultado(this.arrayFP[0].brazoTenso, this.arrayFP[1].brazoTenso);
      this.antebrazo2 = this.calcularResultado(this.arrayFP[0].antebrazo, this.arrayFP[1].antebrazo);
      this.muñeca2 = this.calcularResultado(this.arrayFP[0].muñeca, this.arrayFP[1].muñeca);
      this.torax2 = this.calcularResultado(this.arrayFP[0].torax, this.arrayFP[1].torax);
      this.cintura2 = this.calcularResultado(this.arrayFP[0].cintura, this.arrayFP[1].cintura);
      this.cadera2 = this.calcularResultado(this.arrayFP[0].cadera, this.arrayFP[1].cadera);
      this.muslosMax2 = this.calcularResultado(this.arrayFP[0].musloMax, this.arrayFP[1].musloMax);
      this.musloMin2 = this.calcularResultado(this.arrayFP[0].musloMin, this.arrayFP[1].musloMin);
      this.pantorrillaMax2 = this.calcularResultado(this.arrayFP[0].pantorrillaMax, this.arrayFP[1].pantorrillaMax);
      this.pantorrillaMin2 = this.calcularResultado(this.arrayFP[0].pantorrillaMin, this.arrayFP[1].pantorrillaMin);
    },

    calcularResultado(valor1, valor2) {
    const resultado = valor1 - valor2;
    if (resultado === 0) {
      return null;
    }
    return resultado.toFixed(2);
  },

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

    descargarTablaComoImagen() {
        this.download = false;
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
    this.nombreEvaluador();
    this.comparador();
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
  width: 150px;
  height: 150px;
}
.separator {
  border: none;
  border-top: 1px solid #dddddd;
  margin: 10px 0;
}#alineacion{
    display: grid;
    grid-template-columns: 1fr auto 1fr;
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
  .positivo {
  color: green;
}
.negativo {
  color: red;
}
</style>