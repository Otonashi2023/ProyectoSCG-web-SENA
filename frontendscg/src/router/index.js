import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '@/views/IniciarSesion/LoginView.vue';
import HomeView from '@/views/HomeView.vue';
import store from '@/store';
import RecuperarPassView from '@/views/IniciarSesion/RecuperarPassView';
import SolicitudEnviadaView from '@/views/IniciarSesion/SolicitudEnviadaView.vue';
import ResetearPassView from '@/views/IniciarSesion/ResetearPassView.vue';
import NombreEjercicioView from '@/views/PlanEntrenamiento/NombreEjercicioView.vue';
import TipoEjercicioView from '@/views/PlanEntrenamiento/TipoEjercicioView.vue';
import MusculoView from '@/views/PlanEntrenamiento/MusculoView.vue';
import TipoRutinaView from '@/views/PlanEntrenamiento/TipoRutinaView.vue';
import CargoView from '@/views/Personal/CargoView.vue';
import TipoDocumentoView from '@/views/Persona/TipoDocumentoView';
import GeneroView from '@/views/FichaAntropometrica/GeneroView.vue';
import FormacionView from '@/views/Aprendiz/FormacionView.vue';
import EjercicioView from '@/views/PlanEntrenamiento/EjercicioView.vue'
import RutinaView from '@/views/PlanEntrenamiento/RutinaView.vue'
import RutinaEjercicioView from '@/views/PlanEntrenamiento/RutinaEjercicioView.vue';
import TipoPlanView from '@/views/PlanEntrenamiento/TipoPlanView.vue';
import PlanView from '@/views/PlanEntrenamiento/PlanView.vue';
import PlanRutinaView from '@/views/PlanEntrenamiento/PlanRutinaView.vue';
import FichaView from '@/views/Aprendiz/FichaView.vue';
import AprendizView from '@/views/Aprendiz/AprendizView.vue';
import FichaAntropometricaView from '@/views/FichaAntropometrica/FichaAntropometricaView.vue';
import BorradorView from '@/views/BorradorView.vue';
import AprendizPlanView from '@/views/PlanEntrenamiento/AprendizPlanView.vue';
import PersonalView from '@/views/Personal/PersonalView.vue';
import AsistenciaView from '@/views/Aprendiz/AsistenciaView.vue';
import PerfilView from '@/views/PerfilView.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/recuperarPass',
    name: 'recuperarPass',
    component: RecuperarPassView,
  },
  {
    path: '/solicitudEnviada',
    name: 'solicitudEnviada',
    component: SolicitudEnviadaView,
  },
  {
    path: '/resetearPass',
    name: 'resetearPass',
    component: ResetearPassView,
  },
  {
    path: '/nombreEjercicio',
    name: 'nombreEjercicio',
    component: NombreEjercicioView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/tipoEjercicio',
    name: 'tipoEjercicio',
    component: TipoEjercicioView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/musculo',
    name: 'musculo',
    component: MusculoView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/tipoRutina',
    name: 'tipoRutina',
    component: TipoRutinaView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/cargo',
    name: 'cargo',
    component: CargoView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/tipoDocumento',
    name: 'tipoDocumento',
    component: TipoDocumentoView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/genero',
    name: 'genero',
    component: GeneroView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/formacion',
    name: 'formacion',
    component: FormacionView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/ejercicio',
    name: 'ejercicio',
    component: EjercicioView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/rutina',
    name: 'rutina',
    component: RutinaView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/rutinaEjercicio',
    name: 'rutinaEjercicio',
    component: RutinaEjercicioView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/tipoPlan',
    name: 'tipoPlan',
    component: TipoPlanView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/plan',
    name: 'plan',
    component: PlanView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/planRutina',
    name: 'planRutina',
    component: PlanRutinaView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/ficha',
    name: 'ficha',
    component: FichaView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/aprendiz',
    name: 'aprendiz',
    component: AprendizView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/fichaAntropometrica',
    name: 'fichaAntropometrica',
    component: FichaAntropometricaView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/borrador',
    name: 'borrador',
    component: BorradorView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/aprendizPlan',
    name: 'aprendizPlan',
    component: AprendizPlanView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/personal',
    name: 'personal',
    component: PersonalView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/asistencia',
    name: 'asistencia',
    component: AsistenciaView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: PerfilView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      requiresAuth: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
