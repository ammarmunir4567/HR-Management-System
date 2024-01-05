const user=require("../Model/User.model")


function check(){

  const  data123={
      username:username,
      password:password,
     
    };

  console.log(data123)
  axios.post('http://localhost:3002/User/add',(data123))
.then(res => {
  console.log(res.data);
  alert('User added successfully!');
})
.catch(error => {
  console.error('Error:', error);
  alert('An error occurred while adding login.');
});

}

module.exports=check;