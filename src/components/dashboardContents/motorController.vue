<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <v-layout row wrap style="margin:10px">
                    <v-flex class="text-left">
                        <v-icon size="90" color="blue darken-1">mdi-motorbike</v-icon>
                    </v-flex>
                    <v-flex class="text-right mr-4">
                        <h1>MOTORCYCLE CATALOGUE</h1>
                        <div v-if = "this.currentRole == 'admin'">
                        <v-btn depressed dark rounded style="text-transform: none !important;" color="blue accent-3"
                            @click="dialog = true">
                            <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                            ADD MOTORCYCLE
                        </v-btn>
                        </div>
                    </v-flex>
                </v-layout>
                <v-container grid-list-md class="my-5">
                    <v-layout> 
                        <v-flex xs12 sm6 md4 lg3 v-for="item in motor" :key="item.id">
                        <v-card flat class="text-xs-center ma-3 elevation-5">
                            <v-responsive>
                            <v-img :src="getImgUrl(item)" height="200px"></v-img>
                            </v-responsive>
                            <v-card-text>
                            <div class="blue--text text-uppercase font-weight-bold title">{{ item.merk }}</div>
                            <div class="blue--text text-uppercase font-weight-bold title">{{ item.nama }}</div>
                            <div class="black--text text-uppercase font-weight-bold">{{ item.am }}
                            </div>
                            <div class="red--text text-uppercase font-weight-bold text-center body">Rp {{ item.harga }}</div>
                            </v-card-text>
                            <v-card-actions class="blue darken-3" > 
                            
                            <v-btn v-if = "currentRole == 'admin'" color="transparent elevation-0"  >
                                <v-icon class="mr-0" color="white" @click="editHandler(item)" >mdi-pencil</v-icon>
                                <div class="white--text">EDIT</div>
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn v-if = "currentRole == 'admin'" color="transparent elevation-0"  >
                                <v-icon class="mr-0" color="white" @click="deleteData(item.id)">mdi-delete</v-icon>
                                <div class="white--text">DELETE</div>
                            </v-btn>
                            <v-btn v-if = "currentRole == 'user'" color="transparent elevation-0"   @click="add(item)">
                                <v-icon class="mr-0" color="white">mdi-plus</v-icon>
                                <div class="white--text">CLICK TO ADD</div>
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-flex>   
                    </v-layout>
                </v-container>  
            </v-container>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="blue--text title" > MOTORCYCLE PROFILE </span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field class="text-uppercase" label="Name*" v-model="form.nama" required>
                                    </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field class="text-uppercase" label="Brand*" v-model="form.merk" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field class="text-uppercase" label="A/M*" v-model="form.am"  required>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field class="text-uppercase" label="Price*" v-model="form.harga"  required>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field class="text-uppercase" label="Link Img*" v-model="form.link"  required>
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small class="red--text font-weight-bold text-uppercase">*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="resetForm()">Close</v-btn>
                    <v-btn color="blue darken-1" text @click="setForm()">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000">
            {{ text }}
            <v-btn dark text @click="snackbar = false">
                Close
            </v-btn>
        </v-snackbar>
    </v-container>
</template>
<script>
import VueSession from 'vue-session'
export default {
 data() {
         return {
             dialog: false,
             keyword: '',
             motor: [],
             user: [],
             currentRole : '',
             snackbar: false,
             color: null,
             text: '',
             load: false,
             form: {
                 nama: '',
                 merk:'',
                 am: '',
                 harga: '',
                 link:'',
             },
             motors: new FormData,
             typeInput: 'new',
             errors: '',
             updatedId: '',
         }
     },
     methods: {
         getData() {
             var uri = this.$apiUrl + '/motor'
             this.$http.get(uri).then(response => {
                 this.motor = response.data.message
             })
         },
         getAccInfo(){
             var uri = this.$apiUrl + '/login/' + this.$session.get('username')
             this.$http.get(uri).then(response => {
                 this.user = response.data.message;
                 this.currentRole = this.user[0].role;
                 console.log(this.$session.get('username'));
                  console.log(this.currentRole);
             })
         },
         add(motor){
             this.motors.append('nama', motor.nama);
             this.motors.append('merk', motor.merk);
             this.motors.append('am', motor.am);
             this.motors.append('harga', motor.harga);
             this.motors.append('username', this.$session.get('username'));
             console.log(this.motors);
             var uri = this.$apiUrl + '/cartkend'
             console.log(uri);
             this.load = true
             this.$http.post(uri, this.mobils).then(response => {
                 this.snackbar = true; //mengaktifkan snackbar
                 this.color = 'green'; //memberi warna snackbar
                 this.text = response.data.message; //memasukkan pesan ke snackbar
                 this.load = false;
                 this.dialog = false
                 this.getData(); //mengambil data user
                 this.resetForm();
             }).catch(error => {
                 this.errors = error
                 this.snackbar = true;
                 this.text = 'Try Again';
                 this.color = 'red';
                 this.load = false;
             })
         },
         sendData() {
             this.motors.append('nama', this.form.nama);
             this.motors.append('merk', this.form.merk);
             this.motors.append('am', this.form.am);
             this.motors.append('harga', this.form.harga);
             this.motors.append('link', this.form.link);
             var uri = this.$apiUrl + '/motor'
             this.load = true
             this.$http.post(uri, this.motors).then(response => {
                 this.snackbar = true; //mengaktifkan snackbar
                 this.color = 'green'; //memberi warna snackbar
                 this.text = response.data.message; //memasukkan pesan ke snackbar
                 this.load = false;
                 this.dialog = false
                 this.getData(); //mengambil data user
                 this.resetForm();
             }).catch(error => {
                 this.errors = error
                 this.snackbar = true;
                 this.text = 'Try Again';
                 this.color = 'red';
                 this.load = false;
             })
         },
         updateData() {
             this.motors.append('nama', this.form.nama);
             this.motors.append('merk', this.form.merk);
             this.motors.append('am', this.form.am);
             this.motors.append('harga', this.form.harga);
             this.motors.append('link', this.form.link);
             var uri = this.$apiUrl + '/motor/' + this.updatedId;
             this.load = true
             this.$http.post(uri, this.motors).then(response => {
                 this.snackbar = true; //mengaktifkan snackbar
                 this.color = 'green'; //memberi warna snackbar
                 this.text = response.data.message; //memasukkan pesan ke snackbar
                 this.load = false;
                 this.dialog = false
                 this.getData(); //mengambil data user
                 this.resetForm();
                 this.typeInput = 'new';
             }).catch(error => {
                 this.errors = error
                 this.snackbar = true;
                 this.text = 'Try Again';
                 this.color = 'red';
                 this.load = false;
                 this.typeInput = 'new';
             })
         },
         add(item){
             
         },
         editHandler(item) {
             console.log('ddddd')
             this.typeInput = 'edit';
             this.dialog = true;
             this.form.nama = item.nama;
             this.form.merk = item.merk;
             this.form.am = item.am;
             this.form.harga= item.harga,
             this.form.link = item.link
                 this.updatedId = item.id
         },
         deleteData(deleteId) { //mengahapus data
             var uri = this.$apiUrl +
                 '/motor/' + deleteId; //data dihapus berdasarkan id
             this.$http.delete(uri).then(response => {
                 this.snackbar = true;
                 this.text = response.data.message;
                 this.color = 'green'
                 this.deleteDialog = false;
                 this.getData();
             }).catch(error => {
                 this.errors = error
                 this.snackbar = true;
                 this.text = 'Try Again';
                 this.color = 'red';
             })
         },
         setForm() {
             if (this.typeInput === 'new') {
                 this.sendData()
             } else {
                 console.log("dddd")
                 this.updateData()
             }
         },
         resetForm() {
             this.form = {
                 nama: '',
                 merk: '',
                 am: '',
                 harga:'',
                 link:''
             }
             this.dialog = false
         },
         getImgUrl(item) {
             var image = item.link
             return item.link
         }
     },
     mounted() {
         this.getData();
         this.getAccInfo();
     },
    computed: {
    filteredList() {
      return this.postList.filter(motor => {
        return motor.nama.toLowerCase().includes(this.search.toLowerCase())
      })
    }
}
 }
</script>