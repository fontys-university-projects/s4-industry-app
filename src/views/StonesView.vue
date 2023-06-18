<template>
    <div class="bg-white py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div
                 class="mx-auto grid max-w-2xl grid-cols-1 sm:grid-cols-2 md:mx-0 md:max-w-none md:grid-cols-3 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                <article v-for="(stone, index) in stones"
                         v-show="(index + 1) <= limit"
                         :key="stone.id"
                         class="flex flex-col items-start justify-between">
                    <div class="relative w-full">
                        <img v-if="stone.gender == 'female'"
                             src="/female-avatar.jpg"
                             alt=""
                             class="aspect-[9/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/2] lg:aspect-[3/3]" />
                        <img v-else
                             src="/male-avatar.jpg"
                             alt=""
                             class="aspect-[9/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/2] lg:aspect-[3/3]" />
                        <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div class="w-full">
                        <div class="group relative">
                            <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900">
                                {{ stone.name }}
                            </h3>
                            <p class="line-clamp-3 text-sm leading-6 text-gray-600">{{ stone.location.name + ", " +
                                stone.location.city.name }}</p>
                        </div>
                        <div class="relative mt-2 flex items-center gap-x-4">
                            <button type="button"
                                    @click="getStone(stone.id)"
                                    class="rounded-md bg-[#a4907c] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#c4b29d] w-full">View
                                Details</button>
                        </div>
                    </div>
                </article>
            </div>
            <h5 class="text-2xl md:text-3xl font-medium mt-3">{{ stone.name }} </h5>
            <p class="text-slate-500 text-lg mt-3"> {{ stone.address }}</p>
            <a @click="open = true"  href="#" class="text-center bg-brown text-color py-2 rounded-lg font-semibold mt-4 hover:bg-brown-light focus:scale-95 transition-all duration-200 ease-out">view details</a>
          </div>
        </div>
    </div>
    <TransitionRoot as="template"
                    :show="open">
        <Dialog as="div"
                class="relative z-10"
                @close="open = false">
            <TransitionChild as="template"
                             enter="ease-out duration-300"
                             enter-from="opacity-0"
                             enter-to="opacity-100"
                             leave="ease-in duration-200"
                             leave-from="opacity-100"
                             leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template"
                                     enter="ease-out duration-300"
                                     enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                     enter-to="opacity-100 translate-y-0 sm:scale-100"
                                     leave="ease-in duration-200"
                                     leave-from="opacity-100 translate-y-0 sm:scale-100"
                                     leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                                     class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
                            <div class="relative w-full">
                                <img v-if="stone.gender == 'female'"
                                     src="/female-avatar.jpg"
                                     alt=""
                                     class="aspect-[9/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/2] lg:aspect-[3/3]" />
                                <img v-else
                                     src="/male-avatar.jpg"
                                     alt=""
                                     class="aspect-[9/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/2] lg:aspect-[3/3]" />
                                <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                            </div>
                            <div class="w-full">
                                <div class="group relative">
                                    <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900">
                                        {{ stone.name }}
                                    </h3>
                                    <ul>
                                        <table class="table-auto divide-y divide-gray-300">
                                            <tbody class="divide-y divide-gray-300">
                                                <tr>
                                                    <td class="text-gray-900 font-medium">Address:</td>
                                                    <td class="text-gray-700">{{ stone.location.name }}</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-gray-900 font-medium">City:</td>
                                                    <td class="text-gray-700">{{ stone.location.city.name }}</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-gray-900 font-medium"
                                                        v-if="stone.date_of_birth">Date of Birth:</td>
                                                    <td class="text-gray-700"
                                                        v-if="stone.date_of_birth">{{ new
                                                            Date(stone.date_of_birth).toLocaleDateString('nl-NL') }}</td>
                                                    <td class="text-gray-900 font-medium"
                                                        v-if="!stone.date_of_birth">Year of Birth:</td>
                                                    <td class="text-gray-700"
                                                        v-if="!stone.date_of_birth">{{ stone.year_of_birth }}</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-gray-900 font-medium"
                                                        v-if="stone.date_of_passing">Date of Passing:</td>
                                                    <td class="text-gray-700"
                                                        v-if="stone.date_of_passing">{{ new
                                                            Date(stone.date_of_passing).toLocaleDateString('nl-NL') }}</td>
                                                    <td class="text-gray-900 font-medium"
                                                        v-if="!stone.date_of_passing">Year of Passing:</td>
                                                    <td class="text-gray-700"
                                                        v-if="!stone.date_of_passing">{{ stone.year_of_passing }}</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-gray-900 font-medium">Reason of Passing:</td>
                                                    <td class="text-gray-700">{{ stone.reason_of_passing }}</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-gray-900 font-medium">Network Oorlogsbronnen:</td>
                                                    <td class="text-gray-700"><a :href="stone.network_oorlogsbronnen"
                                                           target="_blank"
                                                           rel="noopener noreferrer"
                                                           class="text-[#a4907c] hover:text-[#c4b29d]">Link</a></td>
                                                </tr>
                                                <tr>
                                                    <td class="text-gray-900 font-medium">Additional Source:</td>
                                                    <td class="text-gray-700"><a :href="stone.additional_source"
                                                           target="_blank"
                                                           rel="noopener noreferrer"
                                                           class="text-[#a4907c] hover:text-[#c4b29d]">Link</a></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </ul>
                                </div>
                            </div>
                            <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                <button type="button"
                                        class="inline-flex w-full justify-center rounded-md bg-[#a4907c] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#c4b29d] sm:col-start-2"
                                        @click="open = false, saveStone(stone.id)">Save</button>
                                <button type="button"
                                        class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                        @click="open = false"
                                        ref="cancelButtonRef">Cancel</button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
  

<script>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CheckIcon } from '@heroicons/vue/24/outline'
import axios from "axios";
export default {
    data() {
        return {
            stones: null,
            stone: null,
            open: false,
            limit: 12
        }
    },
    components: {
        Dialog,
        DialogPanel,
        DialogTitle,
        TransitionChild,
        TransitionRoot,
        CheckIcon
    },
    methods: {
        async getStone(id) {
            await axios
                .get("https://industry-api.fhict-dev.com/items/stones/" + id + "?fields=*,location.name,location.city.name")
                .then((response) => (this.stone = response.data.data));
            this.open = true;
        },
        saveStone(id) {
            const myArray = JSON.parse(localStorage.getItem('saved')) || [];

            if (!myArray.includes(id)) {
                myArray.push(id);
                localStorage.setItem('saved', JSON.stringify(myArray));
            }

            if (!myArray.includes(id)) {
                myArray.push(id);
                localStorage.setItem('saved', JSON.stringify(myArray));
            }

        },
        removeStone(id) {
            const myArray = JSON.parse(localStorage.getItem('saved'))

            const index = myArray.indexOf(id);
            if (index > -1) {
                myArray.splice(index, 1);
            }

        }
    },
    async mounted() {
        axios
            .get("https://industry-api.fhict-dev.com/randomized/stones?limit=80&fields=*,location.name,location.city.name")
            .then((response) => (this.stones = response.data));
    },
}
</script>