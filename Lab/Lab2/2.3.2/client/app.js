var app = new Vue({
    el: '#app',
    data: {
        users: [],
        usersService: null,
        newUser:{name:'', city:''}
    },
    created: function () {
        usersService = users();
        usersService.get().then(response => (this.users=response.data));
    },
	
    methods: {
        add: function(){
            usersService = users();
            usersService.put(this.newUser).then(response => (this.msg = response.data));
            location.reload();
        },
        remove: function(){
            usersService = users();
            usersService.remove(this.userid).then(response => (toastr.success(response.data)));
            usersService.get().then(response => {this.users = response.data;})
            location.reload();
        },
        update: function(){
			
        }
    }
})
