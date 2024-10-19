<template>
    <div class="container" id="form">
      <h1>Formulario de Plan</h1>
      <form @submit.prevent="save()" id="scroll" >
        <div class="comp-form-group">
          <div class="form-group">
            <label for="nombre">Nombre: </label>
            <input type="text" @click="callMetodoN"  name="nombre" id="input2" v-model="nombre" placeholder="haz click para ingresar el nombre" readonly>
          </div>
          <div class="form-group">
            <label for="Meses">Meses: </label>
            <input type="number" name="Meses" id="input2" v-model="meses" placeholder="haz click para ingresar los meses de duaracion" required> 
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
      meses:'',
      salvar: true,
      modificar: false,
    };
  },

  computed:{
    ...mapState('variables',['datos2']),
    ...mapState(['dato5','nombre','dato9','dato4','datoact1','datoact2','retorno3','plan']),
    ...mapGetters(['getNombre','obtenerDato9'])
  },
  created(){
    if(this.datoact2!=null){
      this.numero=this.dato4;
    }
    
  },
//metodos CRUD
  methods:{
    ...mapActions(["showPantalla",'actualizarRetorno2','actualizarDato5','registrarNombre','actualizarDato9','registrarEntidad',
    'callMetodo','limpiarDatoact2','actualizarDatoact2','actualizarDato4','limpiarDato5', 'registrarPlan','limpiarNombre']),
    
    servicio(){
      if(this.salvar==true){
        if(this.dato4!=null && this.dato9!=null){
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
        .some(item => item.tipoPlan.codigo === this.dato4 && item.meses === this.meses);
        console.log('DATOS NOMBRE: ',this.datos2?.tipoPlan?.codigo);
        console.log('DATOS VERSION: ',this.datos2.codigo);
        console.log('DATOS NOMBRE: ', this.dato4,);
        console.log('DATOS VERSION: ', this.meses);
        console.log('1.existe:', existe);
        if(existe){
          alert('este rutina ya existe');
        }
        else{        
          this.servicio();
        }
      } else{
        this.servicio();
      }
    },

    guardar(){
      this.actualizarDato9(this.meses);
      axios
      .post('http://localhost:8080/api/plan',{
        tipoPlan: this.dato4,
        meses:this.dato9,
      })
      .then((response)=>{
        console.log("Plan registrado con exito", response.data);
        alert("El plan es registrado con exito");
        this.$emit('leave');
        if(this.retorno3=='retorno'){
          this.actualizarDato5(response.data.codigo);
          this.actualizarDato9(response.data.meses);
          this.antesderoutear();
          this.$emit('callMetodoN');
        }     
      })
      .catch((error)=>{
        console.error("Error al registrar plan:", error);
      });
    },

    consultar(value){
      this.codigo=value;
      axios
        .get('http://localhost:8080/api/plan/'+this.codigo)
        .then((response)=>{
          //actualiza los campos del formulario con los datos consultados
          this.nombre=response.data.tipoPlan.nombre;
          this.meses=response.data.meses;
          this.actualizarDato4(response.data.tipoPlan.codigo);
          if(this.habilitar==1){
            this.registrarPlan(response.data.tipoPlan.nombre);
            console.log('obteniendo elnombre', this.nombre);
          }
        })
        .catch((error) =>{
          console.error("Error al consultar plan: ", error);
        });
    },

    actualizar(){
      this.codigo=this.datoact2;
      this.actualizarDato9(this.meses);
      axios
        .put('http://localhost:8080/api/plan/actualizar/'+this.codigo,{
          tipoPlan: this.dato4,
          meses: this.dato9,      
      })
      .then((response)=>{
        console.log("Plan actualizado con exito", response.data);
        this.$emit('leave');
        if(this.retorno3=='retorno'){
          this.actualizarDato5(this.codigo);
          this.antesderoutear();
          this.$router.push('planRutina');
        }
        this.limpiarDatoact2();
      })
      .catch((error)=>{
        console.error("Error al actualizar el plan", error);
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
      this.numero=this.obtenerDato9;
    },
    antesderoutear(){
      this.habilitar=1;
      this.consultar(this.dato5);
    },
    datos(){
      this.actualizarDato9(this.numero);
    },

    callMetodoN(){
      this.datos();
      this.limpiarNombre();
      this.actualizarRetorno2('retorno');
      this.$router.push('tipoPlan');
    },
  },
}
</script>