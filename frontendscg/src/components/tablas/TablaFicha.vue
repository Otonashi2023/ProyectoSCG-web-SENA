<template>
    <!--Tabla que lista todos los registros de la entidad-->
    <div class="container2">
      <h1>Tabla  de fichas</h1>
      <div id="scroll">
        <table>
        <thead>
          <tr>
            <th>Ficha</th>
            <th>Formacion</th>
            <th id="rigth">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr id="fila2" v-for="ficha in fichasFiltradas" :key="ficha.codigo" @click="() => {callMetodoN(ficha.codigo); consultarbyId(ficha.codigo);}">
            <td>{{ ficha.numero }}</td>
            <td>{{ ficha.formacion.nombre }}</td>
            <td id="alibutton">
                <font-awesome-icon icon="edit" id="editar" @click="actualizar(ficha.codigo)"/>
                <font-awesome-icon icon="trash" id="eliminar" @click="eliminar(ficha.codigo)"/>
            </td>            
          </tr>      
        </tbody>
      </table>
      </div>
      <p>{{ nombres }}</p>    
    </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapMutations, mapState } from "vuex";
  //contructor de las variables 
  export default {
    data(){
      return{
        fichas:[],
        codigo:null,
      }
    },
    computed:{
      ...mapState('formacion',['formacion']),
      ...mapState('ficha',['ficha']),
      ...mapState(['retorno','retorno2','datoact2','searchQuery']),
    
      fichasFiltradas() {
        const query = this.searchQuery;
        return this.fichas.filter(item =>
          item.numero.toString().includes(query) ||
          item.formacion.nombre.toLowerCase().includes(query)
        )
        .reverse();
      },
    },
    methods: {
      ...mapMutations(['clearSearchQuery']),
      ...mapActions('formacion',['consultarFormacion']),
      ...mapActions('ficha',['consultarFicha','limpiarFicha']),

      obtenerFichas(){
        // Método para obtener los campos de la lista
        axios.get("http://localhost:8080/api/ficha/listar")
        .then((response)=>{
          this.fichas= response.data;
          this.codigo=null;
        })
        .catch((error)=>{
          console.error("Error al obtener fichas: ", error);
        })
      },
      eliminar(value){
        this.codigo= value;
      axios
        .delete('http://localhost:8080/api/ficha/'+this.codigo)
        .then(()=>{
          console.log("ficha eliminado con exito");
          this.codigo=null;
          this.$emit('escuchartable');
          this.obtenerFichas();                   
        })
        .catch((error)=>{
          console.log("Error al eliminar ficha", error);
        });
      },
      async consultarbyId(value){
        if(this.codigo==null){
          await this.consultarFicha(value);
          this.$emit('ById',value);
        }
      },
      actualizar(value){
        this.codigo=value;
        this.$emit('change',this.codigo);
      },
      limpiarId(){
        this.codigo=null;
      },
      async callMetodoN(value){
        if(this.retorno=='retorno'){
          if(this.codigo==null){
            this.limpiarFicha();
            await this.consultarFicha(value);
            await this.consultarFormacion(this.ficha.formacion.codigo);
            await this.$nextTick();
            this.$router.push('aprendiz');
          }
        }
      },
      formulario(){
        if(this.retorno2=='retorno'){
          this.$emit('goForm');
        }
      },
    },
    mounted(){
      this.clearSearchQuery();
      this.obtenerFichas();
      this.formulario();
    },
  }
</script>