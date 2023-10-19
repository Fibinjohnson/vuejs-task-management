<template>
    <!-- Main navigation container -->
    <nav
      class="relative flex w-full flex-nowrap items-center justify-between bg-[#FBFBFB] py-2 text-neutral-500 shadow-sm hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:flex-wrap lg:justify-start lg:py-4"
      data-te-navbar-ref>
      <div class="flex w-full flex-wrap items-center justify-between px-3">
        <div class="ml-2">
          <router-link to="/" class="text-xl text-neutral-800 dark:text-neutral-200">
      Home 
    </router-link>
          
        </div>

   
        <button
          class="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
          type="button"
          data-te-collapse-init
          data-te-target="#navbarSupportedContent3"
          aria-controls="navbarSupportedContent3"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <!-- Hamburger icon -->
          <span class="[&>svg]:w-7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="h-7 w-7">
              <path
                fill-rule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clip-rule="evenodd" />
            </svg>
          </span>
        </button>
        <!-- Collapsible navbar container -->
        <div
          class="!visible mt-2 hidden flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto"
          id="navbarSupportedContent3"
          data-te-collapse-item>
          <!-- Left links -->
          <ul
            class="list-style-none mr-auto flex flex-col pl-0 lg:mt-1 lg:flex-row"
            data-te-navbar-nav-ref>
       
            <!-- Features link -->
            <li
              class="mb-4 pl-2 ml-4 lg:mb-0 lg:pl-0 lg:pr-1"
              data-te-nav-item-ref>
             
       
            </li>
            <!-- Pricing link -->
          </ul>
          
          <div class="flex justify-center mr-auto ml-30 ">{{ formattedDateTime }} </div>
          
      <div>
        <div class="relative">
          <!-- Dropdown toggle button -->
          <button
            @click="show = !show"
            class="flex items-center p-2 text-indigo-100 bg-gray-600 rounded-md"
          >
            <span class="mr-4">Admin</span>
            <svg
              class="w-5 h-5 text-indigo-100 dark:text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            
            >
              <path
                
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
    
          <!-- Dropdown menu -->
          <div
            v-show="show"
            class="
              absolute
              right-0
              py-2
              mt-2
              bg-gray-500
              rounded-md
              shadow-xl
              w-44
              bg-gray-500
              shadow
            "
          >
            <router-link
              to="/"
              @click="logout"
              class="
                block
                px-4
                py-2
                text-sm text-indigo-100
                hover:bg-gray-400 hover:text-indigo-100
                bg-gray-500
              "
            >
              Logout
            </router-link>
          </div>
        </div>
      </div>
        </div>
      </div>
    </nav>
    </template>
    
    <script setup>
    import { ref } from 'vue';
    
      const show=ref(false)
      function formatDateTime(date) {
      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const dayOfWeek = daysOfWeek[date.getDay()];
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = String(date.getFullYear()).slice(-2);
      return `${dayOfWeek} ${day}-${month}-${year}`;
    }
    
    const currentDate = new Date();
    const formattedDateTime = formatDateTime(currentDate);
   

    </script>
    
    <style>
    
    </style>