<template>
    <div class="container" id="form">
      <h1>Formulario de Ficha</h1>
      <form @submit.prevent="servicio()" >
        <div class="comp-form-group">
            <div class="form-group">
            <label for="ficha">Numero: </label>
            <input type="number" name="ficha" id="input2" ref="myInput" v-model="numero" placeholder="haz click para ingresar el numero de ficha" required> 
          </div>
          <div class="form-group">
            <label for="nombre">Formación: </label>
            <input type="text" @click="callMetodoN"  name="nombre" id="input2" style="width: 120%" v-model="miFormacion" placeholder="haz click para ingresar la formacion" readonly>
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
import { mapActions, mapState } from "vuex";
import axios from "axios";
export default {
  data() {
    return{
      pack: [],
      numero:null,
      miFormacion:'',
      salvar: true,
      modificar: false,
    };
  },

  computed:{
    ...mapState('formacion',['formacion']),
    ...mapState('ficha',['ficha']),
    ...mapState(['datoact2']),
  },
  created(){
    if(this.datoact2!=null){
      this.numero=this.ficha;//pendiente
    }
    
  },
//metodos CRUD
  methods:{
    ...mapActions('formacion',['consultarFormacion']),
    ...mapActions('ficha',['consultarFicha','addFicha']),
    ...mapActions(['actualizarRetorno2','limpiarDatoact2','actualizarDatoact2']),
    
    servicio(){
      if(this.salvar==true){
        if(this.numero!=null && this.formacion.codigo!=null){
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

    cargarDatos(){
      this.numero = this.ficha.numero;
      this.miFormacion = this.formacion.nombre;
      console.log('formacion: ', this.formacion?.nombre);
    },
    guardar(){
      axios
      .post('http://localhost:8080/api/ficha',{
        numero:this.numero,
        formacion: this.formacion.codigo,
      })
      .then((response)=>{
        console.log("Ficha registrado con exito", response.data);
        alert("La ficha es registrado con exito");
        if(this.retorno=='retorno'){
          //this.actionFicha(response.data.codigo);
          //this.antesderoutear();
          this.$router.push('aprendiz');
        } else {
          this.$emit('leave');
        }
      })
      .catch((error)=>{
        console.error("Error al registrar ficha:", error);
      });
    },

    consultar(value){
      this.codigo=value;
      axios
        .get('http://localhost:8080/api/ficha/'+this.codigo)
        .then((response)=>{
          //actualiza los campos del formulario con los datos consultados
          this.numero=response.data.numero;
          this.nombre=response.data.formacion.nombre;
          /*this.actionFormacion(response.data.formacion.codigo);
          if(this.habilitar==1){
            this.actionNumeroFi(response.data.numero);
            this.actionNombreFo(response.data.formacion.nombre);
          }*/
        })
        .catch((error) =>{
          console.error("Error al consultar ficha: ", error);
        });
    },

    actualizar(){
      this.codigo=this.datoact2;
      axios
        .put('http://localhost:8080/api/ficha/actualizar/'+this.codigo,{
          numero: this.numero,
          formacion: this.formacion,
      })
      .then((response)=>{
        console.log("Ficha actualizado con exito", response.data);
        if(this.retorno=='retorno'){
          //this.actionFicha(this.codigo);
          //this.antesderoutear();
          this.$router.push('aprendiz');
        } else{
          this.$emit('leave');
        }
        this.limpiarDatoact2();
      })
      .catch((error)=>{
        console.error("Error al actualizar la ficha", error);
      });
    },
    
    read(value){
      this.limpiarDatoact2();
      this.miFormacion = this.ficha.formacion.nombre;
      this.consultar(value);
      this.rotar();
    },
    update(value){
      this.consultar(value);
      this.actualizarDatoact2(value);
      this.variar();
    },
    clear(){
      this.numero="";
      this.nombre="";
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
    },
    antesderoutear(){
      this.habilitar=1;
      this.consultar(this.ficha);
    },
    datos(){
      this.data = {
        codigo: this.ficha.codigo,
        numero: this.numero,
        formacion: this.miFormacion,
      };
      console.log('NUMERO: ', this.data.numero);
    },

    callMetodoN(){
      this.datos();
      this.addFicha(this.data);
      this.actualizarRetorno2('retorno');
      this.$router.push('formacion');
    },
    focusInput(){
    this.$refs.myInput.focus();
    },
  },
  mounted(){
    this.cargarDatos();
    this.focusInput();
  }
}
</script>