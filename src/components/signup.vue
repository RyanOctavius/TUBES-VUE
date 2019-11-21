<template>
<v-container mb-4>
        <v-card pa-2>
            <v-container  grid-list-md style="margin-top:5%" >
                <v-layout row wrap >
                    <v-flex md4 class="text-center lg5">
                       <v-responsive>
                        <v-img src= "https://images.unsplash.com/photo-1551776108-735a871a8c05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60" ></v-img>
                      </v-responsive>
                    </v-flex >
                    <v-flex md4 class="text-center lg5" style="margin-left:10% ; margin-top:5%">
                      <v-icon size="90" color="blue accent-3">mdi-account-badge-horizontal-outline</v-icon>
                        <h1 style="margin-top:-2%">SIGN UP PAGE</h1>
                        <v-text-field placeholder="Username" v-model="user.username"></v-text-field>
                         <v-text-field placeholder="Email@mail.com" v-model="user.email" ></v-text-field>
                        <v-text-field placeholder="Password" type="password" v-model="user.password"></v-text-field>
                         <v-text-field placeholder="Phone Number" v-model="user.noTelp"></v-text-field>
                        <v-btn depressed dark rounded style="text-transform: none !important;" color="blue accent-3" @click="sendData()">
                            SIGN UP
                        </v-btn>
                        <br>
                        <v-card-text>Already have an account?</v-card-text>
                        <v-btn elevation="0" to="/">LOG IN</v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
        <v-snackbar v-model="snackbar"
        :color="color" 
        :multi-line="true" 
        :timeout="3000">
        <v-icon>mdi-close</v-icon> {{ text }} 
        <v-btn dark text @click="snackbar = false"> </v-btn> </v-snackbar>
    </v-container>
</template>
<script>
import axios from 'axios';
export default {
  data() {
         return {
             snackbar: false,
             load: false,
             user: {
                 email: '',
                 password:'',
                 username:'',
                 noTelp:'',
                 role:'user',
             },
             users: new FormData,
             errors: '',
             updatedId: '',
             text: '',
             color: null,
             load: false,
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
              this.users.append('username',this.user.username)
              this.users.append('email', this.user.email);
              this.users.append('password', this.user.password);
              this.users.append('noTelp', this.user.noTelp);
              this.users.append('role',this.user.role);

              var uri = this.$apiUrl + '/signup'
              this.load = true
              this.$http.post(uri, this.users).then(response => {
                  if(response.data.error == true ){
                      console.log(response.data.error);
                      this.snackbar = true; //mengaktifkan snackbar
                      this.color = 'red'; //memberi warna snackbar
                      this.text = response.data.message; //memasukkan pesan ke snackbar
                      this.load = false;
                  }
                  else{
                      console.log(response.data.error);
                      this.snackbar = true; //mengaktifkan snackbar
                      this.color = 'green'; //memberi warna snackbar
                      this.text = 'SUCCESS'; //memasukkan pesan ke snackbar
                      this.load = false;
                      this.$router.push('/');
                  }
              }).catch(error => {
                  console.log(error);
                  this.errors = error
                  this.snackbar = true;
                  this.text = 'Try Again';
                  this.color = 'red';
                  this.load = false;
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