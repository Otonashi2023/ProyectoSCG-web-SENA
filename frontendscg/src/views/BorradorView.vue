<template>
    <input type="date" @change="cambio()" v-model="fecha">
    <input type="date" v-model="fechaFormattedDate">
    <button @click="cambio()">¡clik me!</button>
    <br>
{{ perimetros }}
<button @click="guardar()">Ver</button>
<button @click="pruebas()">Pruebas</button>

<h3>Asistencia</h3>
<form>
  <label for="codigo">
    Aprendiz:
  </label>
  <input type="number" v-model="codeAprendiz" placeholder="ingrese numero code aprendiz">
  <button @click="marcarAsistencia">registrar</button>
</form>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default{
    name:'BorradorView',
    data(){
        return{
            fecha: '', // Fecha seleccionada en el primer input
            fechaFormattedDate: '', // Fecha modificada que se mostrará en el segundo input
            codeAprendiz: null,
        }
    },

    computed:{
      ...mapState('fichaAntropometrica',['fichaAntropo']),
        ...mapState('perimetros',['perimetros']),
        ...mapState('usuario',['usuario','usuarios']),
        ...mapState('aprendiz',['aprendiz']),
        ...mapState('asistencia',['asistencia']),
        
    },
    methods:{
      ...mapActions('fichaAntropometrica',['guardarFichaAntropo']),
        ...mapActions('perimetros',['guardarPerimetros']),
        ...mapActions('usuario',['consultarAllUsuarios','consultarUsuario']),
        ...mapActions('asistencia',['guardarAsistencia','limpiarAsistencia']),

    async pruebas(){
        console.log('inicializando pruebas');
        try{
            await this.consultarAllUsuarios();
            await this.consultarUsuario(3);
            await this.$nextTick();
            console.log('usuarios:', this.usuarios);
            console.log('usuario:',this.usuario);
        }catch(error){
            console.log('error: ', error);
        }

    },


cambio(){
    if(this.fecha != ""){
      let dataInput = this.fecha;
      let date = new Date(dataInput);
      let incrementoMes =3;
      let mesTotal = date.getMonth() + incrementoMes;

      if (mesTotal >= 12) {
        // Calcula el nuevo mes y ajusta el año
        const mes = mesTotal % 12;
        date.setMonth(mes);
        
        const yearTotal = date.getFullYear() + Math.floor(mesTotal / 12);
        date.setFullYear(yearTotal);
      } else {
        // Si no supera el año, solo ajusta el mes
        date.setMonth(mesTotal);
      }

      this.fechaFormattedDate = date.toISOString().split('T')[0];
      console.log('Fecha: ', this.fechaFormattedDate);
    }
    else{
        this.fehca = "";
        this.fechaFormattedDate = "";
    }

    },

        ajustar(){
      const fechaOriginal = new Date(this.fecha);
      fechaOriginal.setHours(0, 0, 0, 0);
      // Añadir 3 meses a la fecha original (puedes ajustar el número de meses según tus necesidades)
      fechaOriginal.setMonth(fechaOriginal.getMonth() + 1);
      
      // Convertir la fecha modificada a formato YYYY-MM-DD
      const year = fechaOriginal.getFullYear();
      const month = String(fechaOriginal.getMonth() + 1).padStart(2, '0'); // Meses en formato 01-12
      const day = String(fechaOriginal.getDate()).padStart(2, '0'); // Días en formato 01-31
      this.fechaModificada = `${year}-${month}-${day}`;
        },

        async guardar(){
            try{
                const data = {
                cabeza: 1,
                cuello: 2,
                brazoRelax: 3,
                brazoTenso: 4,
                antebrazo: 5,
                muñeca: 6,
                torax: 7,
                cintura: 8,
                cadera: 9,
                musloMax: 10,
                musloMin: 11,
                pantorrillaMax: 12,
                pantorrillaMin: 13,
                fichaantropo: 44,
            };
            await this.guardarPerimetros(data);
            await this.$nextTick();
            console.log('perimetros:', this.perimetros);

            } catch(error){
                console.error("Error al guardar aprendiz:", error);
            }
        },
        async registrarFichaAntropo(){
          const data = {
            codigo: null,
            numControl: 1,
            fecha: "2024-05-04",
            altura: 1.82,
            peso: 60,
            imc: 18.50,
            personal: 1,
            genero: 1,
            aprendiz: 6,
          };
          await this.guardarFichaAntropo(data);
          await this.$nextTick();
          console.log('VER FICHA ANTROPOMETRICA: ', this.fichaantropo)
        },
        async marcarAsistencia(){
          const data = {
            aprendiz: this.codeAprendiz,
          };
          console.log('codigo: ', data);
          this.limpiarAsistencia();
          console.log('despues de limpiar',this.asistencia);
          await this.guardarAsistencia(data);
          await this.$nextTick();
          console.log('despues de registrar',this.asistencia);
        }
    },
    mounted(){
      this.registrarFichaAntropo();
        console.log('usuario: ', this.usuario);
    }
}
</script>


<!--script>
import { mapActions, mapGetters, mapState } from "vuex";
import axios from "axios";
export default {
  data() {
    return{
      imc:null,
      salvar: true,
      modificar: false,
    };
  },

  computed:{
    ...mapState('fichaAntropometrica',['fichaAntropo']),
    ...mapState('perimetros',['perimetros']),

    ...mapState(['dato','dato2','dato3','nombre','tipoEjercicio','musculo','retorno','datoact2','dato7']),...mapGetters(['getNombre','getTipoEjercicio','getMusculo']),
    ...mapGetters('datosEjercicio',['getSeries','getRepeticiones','getDescanso']),
  },
//metodos CRUD
  methods:{
    ...mapActions('fichaAntropometrica',['guardarFichaAntropo']),
    ...mapActions('perimetros',['guardarPerimetros']),

    ...mapActions(['actualizarDato7','actualizarRetorno2','actualizarDato','actualizarDato2','actualizarDato3','registrarNombre',
    'registrarTipoEjercicio','registrarMusculo','limpiarDatoact2','actualizarDatoact2','registrarEjercicio']),
    ...mapActions('datosEjercicio',['actualizarSeries','actualizarRepeticiones','actualizarDescanso']),

    result(){
      if(this.peso > 0 && this.altura > 0){
        this.imc = this.peso/(this.altura*this.altura);
        console.log('imc: ', this.imc);
      }
    },
    
    async registrarFichaAntropo(){
      try {
        let dataInput = this.fecha;
        let date = new Date(dataInput);
        let formattedDate = date.toISOString().split('T')[0];

        const data ={
          numControl: this.numControl,
          fecha: formattedDate,
          altura: this.altura,
          peso: this.peso,
          imc: this.imc,
          personal: 1,
          genero: 1,
          aprendiz: 1,
        };
        await this.guardarFichaAntropo(data);
        await this.$nextTick();
        const fichaAntropoId = this.fichaAntropo.codigo;
        console.log('Codigo ficha:',this.fichaAntropo.codigo);
        console.log('Codigo ficha:', fichaAntropoId);

        const dataPerimetros = {
          cabeza: this.cabeza,
          cuello: this.cuello,
          brazoRelax: this.brazoRelax,
          brazoTenso: this.brazoTenso,
          antebrazo: this.antebrazo,
          muñeca: this.muñeca,
          torax: this.torax,
          cintura: this.cintura,
          cadera: this.cadera,
          musloMax: this.musloMax,
          musloMin: this.musloMin,
          pantorrillaMax: this.pantorrillaMax,
          pantorrillaMin: this.pantorrillaMin,
          fichaantropo: fichaAntropoId,
        };
        console.log("ficha antropometrica",this.fichaAntropo);
        console.log('PERIMETROS', dataPerimetros);
        await this.guardarPerimetros(dataPerimetros);
        await this.$nextTick();
        console.log('perimetros', this.perimetros);
        this.$router.push('aprendizPlan');        
      } catch (error) {
        console.error("Error al guardar aprendiz:", error);
      }
    },
    
    servicio(){
      if(this.salvar==true){
        if(this.dato!=null && this.dato2!=null && this.dato3!=null){
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
</script-->