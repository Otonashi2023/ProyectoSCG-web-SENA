<template>
  <div class="container" id="form">
    <h1>Formulario de Rutina de Entrenamiento</h1>
    <form @submit.prevent="servicio()">
      <div class="comp-form-group">
        <div class="form-group">
          <label for="rutina">Rutina: version
            <span :style="{ color: '#EA0234' }">{{ dato8 }}</span>
          </label>
          <input type="text" @click="callMetodoR"  name="rutina" id="input2" v-model="rutina" placeholder="haz click para ingresar la rutina" readonly>
        </div>
        <div class="form-group">
          <label for="ejercicio">Ejercicio: </label>
          <input type="text" @click="callMetodoE" name="ejercicio" id="input2" v-model="ejercicio" placeholder="haz click para ingresar el ejercicio" readonly>
        </div>
        <div class="form-group">
          <div id="formbutton">
            <button id="guardar" type="submit" name="guardar" v-if="salvar">Guardar</button>
            <button id="guardar" type="submit" name="actulizar" v-if="modificar">Actualizar</button>
            <font-awesome-icon :icon="['fas', 'right-left']" id="cerrar3" v-if="modificar" @click="cerrar"/>
          </div>
        </div>
      </div>
    </form>
    <div class="container2" style="height: 68vh;" v-if="tabla">
      <h1>Tabla  de ejercicios</h1>
      <div id="scroll2">
        <table>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Musculo</th>
            <th>Series</th>
            <th>Repeticiones</th>
            <th>Descanso</th>
            <th id="rigth">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr id="fila2" v-for="ejercicio in ejercicios" :key="ejercicio.codigo">
            <td>Pendiente</td>
            <td>{{ ejercicio.nombre.nombre }}</td>
            <td>{{ ejercicio.tipoEjercicio.nombre }}</td>
            <td>{{ ejercicio.musculo.nombre }}</td>
            <td>{{ ejercicio.series }}</td>
            <td>{{ ejercicio.repeticiones }}</td>
            <td>{{ ejercicio.descanso }} min</td>
            <td id="alibutton">
                <font-awesome-icon icon="trash" id="eliminar" @click="verificar(ejercicio.codigo)"/>
            </td>            
          </tr>      
        </tbody>
      </table>
      </div>      
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import axios from "axios";
export default {
  data() {
    return{
      salvar: true,
      modificar: false,
      tabla: false,
      exerciseCodes: []
    };
  },

  computed:{
    ...mapState('variables',['ejercicios','arrayE','valor','datos','activeM','groupFilter']),
    ...mapState(['dato6','dato7','dato8','rutina','ejercicio','datoact1','retorno3']),
  },
  //metodos CRUD
  methods:{
    ...mapActions('variables',['actionEjercicios','nuevoEjercicio','quitarEjercicio',
      'actionArrayE', 'nuevoValor','limpiarArrayE', 'limpiarValor','quitarArrayE','actionActiveM']),
    ...mapActions(['actualizarRetorno','actualizarDato6','registrarRutina','actualizarDato7','actualizarDato8',
    'actualizarDatoact1','limpiarDatoact1','limpiarDato7','limpiarEjercicio','actualizarDatoact0']),
    servicio(){
      if(this.salvar==true){
        if(this.dato6!=null && this.arrayE.length > 0){
          this.guardar();
        }
        else{
          if(this.retorno3 == 'retorno'){
            this.actualizarDatoact0('retorno');
            this.$router.push('planRutina');
          } else{
            alert('Hay campos vacios');
          } 
        }  
      }
      else {
        this.actualizar();       
      }
    },

    guardar(){
      for(const ejercicio of this.arrayE){
        this.actualizarDato7(ejercicio);
        console.log('Codigo del ejercicio = ',this.dato7);
        axios
        .post('http://localhost:8080/api/rutinaejercicio',{
          rutina: this.dato6,
          ejercicio: this.dato7,
        })
        .then((response)=>{
          console.log("Rutina de entrenamiento registrado con exito", response.data);
          if(this.retorno3 == 'retorno'){
            this.actualizarDatoact0('retorno');
            this.$router.push('planRutina');
          } else{
            this.$emit('leave'); 
          }
        })
        .catch((error)=>{
          console.error("Error al registrar rutina de entrenamiento:", error);
        });
      }
      alert("La rutina de entrenamiento es registrado con exito");
      this.limpiarArrayE();
    },

    consultar(value1, value2) {
      this.actualizarDato6(value1);
      console.log('value2:',value2);
      console.log('DATOS PARA FILTRAR',value2);
      // Filtramos las rutinas con el código especificado en la variable
      const filteredData = value2.filter(item => item.rutina.codigo === value1);
      if(filteredData.length > 0){
        console.log('verDetalles: ',filteredData);
        const primerElemento = filteredData[0];
        const tipoRutinaNombre = primerElemento.rutina.tipoRutina.nombre;
        const rutinaNumero = primerElemento.rutina.numero;
        this.registrarRutina(tipoRutinaNombre);
        this.actualizarDato8(rutinaNumero);
        console.log(tipoRutinaNombre);

        // Si hay datos filtrados, extraemos los códigos de los ejercicios
        if (filteredData.length > 0) {
          // Asumimos que solo hay una rutina con el código dado, si no es así deberías ajustar este código
          const ejercicios = filteredData[0].ejercicios;
          this.exerciseCodes = ejercicios.map(ejercicio => ejercicio.codigo);
          this.agregarEjercicio();
        } else {
          this.exerciseCodes = [];
          console.log("No se encontraron ejercicios.");
        }
      }
    },

    verificar(value){

      console.log('codigo-ejercicio: ', value);
      this.datos;
      const jsonString = JSON.stringify(this.datos,null,2);
      console.log('%c' + jsonString, 'color: orange; font-weight: bold;');
      const existe = this.datos
        .filter(item => item.rutina.codigo === this.dato6 && item.ejercicio.codigo === value).map(item2 => item2.codigo);
      if(existe.length > 0){
        this.eliminarFila(existe,value);
      }
      else{
        this.quitarArrayE(value);
        this.quitarEjercicio(value);
        this.agregarEjercicio();
        this.$emit('refresh');
      }
    },
    eliminarFila(value1,value2){
      this.codigo=value1;
      axios
        .delete('http://localhost:8080/api/rutinaejercicio/'+this.codigo)
        .then(()=>{
          console.log("rutina_ejercicio eliminado con exito");
          this.codigo=null;   
          this.quitarArrayE(value2);
          console.log('ARRAYE VER:',this.arrayE);
          this.quitarEjercicio(value2);
          console.log('QUITAREJERCICIO: ',this.ejercicios);

          this.$emit('refresh');
          //this.agregarEjercicio();
        })
        .catch((error)=>{
          console.log("Error al eliminar rutina_ejercicio", error);
          console.log('codigo=',this.codigo);
        });
    },

    //para llamar en una tabla los ejercicios que se agregaran a la rutina
    async agregarEjercicio() {
      if(this.dato6!=null){
        this.tabla=true;
        if(this.exerciseCodes.length > 0){
          this.exerciseCodes;
        }
        else{
          if(this.dato7!=null){
            this.comparando(this.dato7);
            if(this.dato7!=null){
              this.exerciseCodes.push(this.dato7);
              this.nuevoValor(this.dato7);
              this.actionArrayE();
            }
          }
        }
        if(this.exerciseCodes.length>0){          
          for(const ejercicio of this.exerciseCodes){
            this.codigo=ejercicio;
            if(this.codigo){
              try{
              // Llamada a la API para obtener los detalles del ejercicio por el codigo
              const response = await axios.get('http://localhost:8080/api/ejercicio/'+this.codigo);
              this.nuevoEjercicio(response.data);
              this.actionEjercicios();
              this.limpiarDato7();
              console.log('ver los ejercicios: ',this.ejercicios);
              } catch(error) {
                console.error('Error al obtener los detalles del ejercicio:', error);
              }
            }
          }
        }
        this.exerciseCodes=[];
      }
      else{
          this.tabla=false;
        }
    },

    comparando(value){//esto se modifico varias veces, tenia un proposito al principio que resulto asi y merjor
      console.log('AQUI EN COMPARANDO: datos',this.datos);
      if(this.datos.length > 0){
        const existe = this.datos
        .some(item => item.rutina.codigo === this.dato6 && item.ejercicio.codigo === value);
        console.log('1.existe:', existe);
        if(existe){
          this.actualizarDato7(null);
          alert('este ejercicio ya existe en la rutina');
        }
        else{          
          const existe = this.arrayE
          .some(item => item === value)
          console.log('2.existe:', existe);
          if(existe){
            this.actualizarDato7(null);
            alert('este ejercicio ya existe en la rutina');
          }
          else{
            this.actualizarDato7(value);
          }
        }
      }
      else{         
        const existe = this.arrayE
        .some(item => item === value)
        console.log('2.existe:', existe);
        if(existe){
          this.actualizarDato7(null);
          alert('este ejercicio ya existe en la rutina');
        }
        else{
          this.actualizarDato7(value);
        }
      }
    },

    read(value1, value2){
      this.limpiarDatoact1();
      this.consultar(value1,value2);
    },
    read2(){
      if(this.activeM==true){
        this.limpiarDatoact1();
        this.consultar(this.dato6, this.groupFilter);
        this.actionActiveM(false);
      }
    },
    update(value1, value2){
      this.limpiarDatoact1();
      this.consultar(value1, value2);
    },
    limpiarNombreEjercicio(){
      this.limpiarEjercicio();
    },
    
    callMetodoR(){
      this.actualizarRetorno('retorno');
      this.$router.push('rutina');
    },
    callMetodoE(){
      if(this.rutina == ""){
        alert("seleccione una rutina primero");
      }
      else{
        this.actualizarRetorno('retorno');
        this.$router.push('ejercicio');
      }
    },
  },
    mounted(){
      this.agregarEjercicio();
      this.read2();
    }
}
</script>