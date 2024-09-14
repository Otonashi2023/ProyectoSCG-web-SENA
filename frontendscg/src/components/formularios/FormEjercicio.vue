<template>
    <div class="container2" id="form">
      <h1>Formulario de ejercicio</h1>
      <form @submit.prevent="servicio()" >
        <div class="comp-form-group">
          <div class="form-group">
            <label for="nombre">Nombre: </label>
            <input type="text" @click="callMetodoN"  name="nombre" id="input2" v-model="nombre" placeholder="haz click para ingresar el nombre" readonly>
          </div>
          <div class="form-group">
            <label for="categotia">Categoria: </label>
            <input type="text" @click="callMetodoT" name="categoria" id="input2" v-model="tipoEjercicio" placeholder="haz click para ingresar la categoria" readonly>
          </div>
          <div class="form-group">
            <label for="musculo">Musculo: </label>
            <input type="text" @click="callMetodoM" name="musculo" id="input2" v-model="musculo" placeholder="haz click para ingresar el musculo a trabajar" readonly>
          </div>
        </div>
        <div class="comp-form-group">
          <div class="form-group">
            <label for="series">Series: </label>
            <input type="number" name="series" id="input2" required v-model="series" placeholder="ingrese el numero de series">
          </div>
          <div class="form-group">
            <label for="repeticiones">Repeticiones:</label>
            <input type="number" name="repeticiones" id="input2" required v-model="repeticiones" placeholder="ingrese el numero de repeticiones ">
          </div>
          <div class="form-group">
            <label for="descanso">Descanso (min):</label>
            <input type="number" name="descanso" id="input2" required v-model="descanso" placeholder="ingrese el tiempo de descanso ">
          </div>
        </div>
        <div id="dist">
          <div></div>
          <div id="formbutton">
              <button id="guardar" type="submit" name="guardar" v-if="salvar">Guardar</button>
              <button id="guardar" type="submit" name="actulizar" v-if="modificar">Actualizar</button>
              <font-awesome-icon :icon="['fas', 'right-left']" id="cerrar3" v-if="modificar" @click="cerrar"/>
          </div>
          <div></div>
        </div> 
      </form>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import axios from "axios";
export default {
  data() {
    return{
      nombre:"",
      tipoEjercicio:"",
      musculo:"",
      series:"",
      repeticiones:"",
      descanso:"",
      salvar: true,
      modificar: false,
    };
  },

  computed:{
    ...mapState('datosEjercicio',['nombreCode','tipoEjercicioCode','musculoCode']),
    ...mapState('variables',['datos2']),
    ...mapState(['dato','dato2','dato3','nombre','tipoEjercicio','musculo','retorno','datoact2','dato7']),...mapGetters(['getNombre','getTipoEjercicio','getMusculo']),
    ...mapGetters('datosEjercicio',['getSeries','getRepeticiones','getDescanso']),
  },
//metodos CRUD
  methods:{
    ...mapActions(['actualizarDato7','actualizarRetorno2','actualizarDato','actualizarDato2','actualizarDato3','registrarNombre',
    'registrarTipoEjercicio','registrarMusculo','limpiarDatoact2','actualizarDatoact2','registrarEjercicio']),
    ...mapActions('datosEjercicio',['actualizarSeries','actualizarRepeticiones','actualizarDescanso']),
    
    servicio(){
      if(this.salvar==true){
        if(this.dato!=null && this.dato2!=null && this.dato3!=null){
          this.save();
        }
        else{
          alert("hay campos vacios");
        } 
      }
      else {
        this.updateSave();       
      }
    },
    save(){
      console.log('datos2: ',this.datos2);
      if(this.datos2.length > 0){
        const existe = this.datos2
        .some(item => item.nombre.codigo === this.dato && item.tipoEjercicio.codigo === this.dato2 && item.musculo.codigo === this.dato3);
        console.log('1.existe:', existe);
        if(existe){
          alert('este ejercicio ya existe');
        }
        else{          
          this.guardar();
        }
      }  
    },
    updateSave(){
      console.log('datos2: ',this.datos2);
      if(this.datos2.length > 0){
        const existe = this.datos2
        .some(item => item.nombre.codigo === this.dato && item.tipoEjercicio.codigo === this.dato2 && item.musculo.codigo === this.dato3);
        if(existe){
          if(this.dato=== this.nombreCode && 
            this.dato2 === this.tipoEjercicioCode && 
            this.dato3 === this.musculoCode){
            this.actualizar();
          } else{
            alert('este ejercicio ya existe');            
          }
        }
        else{   
          this.actualizar();
        }
      }  
    },

    guardar(){
      axios
      .post('http://localhost:8080/api/ejercicio',{
        nombre: this.dato,
        tipoEjercicio: this.dato2,
        musculo: this.dato3,
        series: this.series,
        repeticiones: this.repeticiones,
        descanso: this.descanso,
      })
      .then((response)=>{
        console.log("Ejercicio registrado con exito", response.data);
        alert("El ejercicio es registrado con exito");
        this.$emit('leave');
        if(this.retorno=='retorno'){
          this.actualizarDato7(response.data.codigo);
          this.antesderoutear();
          this.$router.push('rutinaEjercicio');
        }           
      })
      .catch((error)=>{
        console.error("Error al registrar ejercicio:", error);
      });
    },

    consultar(value){
      this.codigo=value;
      axios
        .get('http://localhost:8080/api/ejercicio/'+this.codigo)
        .then((response)=>{
              //actualiza los campos del formulario con los datos consultados
          this.nombre = response.data.nombre.nombre;
          this.tipoEjercicio = response.data.tipoEjercicio.nombre;
          this.musculo = response.data.musculo.nombre;
          this.series = response.data.series;
          this.repeticiones = response.data.repeticiones;
          this.descanso = response.data.descanso;
          this.actualizarDato(response.data.nombre.codigo);
          this.actualizarDato2(response.data.tipoEjercicio.codigo);
          this.actualizarDato3(response.data.musculo.codigo);
          if(this.habilitar==1){
            this.registrarEjercicio(response.data.nombre.nombre);
          }
        })
        .catch((error) =>{
          console.error("Error al consultar ejercicio: ", error);
        });
    },

    actualizar(){
      this.codigo=this.datoact2;
      axios
        .put('http://localhost:8080/api/ejercicio/actualizar/'+this.codigo,{
          nombre: this.dato,
          tipoEjercicio: this.dato2,
          musculo: this.dato3,
          series: this.series,
          repeticiones: this.repeticiones,
          descanso: this.descanso,        
      })
      .then((response)=>{
        console.log("Ejercicio actualizado con exito", response.data);
        this.$emit('leave');
        if(this.retorno=='retorno'){
          this.actualizarDato7(this.codigo);
          this.antesderoutear();
          this.$router.push('rutinaEjercicio');
        }

      })
      .catch((error)=>{
        console.error("Error al actualizar el ejercicio", error);
      });
    },
    
    read(value){
      this.limpiarDatoact2();
      this.consultar(value);
      this.rotar();
    },
    update(value){
      this.consultar(value);
      this.actualizarDatoact2(value);
      this.variar();
    },
    clear(){
      this.nombre="";
      this.tipoEjercicio="";
      this.musculo="";
      this.series="";
      this.repeticiones="";
      this.descanso="";
    },
    cerrar(){
      this.clear();
      this.rotar();
      this.limpiarDatoact2();
    },
    rotar(){
      this.modificar= false;
      this.salvar= true;
    },
    variar(){
      if(this.datoact2!=null){
        this.modificar=true;
        this.salvar=false;
      }
      this.nombre=this.getNombre;
      this.tipoEjercicio=this.getTipoEjercicio;
      this.musculo=this.getMusculo;
      this.series=this.getSeries;
      this.repeticiones=this.getRepeticiones;
      this.descanso=this.getDescanso;
    },
    antesderoutear(){
      this.habilitar=1;
      this.consultar(this.dato7);
    },
    datos(){
      this.registrarNombre(this.nombre);
      this.registrarTipoEjercicio(this.tipoEjercicio);
      this.registrarMusculo(this.musculo);
      this.actualizarSeries(this.series);
      this.actualizarRepeticiones(this.repeticiones);
      this.actualizarDescanso(this.descanso);
    },

    callMetodoN(){
      this.datos();
      this.actualizarRetorno2('retorno');
      this.$router.push('nombreEjercicio');
    },
    callMetodoT(){
      this.datos();
      this.actualizarRetorno2('retorno');
      this.$router.push('tipoEjercicio');
    },
    callMetodoM(){
      this.datos();
      this.actualizarRetorno2('retorno');
      this.$router.push('musculo');
    },
  },
}
</script>