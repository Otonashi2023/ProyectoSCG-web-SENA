<template>
    <div class="busqueda">
        <span class="material-icons-sharp">search</span>
        <input type="text" placeholder="Buscar..." v-model="query" @input="handleSearch" ref="myInput">
    </div>
    <div class="perfil">
        <font-awesome-icon icon="eye" id="editar" @click="abrirScan"/>
        <span v-show="scan"><ScannerQR @cerrarScan="cerrarScan"/></span>

        <img src="@/assets/Foto1.jpeg" alt="Imagen perfil">
        <div style="display:grid; text-align: right">
            <span id="usuario">{{ nombre }} {{ apellido }}</span>
            <span id="rol">{{ rol }}</span> 
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import ScannerQR from './utils/ScannerQR.vue';

export default{
    name:'EncabezadoPrincipal',
    components:{
        ScannerQR,
    },
    data(){
        return{
            query:"",
            nombre: '',
            apellido: '',
            rol: '',
            scan:false,
        }
    },
    computed:{
        ...mapState('usuario',['usuario','usuarios']),
    },
    
    methods:{
        ...mapActions('usuario',['consultarUsuario','consultarAllUsuarios','limpiarUsuario']),

        async datosPerfil(){
            this.limpiarUsuario();
            const username = localStorage.getItem('username').trim();
            const password = localStorage.getItem('password').trim();
            await this.consultarAllUsuarios();
            console.log('USUARIOS:', this.usuarios);
            await this.$nextTick();

            if(Array.isArray(this.usuarios)){
                const foundUser = this.usuarios.find(user =>
                user.username.trim() === username &&
                user.password.trim() === password);
                console.log('FOUNDUSER: ', foundUser);
        
                if (foundUser) {
                    const idUsuario = foundUser.codigo;
                    console.log('hay dato?:', idUsuario);
                    await this.consultarUsuario(idUsuario);
                    await this.$nextTick();

                    this.nombre = this.usuario.personal?.persona.nombres.split(' ')[0];
                    this.apellido = this.usuario.personal?.persona.apellidos.split(' ')[0];
                    this.rol = this.usuario.personal?.cargo.nombre;
                    console.log('Usuario ; ',this.nombre,' rol: ',this.rol);
                } else {
                    console.error('Usuario no encontrado.');
                    alert(`Lo sentimos el servidor esta caido
intentelo mas tarde.`)
                }
            } else {
                console.error('usuarios no es un array.');
            }
        },

        handleSearch() {
        if (this.query === 'nombre ejercicio') {
            this.$router.push(this.$route.query.redirect || '/nombreEjercicio');
            this.query="";
        }
        else if (this.query === 'tipo ejercicio') { 
            this.$router.push(this.$route.query.redirect || '/tipoEjercicio');
            this.query="";         
        }
        else if (this.query === 'musculo') {
            this.$router.push(this.$route.query.redirect || '/musculo');
            this.query="";
        }
        else if (this.query === 'tipo rutina') {
            this.$router.push(this.$route.query.redirect || '/tipoRutina');
            this.query="";      
        }
        else if (this.query === 'cargo') {
            this.$router.push(this.$route.query.redirect || '/cargo');
            this.query="";
        }
        else if (this.query === 'tipo documento') {
            this.$router.push(this.$route.query.redirect || '/tipoDocumento');
            this.query="";
        }
        else if (this.query === 'genero') {
            this.$router.push(this.$route.query.redirect || '/genero');
            this.query="";
        }
        else if (this.query === 'formacion') {
            this.$router.push(this.$route.query.redirect || '/formacion');
            this.query="";
        }
        else if (this.query === 'ejercicio') {
            this.$router.push(this.$route.query.redirect || '/ejercicio');
            this.query="";
        }
        else if (this.query === 'rutina') {
            this.$router.push(this.$route.query.redirect || '/rutina');
            this.query="";
        }
        else if (this.query === 'rutiejercicio') {
            this.$router.push(this.$route.query.redirect || '/rutinaEjercicio');
            this.query="";
        }
        else {
            this.$router.push(this.$route.query.redirect || '/');
        }   
      },
      focusInput(){
        this.$refs.myInput.focus();
      },
      abrirScan(){
        this.scan = true;
      },
      cerrarScan(value){
        this.scan = value;
      },
    },
    mounted(){
        this.focusInput();
        this.datosPerfil();
    }
}
</script>