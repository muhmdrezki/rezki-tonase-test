<template>
  <div class="container mt-2">
    <h2 class="font-weight-light"> Find your zodiak </h2>
    <hr>
    <div class="row">
      <div class="col-lg-4 col-md-4 col-sm-12 col-12">
        <div class="form-group">
          <label for="name"> Your Name </label>
          <input type="text" id="name" v-model="form_data.name" class="form-control">
        </div>
        <div class="form-group">
          <label for="date"> Birth Date </label>
          <input type="date" id="date" v-model="form_data.birth_date" class="form-control">
        </div>
        <button class="btn btn-primary" @click="findMyZodiak()"> Submit </button>
      </div>
      <div class="col-lg-8 col-md-8 col-sm-12 col-12">
        <div class="text-center mt-3" v-if="results_load">
          <h5> Fetching Data </h5>
          <div class="spinner-border" role="status"></div>
        </div>
        <div class="text-center mt-3" v-if="image_load">
          <h5> Fetching Image </h5>
          <div class="spinner-border" role="status"></div>
        </div>
        <div class="text-center" v-if="this.results && this.image_results">
          <div class="text-center"> 
            <img :src="this.image" style="width: 200px;" class="mb-2 mt-2">
          </div>
          <table class="table table-sm table-bordered">
            <tr>
              <td width="15%" class="text-left"> Nama </td>
              <td class="text-left"> {{ this.results.nama }} </td>
            </tr>
            <tr>
              <td width="15%" class="text-left"> Tanggal Lahir </td>
              <td class="text-left"> {{ this.results.lahir }} </td>
            </tr>
            <tr>
              <td width="15%" class="text-left"> Usia </td>
              <td class="text-left"> {{ this.results.usia }} </td>
            </tr>
            <tr>
              <td width="15%" class="text-left"> Ultah </td>
              <td class="text-left"> {{ this.results.ultah }} </td>
            </tr>
            <tr>
              <td width="15%" class="text-left"> Zodiak </td>
              <td class="text-left"> {{ this.results.zodiak }} </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import moment from 'moment';

export default {
  data() {
    return {
      form_data: {
        name: '',
        birth_date: '' 
      },
      results_load: false,
      results : '',
      image_load: false,
      image_results: [],
      image: ''
    }
  },
  mounted() {

  },
  methods: {
    findMyZodiak() {
      this.results_load = true;
      let date_formated = moment(this.form_data.birth_date).format('DD-MM-YYYY');
      axios.get('https://script.google.com/macros/exec?service=AKfycbw7gKzP-WYV2F5mc9RaR7yE3Ve1yN91Tjs91hp_jHSE02dSv9w&nama='+ this.form_data.name +'&tanggal='+date_formated)
      .then(res => {
        if(res.data.status == 'success') {
          this.results = res.data.data;
          this.results_load = false;
          this.findMyZodiakImage();
        }
      }).catch(err => {
        console.log(err);
      })
    },
    findMyZodiakImage() {
      this.image_load = true;
      let API_KEY = process.env.API_KEY;
      axios.get('https://app.zenserp.com/api/v2/search?apikey='+ API_KEY +'&q='+ this.results.zodiak +'&tbm=isch&device=desktop&location=Jakarta, Indonesia')
      .then(res => {
        if(res.data) {
          this.image_results = res.data.image_results;
          this.image = this.image_results[0].sourceUrl 
          this.image_load = false;
        }
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style>

</style>