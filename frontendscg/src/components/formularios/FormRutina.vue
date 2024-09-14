<template>
    <div class="container" id="form">
      <h1>Formulario de Rutina</h1>
      <form @submit.prevent="save()" >
        <div class="comp-form-group">
          <div class="form-group">
            <label for="nombre">Nombre: </label>
            <input type="text" @click="callMetodoN"  name="nombre" id="input2" v-model="nombre" placeholder="haz click para ingresar el nombre" readonly>
          </div>
          <div class="form-group">
            <label for="version">Version: </label>
            <input type="number" name="version" id="input2" v-model="numero" placeholder="haz click para ingresar la version" required> 
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
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import axios from "axios";
export default {
  data() {
    return{
      nombre:'',
      numero:'',
      salvar: true,
      modificar: false,
    };
  },

  computed:{
    ...mapState('variables',['datos2']),
    ...mapState(['dato6','nombre','dato8','dato4','datoact1','datoact2','retorno','retorno3']),...mapGetters(['getNombre','obtenerDato8'])
  },
  created(){
    if(this.datoact2!=null){
      this.numero=this.dato4;
    }
    
  },
//metodos CRUD
  methods:{
    ...mapActions('variables',['actionActiveM','limpiarEjercicios','limpiarArrayE']),
    ...mapActions(['actualizarRetorno2','actualizarDato6','actualizarDato8',
    'limpiarDatoact2','actualizarDatoact2','actualizarDato4','limpiarDato6', 'registrarRutina','limpiarEjercicio']),
    
    servicio(){
      if(this.salvar==true){
        if(this.dato4!=null && this.numero!=null){
          this.guardar();
        }
        else{
          alert("hay campos vacios");
        }
      }
      else {
        this.actualizar();       
      }
    },
    save(){
      console.log('datos2 length: ',this.datos2.length);
      if(this.datos2.length > 0){
        const existe = this.datos2
        .some(item => item.tipoRutina.codigo === this.dato4 && item.numero === this.numero);
        console.log('DATOS NOMBRE: ',this.datos2?.tipoRutina?.codigo);
        console.log('DATOS VERSION: ',this.datos2.codigo);
        console.log('DATOS NOMBRE: ', this.dato4,);
        console.log('DATOS VERSION: ', this.numero);
        console.log('1.existe:', existe);
        if(existe){
          alert('este rutina ya existe');
        }
        else{          
          this.servicio();
        }
      }  
    },

    guardar(){
      axios
      .post('http://localhost:8080/api/rutina',{
        tipoRutina: this.dato4,
        numero:this.numero,
      })
      .then((response)=>{
        console.log("Rutina registrado con exito", response.data);
        alert("La rutina es registrado con exito");
        this.$emit('leave');
        if(this.retorno=='retorno'){
          this.actualizarDato6(response.data.codigo);
          this.antesderoutear();
          this.limpiarEjercicio();
          this.limpiarArrayE();
          this.limpiarEjercicios();
          this.actionActiveM(true);
          this.$router.push('rutinaEjercicio');
        }
      })
      .catch((error)=>{
        console.error("Error al registrar rutina:", error);
      });
    },

    consultar(value){
      this.codigo=value;
      axios
        .get('http://localhost:8080/api/rutina/'+this.codigo)
        .then((response)=>{
          //actualiza los campos del formulario con los datos consultados
          this.nombre=response.data.tipoRutina.nombre;
          this.numero=response.data.numero;
          this.actualizarDato4(response.data.tipoRutina.codigo);
          if(this.habilitar==1){
            this.registrarRutina(response.data.tipoRutina.nombre);
            this.actualizarDato8(response.data.numero);
          }
        })
        .catch((error) =>{
          console.error("Error al consultar rutina: ", error);
        });
    },

    actualizar(){
      this.codigo=this.datoact2;
      axios
        .put('http://localhost:8080/api/rutina/actualizar/'+this.codigo,{
          tipoRutina: this.dato4,
          numero: this.numero,      
      })
      .then((response)=>{
        console.log("Rutina actualizado con exito", response.data);
        this.$emit('leave');
        if(this.retorno3=='retorno'){
          this.actualizarDato6(this.codigo);
          this.antesderoutear();
          this.$router.push('planRutina');
        }
        else if(this.retorno=='retorno'){
          this.actualizarDato6(this.codigo);
          this.antesderoutear();
          this.$router.push('rutinaEjercicio');
        }
        this.limpiarDatoact2();
      })
      .catch((error)=>{
        console.error("Error al actualizar la rutina", error);
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
      this.numero="";
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
      this.numero=this.obtenerDato8;
    },
    antesderoutear(){
      this.habilitar=1;
      this.consultar(this.dato6);
    },
    datos(){
      this.actualizarDato8(this.numero);
    },

    callMetodoN(){
      this.datos();
      this.actualizarRetorno2('retorno');
      this.$router.push('tipoRutina');
    },
  },
}
</script>