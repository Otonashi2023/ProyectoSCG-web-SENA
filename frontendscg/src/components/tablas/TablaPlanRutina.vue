<template>
    <!--Tabla que lista todos los registros de la entidad-->
    <div class="container2">
      <h1>planes de entrenamiento</h1>
      <div id="scroll">
        <table>
    <thead>
      <tr>
        <th>Plan (meses)</th>
        <th>Rutinas (versión)</th>
        <th id="rigth">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr id="fila2" v-for="(plan, index) in planesFiltrados" :key="index" @click ="callMetodoP(plan.plan.codigo)">
        <td>{{ plan.plan.tipoPlan.nombre }}_(<span style="color: #EA0234; font-weight: 600;">{{ plan.plan.meses }}</span>)</td>
        <td>
            <tr v-for="(rutina, i) in plan.rutinas" :key="i">
              <td style="">
                {{ rutina.tipoRutina.nombre }}_(<span style="color:#00B69B;font-weight: bold;">{{ rutina.numero }}</span>)
              </td>
                <td>
              <tr class="head2">
                <td id="space">Ejercicio</td>
                <td id="space">Tipo ejercicio</td>
                <td id="space">Musculo</td>
                <td id="space">Series</td>
                <td id="space">Repetiociones</td>
                <td id="space">Descanso</td>
              </tr>
              <tr v-for="(ejercicio, j) in rutina.ejercicios" :key="j">
                <td id="space">{{ ejercicio.nombre.nombre }}</td>
                <td id="space">{{ ejercicio.tipoEjercicio.nombre }}</td>
                <td id="space">{{ ejercicio.musculo.nombre }}</td>
                <td id="space">{{ ejercicio.series }}</td>
                <td id="space">{{ ejercicio.repeticiones }}</td>
                <td id="space">{{ ejercicio.descanso }} min</td>
              </tr>
            </td>
            </tr>
        </td>
        <td id="alibutton">
          <font-awesome-icon icon="edit" id="editar" @click.stop="consultarbyId(plan.plan.codigo)"/>
          <font-awesome-icon icon="trash" id="eliminar" @click.stop="removeAllByNombre(plan.plan.codigo)"/>
        </td> 
      </tr>
    </tbody>
  </table>
        
      </div>      
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { mapActions, mapMutations, mapState } from "vuex";
  //contructor de las variables 
  export default {
    data(){
      return{
        finalData:[],
        originalData:[],
        codigo:null,
      }
    },
    computed:{
      ...mapState('variables',['groupFilter2','datos3']),
      ...mapState(['retorno3','retorno4','searchQuery']),

      planesFiltrados() {
        const query = this.searchQuery;
        return this.finalData.filter(plan =>{
          const planCoincide = plan.plan.tipoPlan.nombre.toLowerCase().includes(query) ||
                              plan.plan.meses.toString().includes(query);
          const rutinaCoincide = plan.rutinas.some(rutina =>
            rutina.tipoRutina.nombre.toLowerCase().includes(query) ||
            rutina.numero.toString().includes(query)
          );
          return planCoincide || rutinaCoincide;
        });
      },
    },
    methods: {
      ...mapMutations(['clearSearchQuery']),
      ...mapActions('aprendizPlan',['agregarPlan']),
      ...mapActions('variables',['limpiarRutinas','actionDatos3','actionGroupFilter2','limpiarDatos3']),
      ...mapActions(['limpiarDatoact1']),

      obtenerPlanRutinasYEnriquecer() {
      axios.get("http://localhost:8080/api/planrutina/listar")
        .then((response) => {
          const data = response.data;
          this.limpiarDatos3();
          this.actionDatos3(data);
          console.log('DATOS3:',this.datos3);
          if (Array.isArray(data)) {
            this.originalData = data;
            return axios.get("http://localhost:8080/api/rutinaejercicio/listar");
          } else {
            throw new Error('La respuesta de la API no es un array');
          }
        })
        .then((response) => {
          const ejerciciosData = response.data;
          if (Array.isArray(ejerciciosData)) {
            this.finalData = this.enriquecerRutinasConEjercicios(ejerciciosData);
            this.actionGroupFilter2(this.finalData);
            console.log('Datos finales:', this.finalData);
            console.log('GROUPFILTER: ',this.groupFilter2);
          } else {
            throw new Error('La respuesta de la API de ejercicios no es un array');
          }
        })
        .catch((error) => {
          console.error("Error al obtener y combinar datos:", error);
        });
    },
    groupPlansByRutinas(data) {
      const groupedData = data.reduce((acc, item) => {
        console.log('Datos completos del Plan:', item.plan);
        console.log('Nombre del Plan:', item.plan.tipoPlan.nombre);
        console.log('Número del Plan:', item.plan.meses);
        const key = `${item.plan.tipoPlan.nombre}_${item.plan.meses}`;
        if (!acc[key]) {
          acc[key] = { plan: item.plan, rutinas: [] };
        }
        acc[key].rutinas.push({ ...item.rutina, ejercicios: [] }); // Inicialmente sin ejercicios
        return acc;
      }, {});
      return groupedData;
    },
    enriquecerRutinasConEjercicios(ejerciciosData) {
      const combinedData = { ...this.groupPlansByRutinas(this.originalData) };

      ejerciciosData.forEach(ejercicioItem => {
        const rutinaKey = `${ejercicioItem.rutina.tipoRutina.nombre}_${ejercicioItem.rutina.numero}`;

        Object.keys(combinedData).forEach(planKey => {
          const plan = combinedData[planKey];
          const rutina = plan.rutinas.find(rutina => `${rutina.tipoRutina.nombre}_${rutina.numero}` === rutinaKey);

          if (rutina) {
            rutina.ejercicios.push(ejercicioItem.ejercicio);
          }
        });
      });

      return Object.values(combinedData);
    },

      removeAllByNombre(nombreCodigo) {
      // Primero, obtén los códigos de las rutinas que pertenecen al plan seleccionado
        const codigosToDelete = this.originalData
          .filter(item => item.plan.codigo === nombreCodigo)
          .map(item => item.codigo); // Asumiendo que el código es `plan.codigo`

        console.log('plan a eliminar:', codigosToDelete);

        // Crear una cadena de promesas de eliminación
        let promiseChain = Promise.resolve();

        codigosToDelete.forEach(codigo => {
          promiseChain = promiseChain
            .then(() => axios.delete(`http://localhost:8080/api/planrutina/${codigo}`))
            .catch(error => {
              console.error(`Error al eliminar la rutina con código ${codigo}:`, error);
            });
        });

        // Después de eliminar todas las rutinas, actualiza los datos
        promiseChain.then(() => {
          // Filtrar los datos originales para eliminar todos los ítems con el rutina especificado
          this.originalData = this.originalData.filter(item => !codigosToDelete.includes(item.rutina.codigo));

          // Reagrupar los datos restantes en planes y rutinas
          this.finalData = this.groupPlansByRutinas(this.originalData);

          // Obtener nuevamente los ejercicios para actualizar la vista final
          this.obtenerPlanRutinasYEnriquecer();
        });
      },

      consultarbyId(value){
        this.limpiarRutinas();
        if(this.codigo==null){
          this.$emit('ById',value,this.finalData);
        }
      },
      limpiarId(){
        this.codigo=null;
      },
      callMetodoP(value){
        if(this.retorno4 == 'retorno'){
          if(this.codigo == null){
            const planFiltrado = this.datos3.find(item => item.plan.codigo === value);
            this.agregarPlan(planFiltrado);
            this.$router.push('aprendizPlan');
          }
        }
      },
      formulario(){
        if(this.retorno3=='retorno'){
          this.$emit('goForm');
        }
      },
    },
    mounted(){
      this.clearSearchQuery();
      this.obtenerPlanRutinasYEnriquecer();
      this.formulario();
    },
  }
</script>