<template>
  <div class="containerF" id="form" >
    <h1>Formulario Plan de Entrenamiento</h1>
    <form @submit.prevent="servicio()" id="scroll4">
      <div class="comp-form-group">
        <div class="form-group">
          <label for="plan">Plan: {{ dato9 }} meses</label>
          <input type="text" @click="callMetodoP"  name="plan" id="input2" v-model="plan" placeholder="haz click para ingresar el plan" readonly>
        </div>
        <div class="form-group">
          <label for="rutina">Rutina:</label>
          <input type="text" @click="callMetodoR" name="rutina" id="input2" v-model="rutinaN" placeholder="haz click para ingresar la rutina" readonly>
        </div>
        <div class="form-group">
          <div id="formbutton">
              <button id="guardar" type="submit" name="guardar" v-if="salvar">Guardar</button><span style="color:orangered;margin-left: 5px;">{{ mensaje }}</span>
              <button id="guardar" type="submit" name="actulizar" v-if="modificar">Actualizar</button>
              <font-awesome-icon :icon="['fas', 'right-left']" id="cerrar3" v-if="modificar" @click="cerrar"/>
          </div>
        </div>
      </div>
    </form><br>
    <div class="containerF" v-if="tabla">
      <h1>Tabla  de rutinas</h1>
      <div id="scroll2" style="max-height: 40vh;">
        <table>
          <thead>
            <tr>
              <th>Rutina (version)</th>
              <th style="text-align:center">Ejercicios</th>
              <th id="rigth">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr id="fila2" v-for="(item, index) in filterRutinas" :key="index">
              <td>{{ item.rutina.tipoRutina.nombre}} ({{ item.rutina.numero }})</td>
              <td>
                <tr class="head2">
                  <td id="space">Ejercicio</td>
                  <td id="space">Tipo ejercicio</td>
                  <td id="space">Musculo</td>
                  <td id="space">Series</td>
                  <td id="space">Repetiociones</td>
                  <td id="space">Descanso</td>
                </tr>
                <tr v-for="(ejercicio, i) in item.ejercicios" :key="i">
                  <td id="space">{{ ejercicio.nombre.nombre }}</td>
                  <td id="space">{{ ejercicio.tipoEjercicio.nombre }}</td>
                  <td id="space">{{ ejercicio.musculo.nombre }}</td>
                  <td id="space">{{ ejercicio.series }}</td>
                  <td id="space">{{ ejercicio.repeticiones }}</td>
                  <td id="space">{{ ejercicio.descanso }}</td>
                </tr>
              </td>
              <td id="alibutton">
                  <font-awesome-icon icon="trash" id="eliminar" @click="verificar(item.rutina.codigo)"/>
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
        rutinaN: '',
        salvar: true,
        modificar: false,
        tabla: false,
        rutinaInCodes: [],
        mensaje: '',
      };
    },
  
    computed:{
      ...mapState('variables',['rutinas','arrayR','valor2','datos3','activeM','groupFilter2']),
      ...mapState(['dato5','dato6','dato9','plan','datoact1', 'retorno3','datoact0']),

      filterRutinas() {
        return this.rutinas.filter(rutina => rutina != null || rutina != undefined);
      },
    },
    //metodos CRUD
    methods:{
      ...mapActions('variables',['actionRutinas','nuevaRutina','quitarRutina',
      'actionArrayR', 'nuevoValor2','limpiarArrayR', 'limpiarValor2','quitarArrayR','actionActiveM','limpiarDatos3',
      'limpiarGroupFilter2']),
      ...mapActions(['actualizarRetorno3','actualizarDato5','registrarPlan','actualizarDato6','limpiarDato6',
      'actualizarDato9','actualizarDatoact1','limpiarDatoact1','limpiarRetorno3','actualizarDato8','limpiarRetorno','limpiarDatoact0']),
      servicio(){
        this.mensaje= '';
        if(this.salvar==true){
          if(this.dato5!=null && this.arrayR.length > 0){
            this.guardar();
          }
          else{
            this.$emit('leave');
          }  
        }
        else {
          this.actualizar();       
        }
      },
  
      guardar(){
        for(const rutina of this.arrayR){
          this.actualizarDato6(rutina);
          console.log('Codigo de la rutina = ',this.dato6);
        axios
        .post('http://localhost:8080/api/planrutina',{
            plan: this.dato5,
            rutina: this.dato6,
        })
        .then((response)=>{
          console.log("plan de entrenamiento registrado con exito", response.data);
          this.$emit('leave');      
        })
        .catch((error)=>{
          console.error("Error al registrar plan de entrenamiento:", error);
        });
        }
        alert("La rutina de entrenamiento es registrado con exito");
        this.limpiarArrayR();
      },
   
      consultar(value1, value2) {
      this.actualizarDato5(value1);
      console.log('value2:',value2);
      console.log('DATOS PARA FILTRAR',value2);
      // Filtramos las rutinas con el código especificado en la variable
      const filteredData = value2.filter(item => item.plan.codigo === value1);
      if(filteredData.length > 0){
        console.log('verDetalles: ',filteredData);
        const primerElemento = filteredData[0];
        const tipoPlanNombre = primerElemento.plan.tipoPlan.nombre;
        const planMeses = primerElemento.plan.meses;
        this.registrarPlan(tipoPlanNombre);
        this.actualizarDato9(planMeses);
        console.log('nombre del plan: ',this.plan);
        console.log('numero de meses: ',this.dato9);

        // Si hay datos filtrados, extraemos los códigos de los ejercicios
        if (filteredData.length > 0) {
          // Asumimos que solo hay una rutina con el código dado, si no es así deberías ajustar este código
          const rutinas = filteredData[0].rutinas;
          console.log('rutinas', rutinas);
          this.rutinaInCodes = rutinas.map(rutina => rutina.codigo);
          console.log('rutinaInCodes: ', this.rutinaInCodes);
          this.agregarRutina();
        } else {
          this.rutinaInCodes = [];
          console.log("No se encontraron ejercicios.");
        }
      }
    },

    verificar(value){

      console.log('codigo-rutina: ', value);
      this.datos3;
      const jsonString = JSON.stringify(this.datos3,null,2);
      console.log('%c' + jsonString, 'color: orange; font-weight: bold;');
      const existe = this.datos3
        .filter(item => item.plan.codigo === this.dato5 && item.rutina.codigo === value).map(item2 => item2.codigo);
      if(existe.length > 0){
        this.eliminarFila(existe,value);
        console.log('VALOR DE EXISTE: ',existe);
      }
      else{
        this.quitarArrayR(value);
        console.log('ARRAYR VER:',this.arrayR);
        this.quitarRutina(value);
        console.log('QUITARRUTINA: ',this.rutinas);
        this.limpiarDatos3();
        this.$emit('refresh');
        this.agregarRutina();
      }
    },
    eliminarFila(value1,value2){
      this.codigo=value1;
      axios
        .delete('http://localhost:8080/api/planrutina/'+this.codigo)
        .then(()=>{
          console.log("plan_rutina eliminado con exito");
          this.codigo=null;   
          this.quitarArrayR(value2);
          console.log('ARRAYR2 VER:',this.arrayR);
          this.quitarRutina(value2);
          console.log('QUITARRUTINA2: ',this.rutinas);
          this.limpiarDatos3();
          this.$emit('refresh');
          this.agregarRutina();
        })
        .catch((error)=>{
          console.log("Error al eliminar plan_rutina", error);
          console.log('codigo=',this.codigo);
        });
    },

    //para llamar en una tabla rutinas que se agregaran al plan
    async agregarRutina() {
      if(this.dato5!=null){
        this.tabla=true;
        if(this.rutinaInCodes.length > 0){
          this.rutinaInCodes;
        }
        else{
          if(this.dato6!=null){
            this.comparando(this.dato6);
            if(this.dato6!=null){
              this.rutinaInCodes.push(this.dato6);
              this.nuevoValor2(this.dato6);
              this.actionArrayR();
            }
          }
        }
        if(this.rutinaInCodes.length>0){  
          for(const rutina of this.rutinaInCodes){
            this.codigo=rutina;
            if(this.codigo){
              console.log('CODIGO DE ENTRADA: ',this.codigo);
              try{
                const response = await axios.get('http://localhost:8080/api/rutinaejercicio/listar');
                await this.$nextTick();
                const listData = response.data;
                if (Array.isArray(listData)) {
                  this.finalData = this.groupDataById(listData);
                  console.log('toFilter', this.finalData)
                } else {
                  console.error('La respuesta de la API no es un array:', listData);
                }
                const toSave = this.finalData.find(item => item.rutina.codigo === this.codigo);
                this.nuevaRutina(toSave);
                this.actionRutinas();
                this.limpiarDato6();
                //this.resultRutina = this.rutinas.filter(rutina => rutina != null || rutina != undefined);
                console.log('ver las rutinas: ',this.rutinas);
              } catch(error) {
                console.error('Error al obtener los detalles de la rutina: ', error);
              }
            }
          }
        }
        this.rutinaInCodes=[];
      }
      else{
          this.tabla=false;
        }
    },

    groupDataById(data) {
      const groupedData = data.reduce((acc, item) => {
        const key = `${item.rutina.codigo}_${item.rutina.numero}`;
        if (!acc[key]) {
          acc[key] = { rutina: item.rutina, ejercicios: [] };
        }
        acc[key].ejercicios.push(item.ejercicio);
        return acc;
      }, {});
      return Object.values(groupedData);
    },

    comparando(value){
      this.abrirMensaje();
      this.$emit('refresh');
      console.log('AQUI EN COMPARANDO: datos3',this.datos3);
      if(this.datos3.length > 0){
        const existe = this.datos3
        .some(item => item.plan.codigo === this.dato5 && item.rutina.codigo === value);
        console.log('1.existe:', existe);
        if(existe){
          this.actualizarDato6(null);
          console.log('INSPECCIONAR THIS.PLAN.CODIGO: ',existe);
          console.log('INSPECCIONAR VALUE',value);
          if(this.datoact0 == 'retorno'){
            this.limpiarDatoact0();
          } else{
            alert('esta rutina ya existe en el plan');
          }
        }
        else{          
          const existe = this.arrayR
          .some(item => item === value)
          console.log('2.existe:', existe);
          if(existe){
            this.actualizarDato6(null);
              if(this.datoact0 == 'retorno'){
              this.limpiarDatoact0();
            } else{
              alert('esta rutina ya existe en el plan');
            }
          }
          else{
            this.actualizarDato6(value);
          }
        }
      }
      else{         
        const existe = this.arrayR
        .some(item => item === value)
        console.log('3.existe:', existe);
        if(existe){
          this.actualizarDato6(null);
          alert('esta rutina ya existe en el plan');
        }
        else{
          this.actualizarDato6(value);
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
        this.$emit('refresh');
        this.consultar(this.dato5, this.groupFilter2);
        this.actionActiveM(false);
      }
    },
      
      callMetodoP(){
        this.actualizarRetorno3('retorno');
        this.$router.push('plan');
        
      },
      callMetodoR(){
        if(this.plan == ""){
        alert("seleccione un plan primero");
        }else{
          this.limpiarRetorno();
          this.actualizarRetorno3('retorno');
          this.$router.push('rutinaEjercicio');
        }
      },
      abrirMensaje(){
        if(this.datoact0 == 'retorno'){
          this.mensaje = 'click en "Guardar" para ver los cambios.'
        }
      },
    },
    mounted(){
      this.agregarRutina();
      this.read2();
    }
  }
</script>