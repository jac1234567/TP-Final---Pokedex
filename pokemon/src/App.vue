<template>
  <div id="app">
    <header class="pokedex-header">
      <div class="header-content">
        <img alt="Poke logo" src="./assets/logo.png" class="pokedex-logo">
        <h1 class="pokedex-title">POKEDEX</h1>
        <nav class="pokedex-nav">
          <button @click="vista = 'listado'" class="btn-nav btn-yellow">Listado</button>
          <button @click="vista = 'equipo'" class="btn-nav btn-blue">Equipo</button>
        </nav>
      </div>
    </header>

    <main class="pokedex-body">
      <ListadoPokemon v-if="vista === 'listado'" />
      <EquipoPokemon v-if="vista === 'equipo'" />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ListadoPokemon from './components/ListadoPokemon.vue'
import EquipoPokemon from './components/EquipoPokemon.vue'

const vista = ref('listado')
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
}

.pokedex-header {
  background-color: #ce1211;
  padding: 15px 50px;
  border-bottom: 5px solid #8b0000;
  color: white;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}

.pokedex-logo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid white;
  background-color: white;
}

.pokedex-title {
  font-size: 2.5rem;
  letter-spacing: 2px;
  color: #ffcb05; 
  text-shadow: 2px 2px #3b4cca; 
  margin: 0;
}

.pokedex-nav {
  display: flex;
  gap: 15px;
}

.btn-nav {
  padding: 10px 25px;
  border-radius: 10px;
  border: 2px solid #222;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
}

.btn-yellow {
  background-color: #ffcb05;
  color: #3b4cca;
}

.btn-blue {
  background-color: #3b4cca;
  color: white;
}

.pokedex-body {
  padding: 20px;
}
</style>
