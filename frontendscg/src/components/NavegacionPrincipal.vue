<template>
     <div class="logo">
       <img src="@/assets/LogoSena.png" alt="Logo SENA">
       <h2>Gimnasio SENA CATA</h2>
     </div>
 
     <div class="items">
       <ul>
         <li><span class="material-icons-sharp">dashboard</span><router-link to="/" @click="limpiar">Panel de Control</router-link></li>
         <li><span class="material-icons-sharp">assignment_ind</span><router-link to="/aprendiz" @click="limpiar">Aprendices</router-link></li>
         <li><span class="material-icons-sharp">supervisor_account</span><router-link to="/personal" @click="limpiar">Instructores</router-link></li>
         <li><span class="material-icons-sharp">sports_score</span><router-link to="/planRutina" @click="limpiar">Planes</router-link></li>
         <li><span class="material-icons-sharp">list_alt</span><router-link to="/rutinaEjercicio" @click="limpiar">Rutinas</router-link></li>
         <li><span class="material-icons-sharp">fitness_center</span><router-link to="/ejercicio" @click="limpiar">Ejercicios</router-link></li>
         <li><span class="material-icons-sharp">add_chart</span><router-link to="/asistencia" @click="limpiar">Reporte</router-link></li>
       </ul>
     </div>

     <div class="espacio"></div>
     <div class="separador"></div>
     
     <div class="fondo">
       <ul>
         <li><span class="material-icons-sharp">settings</span><router-link to="/perfil">Configuración</router-link></li>
         <li><span class="material-icons-sharp">logout</span><a @click="logout">Cerrar sesión</a></li>
       </ul>
     </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'HomeView',
  computed: {
    ...mapState(['user']),
  },
  methods:{
    ...mapActions(['resetVisibleIn','resetVisibleOut','limpiarRetorno','limpiarRetorno2','limpiarRetorno3','limpiarDatoact1','limpiarDatoact2','limpiarDato7','limpiarDato6']),
    
    logout(){
        this.$store.dispatch('logout');
        this.$router.push('/login');
        this.resetVisibleIn();
        this.resetVisibleOut();
      },
      limpiar(){
        this.limpiarRetorno();
        this.limpiarRetorno2();
        this.limpiarRetorno3();
        this.limpiarDatoact1();
        this.limpiarDatoact2();
        this.limpiarDato6();
        this.limpiarDato7();
      },
  }
}
</script>