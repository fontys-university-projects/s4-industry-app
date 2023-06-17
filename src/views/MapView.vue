<template>
  <div>
    <TransitionRoot as="template"
                    :show="sidebarOpen">
      <Dialog as="div"
              class="relative z-50 lg:hidden"
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
                <ul role="list"
                    class="divide-y divide-gray-100">
                  <li v-for="city in cities"
                      :key="city.id"
                      class="flex gap-x-4 py-1">
                    <img class="h-24 w-24 flex-none bg-gray-50 object-cover"
                         :src="'https://cdn.struikelstenengids.nl/images/city/' + city.image_old"
                         alt="" />
                    <div class="min-w-0">
                      <p class="text-sm font-semibold leading-6 text-gray-900">{{ city.name }}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col pt-[64px] pb-[130px]">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
        <div v-if="cities">
          <h1 class="text-lg font-semibold leading-6 text-gray-900">Cities</h1>
          <ul role="list"
              class="divide-y divide-gray-100">
            <li v-for="city in cities"
                :key="city.id"
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
          <ul role="list"
              class="divide-y divide-gray-100">
            <li v-for="street in streets"
                :key="street.id"
                class="flex gap-x-4 py-1">
              <img class="h-24 w-24 flex-none bg-gray-50 object-cover"
                   src="/official_stones.png"
                   alt="" />
              <div class="min-w-0">
                <p class="text-sm font-semibold leading-6 text-gray-900">{{ street.name }}</p>
              </div>
            </li>
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
</template>

<script>
import {
  Dialog,
  DialogPanel,
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
      sidebarOpen: false,
      cities: null,
      city: null,
      streets: null,
      userLocation: null,
    }
  },
  components: {
    Dialog,
    DialogPanel,
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
    handleMarkerCity(slug) {
      this.$router.push({
        path: "/map",
        query: {
          city: slug,
        },
      });
    },
    handleMarkerStreet(slug) {
      this.$router.push({
        path: "/map",
        query: {
          city: this.$route.query.city,
          street: slug,
        },
      });
    }
  },
  mounted() {
    if (!this.$route.query.city) {
      axios
        .get("https://industry-api.fhict-dev.com/items/cities?limit=1000")
        .then((response) => (this.cities = response.data.data));
    } else {
      axios
        .get("https://industry-api.fhict-dev.com/items/cities?filter[slug][_eq]=" + this.$route.query.city)
        .then((response) => (this.city = response.data.data[0]));

      axios
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