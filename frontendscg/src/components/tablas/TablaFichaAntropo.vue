<template>
    <!--Tabla que lista todos los registros de la entidad-->
    <div class="container2">
      <h1>Fichas Antropometricas</h1>
      <div id="scroll">
      <table>
        <thead>
          <tr>
            <th>Numero de control</th>
            <th>Fecha de toma</th>
            <th>Altura</th>
            <th>Peso</th>
            <th>IMC</th>
            <th>Estado</th>
            <th>Ver</th>
            <th id="rigth">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr id="fila2" v-for="(item,index) in fichasFiltradas" :key="index" @click="consultarbyId(item.codigo)">
            <td>{{ item.numControl }}</td>
            <td>{{ item.fecha }}</td>
            <td>{{ item.altura }} m</td>
            <td>{{ item.peso }} kg</td>
            <td>{{ item.imc }}</td>
            <td :style="evaluacion(item.imc).style">{{ evaluacion(item.imc).estado }}</td>
            <td style="color: blueviolet; font-weight: 700" @click.stop="abrirModal(item.codigo)">ver Ficha</td>
            <td id="alibutton">
            <tr style="display: grid;grid-template-columns: auto auto;">
                <div>
                  <font-awesome-icon icon="edit" id="editar" @click="actualizar(item.codigo)"/>
                </div>
                <div>
                  <font-awesome-icon icon="trash" id="eliminar" @click.stop="eliminar(item.codigo)"/>
                </div>
              </tr>  
            </td>          
          </tr>      
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
  export default {
    data(){
      return{
        modal:false,
        listaFiltrada: [],
      }
    },
    computed:{
      ...mapState('aprendiz',['aprendiz']),
      ...mapState('fichaAntropometrica',['fichaAntropoAll','fichaAntropo']),
      ...mapState('perimetros',['perimetrosAll','perimetros']),
      ...mapState(['retorno','retorno3','searchQuery']),

      fichasFiltradas() {
        const query = this.searchQuery;
        return this.listaFiltrada.filter(item =>
          item.fecha.includes(query)
        )
        .reverse();
      }
    },
    methods: {
      ...mapMutations(['clearSearchQuery']),
      ...mapActions('aprendiz',['consultarAprendiz']),
      ...mapActions('fichaAntropometrica',['consultarFichaAntropoAll','eliminarFichaAntropo','consultarFichaAntropo']),
      ...mapActions('perimetros',['consultarPerimetrosAll','consultarPerimetros']),
      ...mapMutations('fichaAntropometrica',['setFichaAntropoAll']),

      async eliminar(value){
        try{
          await this.eliminarFichaAntropo(value);
          await this.$nextTick();
          console.log('numero de ficha eliminada: ', value)
          this.filtrarAprendiz();
        } catch(error){
          console.error(error);
        } 
      },
      async filtrarAprendiz(){
        await this.consultarFichaAntropoAll();
        await this.$nextTick();
        this.listaFiltrada = this.fichaAntropoAll
          .filter(item => item.aprendiz.codigo === this.aprendiz.codigo);
        this.setFichaAntropoAll(this.listaFiltrada);
      },
      consultarbyId(value){
        this.$emit('ById', value, this.listaFiltrada);
      },
      actualizar(value){  
        this.$emit('change', value);
      },

      formulario(){
        if(this.retorno3 == 'retorno'){
          this.$emit('goForm');
        }
        else if( this.retorno == 'retorno'){
          this.$emit('irAform');
        }
      },
      evaluacion(value){
        const estadoStyle = {
          estado: '',
          style: {},
        };
        const indice = value;

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
      async abrirModal(value){
        await this.consultarPerimetrosAll();
        await this.$nextTick();
        const perimetrosFiltrado = this.perimetrosAll.find(item => item?.fichaantropo?.codigo === value);
        await this.consultarPerimetros(perimetrosFiltrado.codigo);
        await this.consultarFichaAntropo(value);
        await this.$nextTick();
        const modal =true;
        this.$emit('verModal', modal);
      },
    },
    mounted(){
      this.clearSearchQuery();
      this.formulario();
      this.filtrarAprendiz();
    },
  }
</script>