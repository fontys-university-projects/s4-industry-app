<template>

    <div class="flex items-center justify-center min-h-screen container max-auto">
      <!-- grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-center grid">
        <!-- card -->
        <div class="card" v-for="stone in stones" :key="stone.name">
          <div class="p-5 flex flex-col">
            <div class="rounded-xl overflow-hidden">
              <img :src="stone.image" alt=""/>
            </div>
            <h5 class="text-2xl md:text-3xl font-medium mt-3">{{ stone.name }} </h5>
            <p class="text-slate-500 text-lg mt-3"> {{ stone.address }}</p>
            <a @click="open = true"  href="#" class="text-center bg-brown text-color py-2 rounded-lg font-semibold mt-4 hover:bg-brown-light focus:scale-95 transition-all duration-200 ease-out">view details</a>
          </div>
        </div>
        <!-- end card -->
      </div>
    </div>
    
    <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="popup flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div class="card" v-for="stone in viewDetailStones" :key="stone.name">
                <div class="info p-5 flex flex-col">
  <div class="image rounded-xl overflow-hidden">
    <img :src="stone.image" alt=""/>
  </div>
  <h5 class="text-2xl md:text-3xl font-medium mt-3">{{ stone.name }}</h5>
  <p class="text-slate-500 text-lg mt-3 font-semibold"><span>Address:</span> {{ stone.address }}</p>
  <p class="text-slate-500 text-lg mt-3 font-semibold"><span>Date of Birth:</span> {{ stone.dateOfBirth }}</p>
  <p class="text-slate-500 text-lg mt-3 font-semibold"><span>Date of Passing:</span> {{ stone.dateOfPassing }}</p>
  <p class="text-slate-500 text-lg mt-3 font-semibold"><span>Reason of Passing:</span> {{ stone.reasonOfPassing }}</p>
  <a @click="redirectToStonesView" href="#" class="text-center bg-brown text-color py-2 rounded-lg font-semibold mt-4 hover:bg-brown-light focus:scale-95 transition-all duration-200 ease-out">Close</a>
</div>

        </div>
              
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  </template>
  
  
  
  <script setup>

const redirectToStonesView = () => {
    window.location.href = '/stones';
  };
  const stones = [
    {
      name: 'Alexander',
      address: '1234 Main St, San Francisco, CA 94123',
      link:"",
      image:
        'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
    },
    {
      name: 'Alexander',
      address: '1234 Main St, San Francisco, CA 94123',
      link:"",
      image:
        'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
    },
    {
      name: 'Alexander',
      address: '1234 Main St, San Francisco, CA 94123',
      link:"",
      image:
        'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
    },

  ]
  const viewDetailStones = [
    {
      name: 'Alexander',
      address: '1234 Main St, San Francisco, CA 94123',
      dateOfBirth: '1jan',
      dateOfPassing: '4jan',
      reasonOfPassing:'lived',
      link:"",
      image:
        'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
    },
  ]

  import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CheckIcon } from '@heroicons/vue/24/outline'


const open = ref(false)
  </script>


<style>
.bg-brown{
  background-color: rgb(164, 144, 124);
}
.text-color{
  background-color: rgb(200, 182, 166);
}
.hover\:bg-brown-light:hover {
  background-color: rgba(241, 222, 201, 1);
}
span{
  color: black;
}
.grid {
  width: 60%;
  display: grid;
  height: fit-content;
}
.items-center {
    align-items: flex-start;
  }
  
  .justify-center {
    justify-content: flex-start;
  }
  .popup{
    justify-content: center;
    text-align: center;
  }
  .image{
    height: 35rem;
  }
</style>