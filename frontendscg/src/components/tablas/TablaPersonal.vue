<template>
    <!--Tabla que lista todos los registros de la entidad-->
  <div class="container2">
    <h1>lista funcionarios</h1>
    <div id="scroll">
      <table>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>#Identificación</th>
            <th>cargo</th>
            <th>Telefono</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Ver</th>
            <th id="rigth">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr id="fila2" v-for="(item, index) in usuarios" :key="index" @click="() => {callMetodoP(item.personal.codigo); consultar(item.codigo);}">
            <td>pendiente</td>
            <td>{{ item.personal.persona.nombres}}</td>
            <td>{{ item.personal.persona.apellidos }}</td>
            <td>{{ item.personal.persona.cedula }}</td>
            <td>{{ item.personal.cargo.nombre }}</td>
            <td>{{ item.personal.persona.celular }}</td>
            <td>{{ item.personal.persona.correo }}</td>
            <td>{{ item.personal.cargo.nombre }}</td>
            <td style="color: blueviolet; font-weight: 700;width:80px" @click.stop="abrirModal(item.codigo)">ver perfil</td>
            <td id="alibutton" style="width:120px;">
                <font-awesome-icon icon="edit" id="editar" @click="actualizar($event, item.codigo)"/>
                <font-awesome-icon icon="trash" id="eliminar" @click="eliminar($event, item.personal?.persona?.codigo)"/>
            </td>            
          </tr>      
        </tbody>
    </table>
    </div>      
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default{
    computed:{
      ...mapState('personal',['personal']),
      ...mapState('usuario',['usuarios']),
      ...mapState(['retorno2','retorno3']),
    },
    methods:{
      ...mapActions('persona',['eliminarPersona']),
      ...mapActions('personal',['consultarPersonal']),
      ...mapActions('usuario',['consultarAllUsuarios']),

      async eliminar(event, value){
        event.stopPropagation();
        await this.eliminarPersona(value);
        this.consultarAllUsuarios();
      },

      actualizar(event, value){
        event.stopPropagation();
        this.$emit('change',value);
      },

      consultar(value){
        this.$emit('ById', value);
      },

      async callMetodoP(value){
        if(this.retorno3 == 'retorno'){
          await this.consultarPersonal(value);
          await this.$nextTick();
          this.$router.push('fichaAntropometrica');
        }
      },
      formulario(){
        console.log('aqui en tabla personal', this.retorno2);
        if(this.retorno2=='retorno'){
          this.$emit('goForm');
        }
      },
      async abrirModal(value){
        await this.consultarPersonal(value);
        const modal =true;
        this.$emit('verModal', modal);
      },
    },
    mounted(){
        this.consultarAllUsuarios();
        this.formulario();
    }
}

</script>