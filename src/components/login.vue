<template>
<v-container mb-4 >
    <v-alert v-model="alert"
        :color="color" 
        :elevation="2"
        :timeout="3000"
        border="left"
        :type="type"
        @click="alert = false">
        {{ text }}
       </v-alert>
        <v-card pa-2>
            <v-container  grid-list-md style="margin-top:10%" >
                <v-layout row wrap >
                    <v-flex md4 class="text-center lg5" style="margin-left:5%">
                       <v-responsive>
                        <v-img src="https://i1.wp.com/wahlnetwork.com/wp-content/uploads/2014/12/spongebob-burger-car-cropped.jpg?fit=521%2C433" ></v-img>
                      </v-responsive>
                    </v-flex >
                    <v-flex md4 class="text-center lg5" style="margin-left:7%">
                      <v-icon size="90" color="blue accent-3">mdi-account</v-icon>
                        <h1 style="margin-top:-2%">LOG IN PAGE</h1>
                        <v-text-field placeholder="Username" v-model="user.username"></v-text-field>
                        <v-text-field placeholder="Password" type="password" v-model="user.password"></v-text-field>
                        <v-btn depressed dark rounded style="text-transform: none !important;" color="blue accent-3" @click="sendData()">
                            LOG IN
                        </v-btn>
                        <br>
                        <v-card-text>Don't have an account?</v-card-text>
                        <v-btn elevation="0" to="/signup" >SIGN UP</v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-container>
</template>
<script>
import VueSession from 'vue-session'
import { delay } from 'q';
export default {
  data() {
         return {
             load: false,
             user: {
                 username: '',
                 password:''
             },
             users: new FormData,
             errors: '',
             updatedId: '',
             text: '',
             color: null,
             load: false,
             type: null,
             alert: false,
         }
     },
     methods: {
        //  getData() {
        //      var uri = this.$apiUrl + '/login'
        //      this.$http.get(uri).then(response => {
        //          this.login = response.data.message
        //      })
        //  },
         sendData() {
              this.users.append('username', this.user.username);
              this.users.append('password', this.user.password);
             
              var uri = this.$apiUrl + '/login'
              this.load = true
              this.$http.post(uri, this.users).then(response => {
                  if(response.data.error == true ){
                      console.log(response.data.error);
                      this.alert = true; //mengaktifkan snackbar
                      this.color = 'red';
                      this.type = 'error' //memberi warna snackbar
                      this.text = response.data.message; //memasukkan pesan ke snackbar
                      this.load = false;
                      
                  }
                  else{
                      console.log(response.data.error);
                      this.alert = true; //mengaktifkan snackbar
                      this.color = 'green'; //memberi warna snackbar
                      this.text = 'SUCCESS';
                      this.type = 'success' //memasukkan pesan ke snackbar
                      this.load = false;
                      this.$session.start();
                      this.$session.set( 'username', this.user.username);
                      console.log(this.user.username);
                      this.$router.push('/mobil');
                      
                      
                  }
              }).catch(error => {
                  console.log(error);
                  this.errors = error
                  this.alert = true;
                  this.text = 'Something Went Wrong';
                  this.color = 'red';
                  this.load = false;
                  this.type = 'error'
              })
         },
         
        //  updateData() {
        //      this.mobils.append('nama', this.form.nama);
        //      this.mobils.append('merk', this.form.merk);
        //      this.mobils.append('am', this.form.am);
        //      this.mobils.append('harga', this.form.harga);
        //      var uri = this.$apiUrl + '/mobil/' + this.updatedId;
        //      this.load = true
        //      this.$http.post(uri, this.mobils).then(response => {
        //          this.snackbar = true; //mengaktifkan snackbar
        //          this.color = 'green'; //memberi warna snackbar
        //          this.text = response.data.message; //memasukkan pesan ke snackbar
        //          this.load = false;
        //          this.dialog = false
        //          this.getData(); //mengambil data user
        //          this.resetForm();
        //          this.typeInput = 'new';
        //      }).catch(error => {
        //          this.errors = error
        //          this.snackbar = true;
        //          this.text = 'Try Again';
        //          this.color = 'red';
        //          this.load = false;
        //          this.typeInput = 'new';
        //      })
        //  },
        //  editHandler(item) {
        //      this.typeInput = 'edit';
        //      this.dialog = true;
        //      this.form.nama = item.nama;
        //      this.form.merk = item.merk;
        //      this.form.am = item.am;
        //      this.form.harga= item.harga,
        //          this.updatedId = item.id
        //  },
        //  deleteData(deleteId) { //mengahapus data
        //      var uri = this.$apiUrl +
        //          '/mobil/' + deleteId; //data dihapus berdasarkan id
        //      this.$http.delete(uri).then(response => {
        //          this.snackbar = true;
        //          this.text = response.data.message;
        //          this.color = 'green'
        //          this.deleteDialog = false;
        //          this.getData();
        //      }).catch(error => {
        //          this.errors = error
        //          this.snackbar = true;
        //          this.text = 'Try Again';
        //          this.color = 'red';
        //      })
        //  },
        //  setForm() {
        //      if (this.typeInput === 'new') {
        //          this.sendData()
        //      } else {
        //          console.log("dddd")
        //          this.updateData()
        //      }
        //  },
        //  resetForm() {
        //      this.form = {
        //          nama: '',
        //          merk: '',
        //          am: '',
        //          harga:''
        //      }
        //  }
     },
     mounted() {
     //    this.getData();
     },
    computed: {
    // filteredList() {
    //   return this.postList.filter(mobil => {
    //     return mobil.nama.toLowerCase().includes(this.search.toLowerCase())
    //   })
    // }
}
 }
</script>