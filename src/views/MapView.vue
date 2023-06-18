<template>
  <div>
    <TransitionRoot as="template"
                    :show="sidebarOpen">
      <Dialog as="div"
              class="relative z-10 lg:hidden"
              @close="sidebarOpen = false">
        <TransitionChild as="template"
                         enter="transition-opacity ease-linear duration-300"
                         enter-from="opacity-0"
                         enter-to="opacity-100"
                         leave="transition-opacity ease-linear duration-300"
                         leave-from="opacity-100"
                         leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild as="template"
                           enter="transition ease-in-out duration-300 transform"
                           enter-from="-translate-x-full"
                           enter-to="translate-x-0"
                           leave="transition ease-in-out duration-300 transform"
                           leave-from="translate-x-0"
                           leave-to="-translate-x-full">
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild as="template"
                               enter="ease-in-out duration-300"
                               enter-from="opacity-0"
                               enter-to="opacity-100"
                               leave="ease-in-out duration-300"
                               leave-from="opacity-100"
                               leave-to="opacity-0">
                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button type="button"
                          class="-m-2.5 p-2.5"
                          @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white"
                               aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <!-- Sidebar component, swap this element with another sidebar if you like -->
              <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                <h1 class="text-lg font-semibold leading-6 text-gray-900 pt-4">Cities</h1>
                <div v-if="cities">
                  <h1 class="text-lg font-semibold leading-6 text-gray-900">Cities</h1>
                  <ul role="list"
                      class="divide-y divide-gray-100">
                    <button v-for="city in cities"
                            @click="handleMarkerCity(city.slug)">
                      <li :key="city.id"
                          class="flex gap-x-4 py-1">
                        <img class="h-24 w-24 flex-none bg-gray-50 object-cover"
                             :src="'https://cdn.struikelstenengids.nl/images/city/' + city.image_old"
                             v-if="city.image_old != null"
                             alt="" />
                        <img class="h-24 w-24 flex-none bg-gray-50 object-cover"
                             :src="'https://industry-api.fhict-dev.com/assets/' + city.image"
                             v-else-if="city.image != null"
                             alt="" />
                        <div class="min-w-0">
                          <p class="text-sm font-semibold leading-6 text-gray-900">{{ city.name }}</p>
                        </div>
                      </li>
                    </button>
                  </ul>
                </div>
                <div v-if="city">
                  <img class="aspect-[3/2] w-full rounded-2xl object-cover"
                       :src="'https://cdn.struikelstenengids.nl/images/city/' + city.image_old"
                       v-if="city.image_old != null"
                       alt="" />
                  <img class="aspect-[3/2] w-full rounded-2xl object-cover"
                       :src="'https://industry-api.fhict-dev.com/assets/' + city.image"
                       v-else-if="city.image != null"
                       alt="" />
                  <h3 class="mt-1 text-lg font-semibold leading-8 text-gray-900">{{ city.name }}</h3>
                  <p class="truncate"
                     v-for="language in city.translations"
                     v-show="language.languages_id == locale">{{ language.description }}</p>
                  <button type="button"
                          class="text-[#a4907c] hover:text-[#c4b29d]"
                          @click="more = true"
                          v-if="!more">read more..</button>
                  <button type="button"
                          class="text-[#a4907c] hover:text-[#c4b29d]"
                          @click="more = false"
                          v-if="more">read less..</button>
                  <ul role="list"
                      class="divide-y divide-gray-100">
                    <button v-for="street in streets"
                            :key="street.id"
                            @click="handleMarkerStreet(street.slug)">
                      <li class="flex gap-x-4 py-1">
                        <img class="h-24 w-24 flex-none bg-gray-50 object-cover"
                             v-if="street.city.official_stones == true"
                             src="/official_stones.png"
                             alt="" />
                        <img class="h-24 w-24 flex-none bg-gray-50 object-cover"
                             v-if="street.city.official_stones == false"
                             src="/unofficial_stones.png"
                             alt="" />
                        <div class="min-w-0">
                          <p class="text-left text-sm font-semibold leading-6 text-gray-900">{{ street.name }}</p>
                        </div>
                      </li>
                    </button>
                  </ul>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
    <Stone />
    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-2 lg:flex lg:w-72 lg:flex-col pt-[64px] pb-[130px]">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
        <div v-if="cities">
          <h1 class="text-lg font-semibold leading-6 text-gray-900">Cities</h1>
          <ul role="list"
              class="divide-y divide-gray-100">
            <button v-for="city in cities"
                    @click="handleMarkerCity(city.slug)">
              <li :key="city.id"
                  class="flex gap-x-4 py-1">
                <img class="h-24 w-24 flex-none bg-gray-50 object-cover"
                     :src="'https://cdn.struikelstenengids.nl/images/city/' + city.image_old"
                     v-if="city.image_old != null"
                     alt="" />
                <img class="h-24 w-24 flex-none bg-gray-50 object-cover"
                     :src="'https://industry-api.fhict-dev.com/assets/' + city.image"
                     v-else-if="city.image != null"
                     alt="" />
                <div class="min-w-0">
                  <p class="text-sm font-semibold leading-6 text-gray-900">{{ city.name }}</p>
                </div>
              </li>
            </button>
          </ul>
        </div>
        <div v-if="city">
          <img class="aspect-[3/2] w-full rounded-2xl object-cover"
               :src="'https://cdn.struikelstenengids.nl/images/city/' + city.image_old"
               v-if="city.image_old != null"
               alt="" />
          <img class="aspect-[3/2] w-full rounded-2xl object-cover"
               :src="'https://industry-api.fhict-dev.com/assets/' + city.image"
               v-else-if="city.image != null"
               alt="" />
          <h3 class="mt-1 text-lg font-semibold leading-8 text-gray-900">{{ city.name }}</h3>
          <p class="truncate"
             v-for="language in city.translations"
             v-show="language.languages_id == locale">{{ language.description }}</p>
          <button type="button"
                  class="text-[#a4907c] hover:text-[#c4b29d]"
                  @click="more = true"
                  v-if="!more">read more..</button>
          <button type="button"
                  class="text-[#a4907c] hover:text-[#c4b29d]"
                  @click="more = false"
                  v-if="more">read less..</button>
          <ul role="list"
              class="divide-y divide-gray-100">
            <button v-for="street in streets"
                    :key="street.id"
                    @click="handleMarkerStreet(street.slug)">
              <li class="flex gap-x-4 py-1">
                <img class="h-24 w-24 flex-none bg-gray-50 object-cover"
                     v-if="street.city.official_stones == true"
                     src="/official_stones.png"
                     alt="" />
                <img class="h-24 w-24 flex-none bg-gray-50 object-cover"
                     v-if="street.city.official_stones == false"
                     src="/unofficial_stones.png"
                     alt="" />
                <div class="min-w-0">
                  <p class="text-left text-sm font-semibold leading-6 text-gray-900">{{ street.name }}</p>
                </div>
              </li>
            </button>
          </ul>
        </div>
      </div>
    </div>

    <div class="lg:pl-72">
      <div class="top-0 z-40 lg:mx-auto lg:max-w-7xl lg:px-2">
        <div
             class="flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
          <button type="button"
                  class="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                  @click="sidebarOpen = true">
            <span class="sr-only">Open sidebar</span>
            <Bars3Icon class="h-6 w-6"
                       aria-hidden="true" />
          </button>

          <!-- Separator -->
          <div class="h-6 w-px bg-gray-200 lg:hidden"
               aria-hidden="true" />

          <!-- <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <form class="relative flex flex-1"
                  action="#"
                  method="GET">
              <label for="search-field"
                     class="sr-only">Search</label>
              <MagnifyingGlassIcon class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                                   aria-hidden="true" />
              <input id="search-field"
                     class="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                     placeholder="Search..."
                     type="search"
                     name="search" />
            </form>
          </div> -->
        </div>
      </div>

      <main class="-z-40">
        <div class="mx-auto max-w-7xl xl:min-w-full"
             v-if="cities">
          <!-- Your content -->
          <l-map class="min-h-[calc(100vh-(130px+60px+62px))]"
                 :zoom="map.zoom"
                 :center="map.center">
            <l-tile-layer :url="map.url"
                          :attribution="map.attribution"></l-tile-layer>
            <l-marker v-for="city in cities"
                      :lat-lng="[city.center.coordinates[1], city.center.coordinates[0]]"
                      :key="city.id"
                      @click="handleMarkerCity(city.slug)">
              <l-icon :icon-size="[32, 32]"
                      v-if="city.official_stones == true"
                      icon-url="/official_stones.png" />
              <l-icon :icon-size="[32, 32]"
                      v-if="city.official_stones == false"
                      icon-url="/unofficial_stones.png" />
            </l-marker>
          </l-map>
        </div>
        <div class="mx-auto max-w-7xl xl:min-w-full"
             v-if="city">
          <!-- Your content -->
          <l-map class="min-h-[calc(100vh-(130px+60px+62px))]"
                 :zoom="14.6"
                 ref="map"
                 :center="[city.center.coordinates[1], city.center.coordinates[0]]">
            <l-tile-layer :url="map.url"
                          :attribution="map.attribution"></l-tile-layer>
            <l-marker v-for="street in streets"
                      :lat-lng="[street.position.coordinates[1], street.position.coordinates[0]]"
                      :key="street.id"
                      @click="handleMarkerStreet(street.slug)">
              <l-icon :icon-size="[32, 32]"
                      v-if="street.city.official_stones == true"
                      icon-url="/official_stones.png" />
              <l-icon :icon-size="[32, 32]"
                      v-if="street.city.official_stones == false"
                      icon-url="/unofficial_stones.png" />
            </l-marker>
            <l-marker :lat-lng="userLocation">
              <l-icon :icon-size="[32, 32]"
                      icon-url="/user-location.png" />
            </l-marker>
          </l-map>
        </div>
      </main>
    </div>
  </div>

  <TransitionRoot as="template"
                  :show="more">
    <Dialog as="div"
            class="relative z-10"
            @close="more = false">
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
                         class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full md:max-w-3xl md:m-6 sm:p-6">
              <div>
                <img class="aspect-[3/2] w-full rounded-2xl object-cover"
                     :src="'https://cdn.struikelstenengids.nl/images/city/' + city.image_old"
                     v-if="city.image_old != null"
                     alt="" />
                <img class="aspect-[3/2] w-full rounded-2xl object-cover"
                     :src="'https://industry-api.fhict-dev.com/assets/' + city.image"
                     v-else-if="city.image != null"
                     alt="" />
                <h3 class="mt-1 text-xl font-semibold leading-8 text-gray-900">{{ city.name }}</h3>
                <p :class="prose"
                   v-for="language in city.translations"
                   v-show="language.languages_id == locale"
                   v-html="urlify(language.description)"></p>
              </div>
              <div class="mt-5 sm:mt-6">
                <button type="button"
                        class="inline-flex w-full justify-center rounded-md bg-[#a4907c] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#c4b29d]"
                        @click="more = false">Close</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <TransitionRoot as="template"
                  :show="stoneModal">
    <Dialog as="div"
            class="relative z-10"
            @close="stoneModal = false">
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
                         class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full md:max-w-3xl md:m-6 sm:p-6">
              <div>
                <img class="aspect-[3/2] w-full rounded-2xl object-cover"
                     :src="'https://cdn.struikelstenengids.nl/images/city/' + city.image_old"
                     v-if="city.image_old != null"
                     alt="" />
                <img class="aspect-[3/2] w-full rounded-2xl object-cover"
                     :src="'https://industry-api.fhict-dev.com/assets/' + city.image"
                     v-else-if="city.image != null"
                     alt="" />
                <h3 class="mt-1 text-xl font-semibold leading-8 text-gray-900">{{ street.name }}</h3>
                <p :class="prose"
                   v-for="language in street.translations"
                   v-show="language.languages_code == locale"
                   v-html="urlify(language.description)"></p>
                <div
                     class="mx-auto grid max-w-2xl grid-cols-1 sm:grid-cols-2 md:mx-0 md:max-w-none md:grid-cols-3 gap-x-8 gap-y-20">
                  <article v-for="stone in stones"
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
              </div>
              <div class="mt-5 sm:mt-6">
                <button type="button"
                        class="inline-flex w-full justify-center rounded-md bg-[#a4907c] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#c4b29d]"
                        @click="stoneModal = false">Close</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <TransitionRoot as="template"
                  :show="open">
    <Dialog as="div"
            class="relative z-10"
            @close="open = false, stoneModal = true">
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
                        @click="open = false, stoneModal = true, saveStone(stone.id)">Save</button>
                <button type="button"
                        class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                        @click="open = false, stoneModal = true"
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
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import L from 'leaflet';
import { LMap, LTileLayer, LMarker, LIcon, LControl } from '@vue-leaflet/vue-leaflet'
import axios from "axios";

export default {
  data() {
    const map = {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 7.9,
      center: [51.504, 4.887],
    }
    return {
      map,
      locale: localStorage.getItem("language"),
      sidebarOpen: false,
      more: false,
      stoneModal: false,
      open: false,
      cities: null,
      city: null,
      streets: null,
      street: null,
      stones: null,
      stone: null,
      userLocation: null,
    }
  },
  components: {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    Bars3Icon,
    XMarkIcon,
    MagnifyingGlassIcon,
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
  },
  methods: {
    urlify(text) {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      return text.replace(urlRegex, '<a target="_blank" href="$1" class="text-[#a4907c] hover:text-[#c4b29d]">$1</a>');
    },
    async handleMarkerCity(slug) {
      this.$router.push({
        path: "/map",
        query: {
          city: slug,
        },
      })
      await axios
        .get("https://industry-api.fhict-dev.com/items/cities?filter[slug][_eq]=" + slug + "&fields=*,translations.languages_id,translations.description")
        .then((response) => (this.city = response.data.data[0]))
      await axios
        .get("https://industry-api.fhict-dev.com/items/streets?filter[city][slug][_eq]=" + slug + "&fields=id,name,slug,city.official_stones,position,images,old_images.image_id")
        .then((response) => (this.streets = response.data.data));
      setTimeout(() => {
      }, 10);
      this.cities = null;
    },
    async handleMarkerStreet(slug) {
      await axios
        .get("https://industry-api.fhict-dev.com/items/streets?filter[slug][_eq]=" + slug + "&fields=*,translations.languages_code,translations.description")
        .then((response) => (this.street = response.data.data[0]))
      await axios
        .get("https://industry-api.fhict-dev.com/items/stones?filter[location][slug][_eq]=" + slug)
        .then((response) => (this.stones = response.data.data));
      setTimeout(() => {
      }, 10);
      this.stoneModal = true;
    },
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
  },
  async mounted() {
    if (!this.$route.query.city) {
      await axios
        .get("https://industry-api.fhict-dev.com/items/cities?limit=1000")
        .then((response) => (this.cities = response.data.data));
    } else {
      await axios
        .get("https://industry-api.fhict-dev.com/items/cities?filter[slug][_eq]=" + this.$route.query.city + "&fields=*,translations.languages_id,translations.description")
        .then((response) => (this.city = response.data.data[0]));

      await axios
        .get("https://industry-api.fhict-dev.com/items/streets?filter[city][slug][_eq]=" + this.$route.query.city + "&fields=id,name,slug,city.official_stones,position,images,old_images.image_id")
        .then((response) => (this.streets = response.data.data));
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userLocation = [position.coords.latitude, position.coords.longitude];
      });
    }
  },
}
</script>

<style>
.leaflet-zoom-box {
  z-index: 9;
}

.leaflet-control-container {
  z-index: 9;
}

.leaflet-top {
  z-index: 9;
}

.leaflet-pane {
  z-index: 1;
}

.leaflet-tile-pane {
  z-index: 2;
}

.leaflet-overlay-pane {
  z-index: 1;
}

.leaflet-shadow-pane {
  z-index: 5;
}

.leaflet-marker-pane {
  z-index: 6;
}

.leaflet-tooltip-pane {
  z-index: 7;
}

.leaflet-popup-pane {
  z-index: 8;
}

.leaflet-map-pane canvas {
  z-index: 1;
}

.leaflet-map-pane svg {
  z-index: 2;
}

.leaflet-control {
  z-index: 9;
}

.leaflet-bottom {
  z-index: 10;
}
</style>