<template>
    <div class="busqueda">
        <span class="material-icons-sharp">search</span>
        <input style="border-right: solid 1px #D5D5D5;border-radius: 0; " type="text" placeholder="Buscar..." v-model="searchQuery" @keyup.enter="iniciarBusqueda" ref="myInput">
        <p id="resetQuery" :style="estiloTexto" @click="limpiarBusqueda">Reset</p>
    </div>
    <div class="perfil">
        <font-awesome-icon icon="eye" id="editar" @click="abrirScan"/>
        <span v-show="scan"><ScannerQR @cerrarScan="cerrarScan"/></span>

        <img :src="imagePreview" alt="Imagen perfil" style="border-radius: 50%;">
        <div style="display:grid; text-align: left;">
            <span id="usuario">{{ nombre }} {{ apellido }}</span>
            <span id="rol">{{ rol }}</span> 
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import ScannerQR from './utils/ScannerQR.vue';

export default{
    components:{
        ScannerQR,
    },
    data(){
        return{
            searchQuery:"",
            nombre: '',
            apellido: '',
            rol: '',
            scan:false,
            imagePreview: require('@/assets/foto150.png'),
        }
    },
    computed:{
        ...mapState('usuario',['usuario','usuarios']),
        ...mapState(['user','searchQuery']),
        ...mapGetters(['getSearchQuery']),

        estiloTexto() {
            return {
                color: this.getSearchQuery === '' ? 'green' : 'red'
            };
        },
    },
    watch: {
        getSearchQuery(newVal) {
            if (newVal === '') {
                this.searchQuery = '';
            }
        }
    },
    
    methods:{
        ...mapMutations(['setSearchQuery','clearSearchQuery']),
        ...mapActions('usuario',['consultarUsuario','consultarAllUsuarios','limpiarUsuario']),

        urlImagen(){
            const baseUrl = 'http://localhost:8080';
            this.imagePreview = this.usuario?.personal?.persona?.foto
            ? `${baseUrl}${this.usuario?.personal?.persona?.foto}`
            : require('@/assets/foto150.png');
        },

        async datosPerfil(){
            this.limpiarUsuario();
            await this.consultarAllUsuarios();
            await this.$nextTick();

            if(Array.isArray(this.usuarios)){
                const foundUser = this.usuarios.find(user =>
                user.username === this.user.username);
        
                if (foundUser) {
                    const idUsuario = foundUser.codigo;
                    await this.consultarUsuario(idUsuario);
                    await this.$nextTick();

                    this.urlImagen();

                    this.nombre = this.usuario.personal?.persona.nombres.split(' ')[0];
                    this.apellido = this.usuario.personal?.persona.apellidos.split(' ')[0];
                    this.rol = this.usuario.personal?.cargo.nombre;
                } else {
                    console.error('Usuario no encontrado.');
                    alert(`Lo sentimos el servidor esta caido
intentelo mas tarde.`)
                }
            } else {
                console.error('usuarios no es un array.');
            }
        },
        iniciarBusqueda(){
            this.setSearchQuery(this.searchQuery.toLowerCase());
        },
        limpiarBusqueda(){
            this.clearSearchQuery();
            this.searchQuery = "";
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