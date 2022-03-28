function users() {

    get = function() {
        return axios.get("http://localhost:3000/users");
    }
	
	put = function(user){
		return axios.put("http://localhost:3000/users"+user);
    }
	
    remove = function(id){

        return axios.delete("http://localhost:3000/users/"+id);
    }
	
    return {
        get: get, 
        put: put,
        remove: remove
    }
}
